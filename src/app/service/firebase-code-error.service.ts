import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  codeError(code:string){
    switch(code){
      case 'auth/email-already-in-use':
        return 'El email ya existe'
      case 'auth/invalid-credential':
        return 'Contraseña incorrecta'
      default:
        return 'Contraseña incorrecta'
    }
  }
}
