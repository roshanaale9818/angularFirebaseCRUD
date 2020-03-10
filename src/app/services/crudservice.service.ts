import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {


  constructor(
    private fireStore:AngularFirestore
  ) {
   }
   createUser(record){
    return this.fireStore.collection('Users').add(record);
   }
   readUser(){
     return this.fireStore.collection('Users').snapshotChanges();
   }
   updateUser(recordID,record){
     this.fireStore.doc('Users/'+ recordID).update(record);
   }
   deleteUser(recordID){
     this.fireStore.doc('Users/'+ recordID).delete();
   }




}
