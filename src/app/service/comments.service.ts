import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Comment } from '../interfaces/comment.interface';
import { Observable } from 'rxjs';

export type CommentCreate = Omit<Comment,'id'>

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private firestore = inject(Firestore);
  private comment = inject(CommentsService);
  private _collection = collection(this.firestore,'comments');


  create(comentario:CommentCreate){
    return addDoc(this._collection,comentario);
  }

  getComments():Observable<Comment[]>{
    let commRef = collection(this.firestore,'comments');
    return collectionData(commRef,{idField:'id'})as Observable<Comment[]>
  }

  getCommet(id:string){
    const docRef = doc(this._collection,id)
    return getDoc(docRef);
  }

  update(comment:CommentCreate,id:string){
    const docRef = doc(this._collection,id);
    return updateDoc(docRef,comment);
  }

  delete(id:string){
    const docRef = doc(this._collection,id);
    return deleteDoc(docRef)
  }

  toCommentCreate(commet:Comment):CommentCreate{
    return {
      text:commet.text,
      idUser:commet.idUser,
      idStory:commet.idStory
    }
  }
}
