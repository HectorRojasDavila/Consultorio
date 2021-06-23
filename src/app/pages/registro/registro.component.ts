import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { FirebaseServiceService } from "../../services/firebase-service.service";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public sexos: Observable<any[]>;

  createRegistro : FormGroup;
  submitted = false;
  

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private firebaseServiceService: FirebaseServiceService) {

    this.sexos = db.collection('sexos').valueChanges();

    this.createRegistro = this.fb.group({
      aler_disca:['', Validators.required],
      altura:['', Validators.required],
      apellidoM:['', Validators.required],
      apellidoP:['', Validators.required],
      nombre:['', Validators.required],
      peso:['', Validators.required],
      sexo:['', Validators.required]
    });
  }

  ngOnInit() {

  }
  
  sexs = [
    {value: 'hombre', viewValue: 'Hombre'},
    {value: 'mujer', viewValue: 'Mujer'},
    {value: 'indefinido', viewValue: 'Prefiero no decirlo'}
  ];

  agregarRegistro () {
    // console.log(this.createRegistro);
    this.submitted = true;
    if (this.createRegistro.invalid){
      return;
    }
    const registro:any = {
      nombre: this.createRegistro.value.nombre,
      apellidoP: this.createRegistro.value.apellidoP,
      apellidoM: this.createRegistro.value.apellidoM,
      peso: this.createRegistro.value.peso,
      altura: this.createRegistro.value.altura,
      sexo: this.createRegistro.value.sexo,
      aler_disca: this.createRegistro.value.aler_disca
    }

    this.firebaseServiceService.createRegistro(registro).then((resp) => {
      console.log("empleado regidtrado con exito");
    }).catch(err =>{
      console.log(err);
    });

    console.log(registro)

  }

}
