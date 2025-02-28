import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Firestore, addDoc, collection, collectionData,doc,getDoc, updateDoc } from '@angular/fire/firestore';

export type UserCreate = Omit<User,'id'>

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firestore = inject(Firestore);
  private _collection = collection(this.firestore,'users');

  create(user:UserCreate){
    return addDoc(this._collection,user)
  }

  getInfoUser():Observable<User[]>{
    let userRef = collection(this.firestore,'users');
    return collectionData(userRef,{idField:'id'})as Observable<User[]>
  }

  getUser(id:string){
    const docRef = doc(this._collection,id);
    return getDoc(docRef);
  }

  update(user:UserCreate,id:string){
    const docRef = doc(this._collection,id);
    return updateDoc(docRef,user);
  }

  toUserCreate(user:User):UserCreate{
    return {
      nickname: user.nickname,
      name:user.name,
      surname:user.surname,
      email:user.email,
      admin:user.admin,
      imgPerfil:user.imgPerfil
    }
  }
}
