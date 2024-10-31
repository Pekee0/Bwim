import { Comment } from "./comment.interface"
export interface User{
  id?:string,
  nickname:string,
  name:string,
  surname:string,
  email:string,
  password:string,
  comments?:Comment[]
}
