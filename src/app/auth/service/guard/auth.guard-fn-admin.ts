import { inject } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
export const authGuardAdmin = () => {

  const router = inject(Router);

  if (localStorage.getItem('tokenAdmin')) {
    return true;
  } else {
=======
<<<<<<< HEAD
export const authGuardAdmin = () => {

    const router = inject(Router);

    if (localStorage.getItem('tokenAdmin')) {
        return true;
    } else {
        router.navigateByUrl(`/user/${localStorage.getItem('UsuarioActivo')}`);
        return false;
    }
}
=======
export const authGuardAdmin = ()=>{

  const router = inject(Router);

  if(localStorage.getItem('tokenAdmin')){
    return true;
  }else{
>>>>>>> 2408e09a2218af69fbcb95c01f491e8d9d7d8be1
    router.navigateByUrl(`/user/${localStorage.getItem('UsuarioActivo')}`);
    return false;
  }
}
<<<<<<< HEAD
=======
>>>>>>> JsonServer
>>>>>>> 2408e09a2218af69fbcb95c01f491e8d9d7d8be1
