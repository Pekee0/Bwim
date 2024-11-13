import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      {
        next:(param) =>
          {
            this.id = param.get('id')
            this.loadUser(this.id)
          }
      }
    )
  }

  
  userService = inject(UsersService)
  activatedRoute = inject(ActivatedRoute)
  id: string|null = null
  user: User|null = null


  loadUser(id: string | null)
  {
    this.userService.getUser_ById(id).subscribe({

        next:(usuario:User) =>{
            this.user = usuario 
        },
        error: (e:Error) =>
        {
          console.log(e.message);
          
        }     
      }
    )
  }
  

}
