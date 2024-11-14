import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authService.isLogin = true;
    }
    this.id = localStorage.getItem('UsuarioActivo');
    this.getUser();
  }


  id: string | null = null;
  authService = inject(AuthService);
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  usuarioActivo?: User;
  isActive = false

  toggleMenu() {
    this.isActive = !this.isActive

  }


  getUser() {
    this.userService.getUser_ById(this.id).subscribe({
      next: (user: User) => {
        this.usuarioActivo = user;
        console.log(user)
      }, error: (e: Error) => {
        console.log(e.message);
      }
    })
  }

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/home');
    localStorage.clear();
    window.location.reload();
  }
}
