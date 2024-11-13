import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../service/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  fb = inject(FormBuilder);
  userService = inject(UsersService);
  private router = inject(Router)

  formulario = this.fb.nonNullable.group({
    email:[''],
    password:['']
  });

  aux?:User | null = null;

  logIn(){
    const email = this.formulario.controls['email'].value;
    const password = this.formulario.controls['password'].value;

    this.userService.getUsers().subscribe({
      next:(user:User[])=>{
        for(let i=0; i<user.length;i++){
          if(user[i].email===email && user[i].password===password){
            console.log(user[i])
            this.aux = user[i];
          }
        }
      },error:(e:Error)=>{
      }
    });
    if(!this.aux)
      alert('Wrong Email or Password');
    this.formulario.reset();
  }

}
