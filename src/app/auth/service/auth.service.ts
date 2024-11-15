import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin: boolean = false;
  constructor() { }

  logIn() {
    this.isLogin = true;
  }

  logOut() {
    this.isLogin = false;
  }
<<<<<<< HEAD
  isAdmin: boolean = false;

  adminIn() {
    this.isAdmin = true;
  }

  adminOut() {
=======

  isAdmin:boolean = false;

  adminIn(){
    this.isAdmin = true;
  }

  adminOut(){
>>>>>>> JsonServer
    this.isAdmin = false;
  }
}

