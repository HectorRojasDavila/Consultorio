import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private fireStore: AngularFirestore) { }

  getPaciente () : Observable<any> {
    return this.fireStore.collection("pacientes", ref => ref.orderBy("nombre","asc")).snapshotChanges();
  }

  getPacienteUnique (id:any) : Observable<any>  {
    return this.fireStore.collection("pacientes").doc(id).snapshotChanges();

  }

  createRegistro (registro:any): Promise<any> {
    return this.fireStore.collection("pacientes").add(registro);
  }

  deletePaciente (id:any): Promise<any> {
    return this.fireStore.collection("pacientes").doc(id).delete();
  }

  updatePaciente (id:any ,data:any): Promise<any> {
    return this.fireStore.collection("pacientes").doc(id).update(data);
  }

  createReceta (receta:any): Promise<any> {
    return this.fireStore.collection("receta").add(receta);
  }

  getReceta (): Observable<any> {
    return this.fireStore.collection("receta").snapshotChanges();
  }

  deleteReceta (id:any): Promise<any> {
    return this.fireStore.collection("receta").doc(id).delete();
  }

}
