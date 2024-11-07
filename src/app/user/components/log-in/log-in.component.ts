import { Component, inject, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Router, RouterModule } from '@angular/router';
import { Observable,map } from 'rxjs';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{

  ngOnInit(): void {

  }

  fb = inject(FormBuilder);
  userService = inject(UserService);
  private router = inject(Router) //Lo utilizo para redireccionar la pagina

  formulario = this.fb.nonNullable.group({
    email:[''],
    password:['']
  });

  logIn(){
    this.userService.getUsers().subscribe({
      next:(user:User[])=>{
         const res = user.find((a:User)=>{
          return a.email === this.formulario.value.email && a.password === this.formulario.value.password;
         });
         if(res){
          console.log('Login Success');
          this.formulario.reset();
          this.router.navigate([''])
         }else{
            console.log('Wrong mail or password...')
         }
      },error:(e:Error)=>{
        alert('Something went wrong...');
      }
    })
  }
}
