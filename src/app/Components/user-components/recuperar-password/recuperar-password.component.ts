import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EmailValidatorService } from '../Validaciones/check-email-exists.directive';
import { AuthFirebaseService } from '../auth/service/auth-firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export class RecuperarPasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  //private auth = inject(AngularFireAuth)
  private auth2 = inject(AuthFirebaseService)
  private emailValidatorService = inject(EmailValidatorService);

  formulario = this.fb.nonNullable.group({
    email:['',[Validators.required],[this.emailValidatorService.emailDoesnttExists]]
  })

  async submit(){
    try{
    const email = this.formulario.controls['email'].value;
    await this.auth2.recuperarPassword(email);
    this.openModal();
  }catch(error){
    console.log(error);
  }
  }



  isModalOpen = false;

  openModal(){
    this.isModalOpen = true;

  }

  closeModal(){
    this.isModalOpen = false;
    this.router.navigateByUrl('/login');
  }
}
