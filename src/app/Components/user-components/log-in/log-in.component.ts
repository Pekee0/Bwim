import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { EmailValidator, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../../auth/service/auth.service';
import { AuthFirebaseService } from '../auth/service/auth-firebase.service';
import { EmailValidatorService } from '../Validaciones/check-email-exists.directive';
import { FirebaseCodeErrorService } from '../../../service/firebase-code-error.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {

  private users : User[] = []
  private firebaseError = inject(FirebaseCodeErrorService)

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

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private renderer = inject(Renderer2);
  private auth = inject(AuthFirebaseService);
  private emailValidatorService = inject(EmailValidatorService);

  formulario = this.fb.nonNullable.group({
    email: ['',[Validators.email,Validators.required],[this.emailValidatorService.emailDoesnttExists()]],
    password: ['',[Validators.required]]
  });

  async submit() {
    if(this.formulario.invalid)return;
    try{
      await this.auth.login(this.formulario.controls['email'].value,this.formulario.controls['password'].value)
      const userActivo = this.retornarUserxEmail(this.formulario.controls['email'].value);
      console.log(userActivo);
      if(userActivo?.admin){
        localStorage.setItem('tokenAdmin','981126NR.7777PK.91218MB');
        this.authService.adminIn();
      }
      //localStorage.setItem('token','9RP.12BJ.2018LIB.18AR.12FR.2022WC');
      localStorage.setItem('UsuarioActivo',userActivo?.id!)

    }catch(error){
      alert(this.firebaseError.codeError(error as string));
    }
  }

  retornarUserxEmail(email:string){
    return this.users.find(user => user.email === email);
  }

}
