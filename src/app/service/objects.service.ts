import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Object } from '../interfaces/object.interface';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  urlBase:string = 'http://localhost:3000/objects'
  constructor(private http:HttpClient) { }

  getObject():Observable<Object[]>{
    return this.http.get<Object[]>(this.urlBase)
  }

  postObject(object:Object):Observable<Object>{
    return this.http.post<Object>(this.urlBase,object);
  }

  putObject(object:Object,id:string):Observable<Object>{
    return this.http.put<Object>(`${this.urlBase}/${id}`,object);
  }

  deleteObject(id:string):Observable<Object>{
    return this.http.delete<Object>(`${this.urlBase}/${id}`);
  }

  getObject_ById(id:string):Observable<Object>{
    return this.http.get<Object>(`${this.urlBase}/${id}`)
  }

  getObject_ByName(name:string):Observable<Object>{
    return this.http.get<Object>(`${this.urlBase}?name=${name}`)
  }

  getObject_ByProjectId(id:string):Observable<Object[]>{
    return this.http.get<Object[]>(`${this.urlBase}?projectId=${id}`)
  }

}
