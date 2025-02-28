import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, catchError, first } from 'rxjs/operators';
import { UserService } from '../../../service/user.service';


@Injectable({
  providedIn: 'root',
})
export class NicknameValidatorService {

  constructor(private userService: UserService) {}


  /*********************************************************************************************** */

  //Hay que verificar si es que funciona
  nicknameExists():AsyncValidatorFn{
    return (control:AbstractControl):Observable<ValidationErrors | null> =>{
      if(!control.value){
        return of(null);
      }

      return this.userService.getInfoUser().pipe(
        debounceTime(500),
        switchMap(users=>{
          if(users.length>0 && users.find(user=>user.nickname===control.value)){
            return of({nicknameTaken:true});
          }else{
            return of(null);
          }
        }),
        catchError(() => of(null)), // Si ocurre algún error, no mostramos el error
        first() // Completa el flujo después de la primera respuesta
      )
    }
  }
}
