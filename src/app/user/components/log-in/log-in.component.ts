import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../service/users.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  fb = inject(FormBuilder);
  userService = inject(UsersService);
  private router = inject(Router) //Lo utilizo para redireccionar la pagina

  formulario = this.fb.nonNullable.group({
    email:'',
    password:''
  }); 

  logIn(){
      // boolean sesion inicia. cambia cuando inicias sesion. 
      
  }

  // checkEmailExists(email: string): Observable<boolean> {
  //   return this.usersService.getUser_ByEmail(email).pipe(
  //     map(users => users.length > 0) // Devuelve true si hay usuarios con ese email
  //   );
  // }

}
