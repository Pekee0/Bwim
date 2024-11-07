import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { UserService } from '../../service/user.service';

export function passwordValidator(userService: UserService, userId: string | null): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    // Si el control no tiene valor, no es necesario validar
    if (!control.value) {
      return of(null);
    }

    // Verificar si el userId es válido
    if (!userId) {
      return of({ userIdRequired: true }); // Se puede devolver un error si no hay userId
    }

    return userService.getUser_ById(userId).pipe(
      switchMap((user) => {
        // Verificar que la respuesta del servidor tenga el campo 'password'
        if (user && user.password === control.value) {
          return of(null); // Contraseña correcta
        }
        return of({ incorrectPassword: true }); // Contraseña incorrecta
      }),
      catchError(() => {
        return of({ serverError: true }); // Manejar errores de red o servidor
      })
    );
  };
}
