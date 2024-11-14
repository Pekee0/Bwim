import { Component, inject, Renderer2 } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { User } from '../../../interfaces/user.interface';
import { EmailValidatorService } from '../Validaciones/check-email-exists.directive';
import { NicknameValidatorService } from '../Validaciones/check-nickname-exists.directive';
import { passWordMatchValidator } from '../Validaciones/password-match-validator.directive';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {


  fb = inject(FormBuilder);
  userService = inject(UserService);
  emailValidatorService = inject(EmailValidatorService);
  nicknameValidatorService = inject(NicknameValidatorService);
  router = inject(Router);
  renderer = inject(Renderer2);
  ngOnInit(): void {

    this.renderer.addClass(document.body, 'body-blur');
  }

  ngOnDestroy(): void {

    this.renderer.removeClass(document.body, 'body-blur');
  }

  formulario = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required]],
      nickname: ['', [Validators.required, Validators.minLength(3)], [this.nicknameValidatorService.checkNicknameExists()]], /// tiene que ser unico
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email], [this.emailValidatorService.checkEmailExists()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      admin: false
    }, { validators: passWordMatchValidator }
  );

  addUser() {
    if (this.formulario.invalid) return;
    const user = this.cargarUsuario()
    this.addUserDB(user);
  };

  cargarUsuario(): User {
    const user: User = {
      "name": this.formulario.controls['name'].value,
      "email": this.formulario.controls['email'].value,
      "password": this.formulario.controls['password'].value,
      "surname": this.formulario.controls['surname'].value,
      "nickname": this.formulario.controls['nickname'].value,
      "admin": false,
      "imgPerfil": 'assets/logo-perfil/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector.png'
    }
    return user;
  }

  addUserDB(user: User) {
    this.userService.postUser(user).subscribe({
      next: (user: User) => {
        console.log(user);
        alert('Usuario guardado...');
        this.router.navigateByUrl('');
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }
}
