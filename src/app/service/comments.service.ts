import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  urlBase:string = 'http://localhost:3000/comments';
  constructor(private http:HttpClient) { }

  getComments():Observable<Comment[]>{
    return this.http.get<Comment[]>(this.urlBase)
  }

  postComment(comment:Comment):Observable<Comment>{
    return this.http.post<Comment>(this.urlBase,comment)
  }

  putComment(comment:Comment, id:string):Observable<Comment>{
    return this.http.put<Comment>(`${this.urlBase}/${id}`,comment)
  }

  deleteComment(id:string):Observable<Comment>{
    return this.http.delete<Comment>(`${this.urlBase}/${id}`)
  }

  getComment_ById(id:string):Observable<Comment>{
    return this.http.get<Comment>(`${this.urlBase}/${id}`)
  }

}
