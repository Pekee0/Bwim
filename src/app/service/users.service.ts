import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlBase:string = 'http://localhost:3001/users'

  //http = inject(HttpClient) -- Solo se renderiza cuando lo seleccionan
  constructor(private http:HttpClient) { } //Todo lo que esta inyectado en el constructor se va a renderizar

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.urlBase);
  }

  postUser(user:User):Observable<User>{
    return this.http.post<User>(this.urlBase,user)
    }

  putUser(user:User,id:string):Observable<User>{
    return this.http.put<User>(`${this.urlBase}/${id}`,user)
  }

  deleteUser(id:string):Observable<User>{
    return this.http.delete<User>(`${this.urlBase}/${id}`)
  }

  getUser_ById(id:string):Observable<User>{
    return this.http.get<User>(`${this.urlBase}/${id}`)
  }

  getUser_ByName(name:string):Observable<User>{
    return this.http.get<User>(`${this.urlBase}?name=${name}`)
  }

  getUser_ByEmail(email:string):Observable<User>{
    return this.http.get<User>(`${this.urlBase}?email=${email}`)
  }

  getUser_ByNickname(nickname:string):Observable<User>{
    return this.http.get<User>(`${this.urlBase}?nickname=${nickname}`)
  }

  getUser_BySurname(surname:string):Observable<User>{
    return this.http.get<User>(`${this.urlBase}?surname=${surname}`)
  }
}
