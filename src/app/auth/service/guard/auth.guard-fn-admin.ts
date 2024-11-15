import { inject } from '@angular/core';
import { Router } from '@angular/router';
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
    router.navigateByUrl(`/user/${localStorage.getItem('UsuarioActivo')}`);
    return false;
  }
}
>>>>>>> JsonServer
