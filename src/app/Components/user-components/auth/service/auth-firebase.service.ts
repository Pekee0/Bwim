import { Injectable, inject } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateEmail, user } from '@angular/fire/auth';
import { FirebaseCodeErrorService } from '../../../../service/firebase-code-error.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  private auth = inject(Auth);
  private firebaseError = inject(FirebaseCodeErrorService)
  private auth2 = inject(AngularFireAuth)
  private router = inject(Router)


  register(email:string,password: string){
    return createUserWithEmailAndPassword(this.auth,email,password).then(()=>{
      this.verficarEmail();
    });
  }

  login(email:string,password: string){
    return signInWithEmailAndPassword(this.auth,email,password).then((user)=>{
      if(user.user.emailVerified){
        this.router.navigate(['']);
        localStorage.setItem('token','9RP.12BJ.2018LIB.18AR.12FR.2022WC');
        window.location.reload();
      }else{
        this.verficarEmail();
        this.router.navigate(['/verificar-email'])
      }
    });
  }

  recuperarPassword(email:string){
    return sendPasswordResetEmail(this.auth,email);
  }

  verficarEmail(){
    this.auth2.currentUser.then(user=>user?.sendEmailVerification())
  }

  cambiarEmail(email:string){
    this.auth2.signInWithEmailAndPassword('nico.ruiz.mdp@gmail.com','nico981126').then(function(userCredential){
      console.log('h' + userCredential);
      console.log('o' + userCredential.user);
      console.log('l' + userCredential.additionalUserInfo);

      userCredential.user?.updateEmail(email);
    }).catch((err)=>{alert('Contraseña incorrecta: ' + err);
    })
  }
}
