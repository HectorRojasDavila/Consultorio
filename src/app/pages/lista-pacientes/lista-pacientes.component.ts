import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormatStatusPipe } from '../../pipe/format-status.pipe'

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent {

  public pacientes: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.pacientes = db.collection('pacientes').valueChanges();
  }


}
