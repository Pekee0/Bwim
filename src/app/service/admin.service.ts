import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  urlBase:string = 'http://localhost:3001/admin';

  constructor(private http:HttpClient) { }

  getAdmin():Observable<Admin[]>{
    return this.http.get<Admin[]>(this.urlBase);
  }

  postAdmin(admin:Admin):Observable<Admin>{
    return this.http.post<Admin>(this.urlBase,admin)
    }

  putAdmin(admin:Admin,id:string):Observable<Admin>{
    return this.http.put<Admin>(`${this.urlBase}/${id}`,admin)
  }

  deleteAdmin(id:string):Observable<Admin>{
    return this.http.delete<Admin>(`${this.urlBase}/${id}`)
  }

  getAdmin_ById(id:string):Observable<Admin>{
    return this.http.get<Admin>(`${this.urlBase}/${id}`)
  }

  getAdmin_ByEmail(email:string):Observable<Admin>{
    return this.http.get<Admin>(`${this.urlBase}?email=${email}`)
  }
}
