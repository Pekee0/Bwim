import { Injectable, inject } from '@angular/core';
import { Comentario } from '../interfaces/comentario.interface';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export type CommentCreate = Omit<Comentario,'id'>

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private firestore = inject(Firestore);
  private _collection = collection(this.firestore,'comments');

  create(comentario:CommentCreate){
    return addDoc(this._collection,comentario);
  }

  getComments():Observable<Comentario[]>{
    let commRef = collection(this.firestore,'comments');
    return collectionData(commRef,{idField:'id'})as Observable<Comentario[]>
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

  toCommentCreate(commet:Comentario):CommentCreate{
    return {
      text:commet.text,
      idUser:commet.idUser,
      idStory:commet.idStory
    }
  }
}