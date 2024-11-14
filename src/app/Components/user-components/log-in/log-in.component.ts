import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { EmailValidator, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {

  ngOnInit(): void {

    this.renderer.addClass(document.body, 'body-blur');
  }

  ngOnDestroy(): void {

    this.renderer.removeClass(document.body, 'body-blur');
  }

  fb = inject(FormBuilder);
  userService = inject(UserService);
  private router = inject(Router)
  authService = inject(AuthService);
  renderer = inject(Renderer2);
  formulario = this.fb.nonNullable.group({
    email: [''],
    password: ['']
  });

  aux?: User | null = null;

  logIn() {
    const email = this.formulario.controls['email'].value;
    this.aux = null;
    const password = this.formulario.controls['password'].value;
    this.userService.getUsers().subscribe({
      next: (user: User[]) => {
        for (let i = 0; i < user.length; i++) {
          if (user[i].email === email && user[i].password === password) {
            this.aux = user[i];
            this.authService.logIn();
            console.log(this.authService.isAdmin);

            if (user[i].admin) {
              localStorage.setItem('tokenAdmin', '981126NR.7777PK.91218MB');
              this.authService.adminIn();
            }
            localStorage.setItem('token', '9RP.12BJ.2018LIB.18AR.12FR.2022WC');
            localStorage.setItem('UsuarioActivo', this.aux.id!)
            window.location.reload();
          }
        };
        if (!this.aux) {
          alert('Wrong Email or Password!');
        }
      }, error: (e: Error) => {
        console.log(e.message);
      }
    });
  }

}
