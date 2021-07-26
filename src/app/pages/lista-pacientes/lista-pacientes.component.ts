import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { FormatStatusPipe } from '../../pipe/format-status.pipe'


@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {
   pacientes : any[] = [];


  // public pacientes: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private toastr: ToastrService,
    private service:FirebaseServiceService) {

    // this.pacientes = db.collection('pacientes').valueChanges();
  }


  ngOnInit () : void {
    this.getPacientes();
  }

  getPacientes () {
    this.service.getPaciente().subscribe(data =>{
      this.pacientes = [];
      data.forEach((element:any) => {
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
        this.pacientes.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      console.log(this.pacientes);
    });
  }

  eliminarPacientes(id:any) {
    this.service.deletePaciente(id).then(()=>{
      console.log("empleado eliminado con exito");
      this.toastr.error('El paciente fue eliminado con exito','Registro eliminado',{
        positionClass: 'toast-bottom-right'
      });
    }).catch(err=>{
      console.log(err);

    })
  }




}
