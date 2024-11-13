import { Comment } from "@angular/compiler";

export interface Project{
  id?:string,
  name:string,
  description: string,
  urlProject:string,
  images?:string[],
  comment?:Comment[]
}
