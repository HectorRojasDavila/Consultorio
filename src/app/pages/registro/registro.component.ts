import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { FirebaseServiceService } from "../../services/firebase-service.service";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public sexos: Observable<any[]>;

  createRegistro: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = "Crear paciente";
  sexs = [
    { value: 'hombre', viewValue: 'Hombre' },
    { value: 'mujer', viewValue: 'Mujer' },
    { value: 'indefinido', viewValue: 'Prefiero no decirlo' }
  ];

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private firebaseServiceService: FirebaseServiceService) {

    this.sexos = db.collection('sexos').valueChanges();

    this.createRegistro = this.fb.group({
      aler_disca: ['', Validators.required],
      altura: ['', Validators.required],
      apellidoM: ['', Validators.required],
      apellidoP: ['', Validators.required],
      nombre: ['', Validators.required],
      peso: ['', Validators.required],
      sexo: ['', Validators.required]
    });
    this.id = this.aRoute.snapshot.paramMap.get("id");
    // console.log(this.id);
  }

  ngOnInit() {
    this.edit();
  }

  agregarEditarRegistro() {
    // console.log(this.createRegistro);
    this.submitted = true;
    if (this.createRegistro.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarRegistro();
    } else {
      this.editRegistro(this.id);
    }
    // console.log(registro)
  }

  agregarRegistro() {

    
    const registro: any = {
      nombre: this.createRegistro.value.nombre,
      apellidoP: this.createRegistro.value.apellidoP,
      apellidoM: this.createRegistro.value.apellidoM,
      peso: this.createRegistro.value.peso,
      altura: this.createRegistro.value.altura,
      sexo: this.createRegistro.value.sexo,
      aler_disca: this.createRegistro.value.aler_disca
    }
    this.loading = true;
    this.firebaseServiceService.createRegistro(registro).then((resp) => {
      this.toastr.success('El empleado fue registrado con exito', 'Empleado registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/lista'])
      // console.log("empleado regidtrado con exito");
    }).catch(err => {
      console.log(err);
      this.loading = false;
    });
  }

  editRegistro(id: any) {
    
    const registro: any = {
      nombre: this.createRegistro.value.nombre,
      apellidoP: this.createRegistro.value.apellidoP,
      apellidoM: this.createRegistro.value.apellidoM,
      peso: this.createRegistro.value.peso,
      altura: this.createRegistro.value.altura,
      sexo: this.createRegistro.value.sexo,
      aler_disca: this.createRegistro.value.aler_disca
    }
    this.loading = true;
    this.firebaseServiceService.updatePaciente(id, registro).then(() => {
      this.loading = false;
      this.toastr.info("El Paciente fue modificado con exito", "Paciente modificado", {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/lista']);
    });
  }

  edit() {
    this.titulo = 'Editar registro'
    if (this.id !== null) {
      this.loading = true;
      this.firebaseServiceService.getPacienteUnique(this.id).subscribe(data => {
        // console.log(data.payload.data()['']);
        this.loading = false;

        this.createRegistro.setValue({
          nombre: data.payload.data()['nombre'],
          apellidoP: data.payload.data()['apellidoP'],
          apellidoM: data.payload.data()['apellidoM'],
          peso: data.payload.data()['peso'],
          altura: data.payload.data()['altura'],
          sexo: data.payload.data()['sexo'],
          aler_disca: data.payload.data()['aler_disca']
        });

      });
    }
  }

}
