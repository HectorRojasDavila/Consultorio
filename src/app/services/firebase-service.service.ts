import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private fireStore: AngularFirestore) { }

  getPaciente (){
    this.fireStore.collection("pacientes").snapshotChanges();
  }

  createRegistro (registro:any): Promise<any> {
    return this.fireStore.collection("pacientes").add(registro);
  }

  updatePaciente (id:any ,estudiante:any) {
    this.fireStore.collection("pacientes").doc(id).update(estudiante);
  }

  deletePaciente (id:any) {
    this.fireStore.collection("pacientes").doc(id).delete;
  }

}
