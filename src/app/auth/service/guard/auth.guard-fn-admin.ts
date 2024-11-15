import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authGuardAdmin = ()=>{

  const router = inject(Router);

  if(localStorage.getItem('tokenAdmin')){
    return true;
  }else{
    router.navigateByUrl(`/user/${localStorage.getItem('UsuarioActivo')}`);
    return false;
  }
}
