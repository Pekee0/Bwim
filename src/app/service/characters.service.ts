import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  urlBase:string = 'http://localhost:3000/characters'
  constructor(private http:HttpClient) { }

  getCharacters():Observable<Character[]>{
    return this.http.get<Character[]>(this.urlBase);
  }

  postCharacter(character:Character):Observable<Character>{
    return this.http.post<Character>(this.urlBase,character);
  }

  putCharacter(character:Character,id:string):Observable<Character>{
    return this.http.put<Character>(`${this.urlBase}/${id}`,character);
  }

  deleteCharacter(id:string):Observable<Character>{
  return this.http.delete<Character>(`${this.urlBase}/${id}`);
  }

  getCharacter_ById(id:string):Observable<Character>{
    return this.http.get<Character>(`${this.urlBase}/${id}`)
  }

  getCharacter_ByName(name:string):Observable<Character>{
    return this.http.get<Character>(`${this.urlBase}?name=${name}`)
  }

  getCharacters_ByProjectId(id:string):Observable<Character[]>{
    return this.http.get<Character[]>(`${this.urlBase}?projectId=${id}`)
  }

}
