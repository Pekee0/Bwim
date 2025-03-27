import { Component, inject, Renderer2, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { User } from '../../../interfaces/user.interface';
import { EmailValidatorService } from '../Validaciones/check-email-exists.directive';
import { NicknameValidatorService } from '../Validaciones/check-nickname-exists.directive';
import { passWordMatchValidator } from '../Validaciones/password-match-validator.directive';
import { UserCreate, UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../auth/service/auth-firebase.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit{


  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private emailValidatorService = inject(EmailValidatorService);
  private nicknameValidatorService = inject(NicknameValidatorService);
  private router = inject(Router);
  private renderer = inject(Renderer2);
  private auth = inject(AuthFirebaseService);

  private users: User[] = []

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'body-blur');

    this.userService.getInfoUser().subscribe({
      next:(array:User[]) =>{
        this.users = array;
      },error:(e:Error)=>{
        console.log(e.message);
      }
    });
  }

  ngOnDestroy(): void {

    this.renderer.removeClass(document.body, 'body-blur');
  }

  formulario = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required]],
      nickname: ['', [Validators.required, Validators.minLength(3)], [this.nicknameValidatorService.nicknameExists()]], /// tiene que ser unico
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email], [this.emailValidatorService.emailExists()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      admin: false
    }, { validators: passWordMatchValidator }
  );

  cargarUsuario(): User {
    const user: User = {
      "name": this.formulario.controls['name'].value,
      "email": this.formulario.controls['email'].value,
      "surname": this.formulario.controls['surname'].value,
      "nickname": this.formulario.controls['nickname'].value,
      "admin": false,
      "imgPerfil": 'assets/logo-perfil/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector.png'
    }
    return user;
  }

  cargarUserCreate(user:User):UserCreate{
    const userC:UserCreate ={
      nickname:user.nickname,
      name:user.name,
      surname:user.surname,
      email:user.email,
      admin: user.admin,
      imgPerfil:user.imgPerfil
    }
    return userC
  }

  retornarIdUserxEmail(email:string){
    const retornar = this.users.find(user => user.email === email);
    return retornar?.id;
  }

  async submit() {
    if(this.formulario.invalid)return;
    try{
      const nuevo:User = this.cargarUsuario();
      const userC:UserCreate = this.cargarUserCreate(nuevo);
      await this.auth.register(nuevo.email,this.formulario.controls['password'].value)
      await this.userService.create(userC);
      this.router.navigate(['/verificar-email'])
    }catch(error){
      console.log('Ha ocurrido un error!');
    }
  };



}
