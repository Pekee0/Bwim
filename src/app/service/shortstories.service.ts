import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shortstory } from '../interfaces/shortstory.interface';

@Injectable({
  providedIn: 'root'
})
export class ShortstoriesService {

  urlBase:string='http://localhost:3000/shortstories';

  constructor(private http:HttpClient) { }

  getShortstories():Observable<Shortstory[]>{
    return this.http.get<Shortstory[]>(this.urlBase);
  }

  postShortstory(shortstory:Shortstory):Observable<Shortstory>{
    return this.http.post<Shortstory>(this.urlBase,shortstory);
  }

  putShortstory(shortstory:Shortstory,id:string):Observable<Shortstory>{
    return this.http.put<Shortstory>(`${this.urlBase}/${id}`,shortstory);
  }

  deleteShortstory(id:string):Observable<Shortstory>{
    return this.http.delete<Shortstory>(`${this.urlBase}/${id}`);
  }

  getShortstory_ById(id:string):Observable<Shortstory>{
    return this.http.get<Shortstory>(`${this.urlBase}/${id}`)
  }

  getShortstory_ByName(shortstory:string):Observable<Shortstory>{
    return this.http.get<Shortstory>(`${this.urlBase}?shortstory=${shortstory}`)
  }

}
