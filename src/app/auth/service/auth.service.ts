import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin:boolean = false;
  constructor() { }

  logIn(){
    this.isLogin = true;
  }

  logOut(){
    this.isLogin = false;
  }


  isAdmin:boolean = false;

  adminIn(){
    this.isAdmin = true;
  }

  adminOut(){
    this.isAdmin = false;
  }
}
