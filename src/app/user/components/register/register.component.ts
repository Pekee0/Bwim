import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../service/user.service';
import { passWordMatchValidator } from '../../directives/password-match-validator.directive';
import { CommonModule } from '@angular/common';
import { EmailValidatorService } from '../../directives/check-email-exists.directive';
import { NicknameValidatorService } from '../../directives/check-nickname-exists.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  fb = inject(FormBuilder);
  userService= inject(UserService);

  emailValidatorService = inject(EmailValidatorService);
  nicknameValidatorService = inject(NicknameValidatorService);

  formulario = this.fb.nonNullable.group(
    {
    name:['',[Validators.required]],
    nickname:['',[Validators.required,Validators.minLength(3)],[this.nicknameValidatorService.checkNicknameExists()]],
    surname:['',[Validators.required]],
    email:['',[Validators.required,Validators.email,Validators.minLength(3)],[this.emailValidatorService.checkEmailExists()]],
    password:['',[Validators.required,Validators.minLength(8)]],
    confirmPassword:['',Validators.required],
    },{
      validators:passWordMatchValidator
    }
  );

  addUser(){
    if(this.formulario.invalid)return;
    const user = this.cargarUsuario();
    this.userService.postUser(user).subscribe({
      next:(user:User)=>{
        console.log(user);
        alert('Usuario guardado...')
        this.formulario.reset();
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    });
  };

  //Esto se hace para evitar que se cree el atributo 'confirmPassword' en el objeto User
  cargarUsuario():User{
    const user:User = {
    "name" : this.formulario.controls['name'].value,
    "email" : this.formulario.controls['email'].value,
    "password" : this.formulario.controls['password'].value,
    "surname" : this.formulario.controls['surname'].value,
    "nickname" : this.formulario.controls['nickname'].value,
    "admin" : false,
    "imgPerfil":'src/assets/logo-perfil/pngwing.com.png'
    }
    return user;
  }
}
