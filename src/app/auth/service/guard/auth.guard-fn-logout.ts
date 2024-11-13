import { inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { Router } from '@angular/router';

export const authGuardFnLogout=()=>{

  const router = inject(Router);

  if(!localStorage.getItem('token')){
    return true;
  }else{
    router.navigateByUrl(`/user/${localStorage.getItem('UsuarioActivo')}`);
    return false;
  }
}
