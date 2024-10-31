import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  urlBase:string='http://localhost:3000/projects'
  constructor(private http:HttpClient) { }

  getProject():Observable<Project[]>{
    return this.http.get<Project[]>(this.urlBase);
  }

  postProject(project:Project):Observable<Project>{
    return this.http.post<Project>(this.urlBase,project);
  }

  putProject(project:Project,id:string):Observable<Project>{
    return this.http.put<Project>(`${this.urlBase}/${id}`,project);
  }

  deleteProject(id:string):Observable<Project>{
    return this.http.delete<Project>(`${this.urlBase}/${id}`);
  }

  getProject_ById(id:string):Observable<Project>{
    return this.http.get<Project>(`${this.urlBase}/${id}`);
  }

  getProject_ByName(name:string):Observable<Project>{
    return this.http.get<Project>(`${this.urlBase}?name=${name}`);
  }

}
