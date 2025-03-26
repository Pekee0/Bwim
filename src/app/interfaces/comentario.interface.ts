export interface Comentario{
  id?:string,
  text:string,
  idUser:string,
  idStory:string,
  upvote?:string[];
  downvote?:string[];
}
