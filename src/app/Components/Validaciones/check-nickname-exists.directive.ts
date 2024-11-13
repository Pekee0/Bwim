import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, catchError, first } from 'rxjs/operators';
import { UsersService } from '../../service/users.service';

@Injectable({
  providedIn: 'root',
})
export class NicknameValidatorService {

  constructor(private userService: UsersService) {}

  // El validador asincrónico para comprobar si el email existe
  checkNicknameExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        // Si no hay valor, no validamos
        return of(null);
      }

      // Llamamos al servicio que devuelve un Observable<boolean> (si existe el email)
      return this.userService.getUser_ByNickname(control.value).pipe(
        debounceTime(500), // Puede haber un pequeño retraso para mejorar el rendimiento
        switchMap(users => {
          if (users.length > 0) {
            return of({ nicknameTaken: true }); // Si el email ya existe
          } else {
            return of(null); // Si el email no existe
          }
        }),
        catchError(() => of(null)), // Si ocurre algún error, no mostramos el error
        first() // Completa el flujo después de la primera respuesta
      );
    };
  }
}