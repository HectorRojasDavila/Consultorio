import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css'],
})
export class RecetaComponent implements OnInit {
  registrarReceta: FormGroup;
  submitted = false;
  id: string | null;
  loading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseServiceService,
    private designar: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.registrarReceta = formBuilder.group({
      fecha: ['', Validators.required],
      temperatura: ['', Validators.required],
      presionArterial: ['', Validators.required],
      diagnosticoMedico: ['', Validators.required],
      tratamiento: ['', Validators.required],
    });

    this.id = this.designar.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {}

  agregarReceta() {
    const receta: any = {
      fecha: this.registrarReceta.value.fecha,
      temperatura: this.registrarReceta.value.temperatura,
      presionArterial: this.registrarReceta.value.presionArterial,
      diagnosticoMedico: this.registrarReceta.value.diagnosticoMedico,
      tratamiento: this.registrarReceta.value.tratamiento,
      ref_id: this.id,
    };
    if (this.registrarReceta.valid) {
      this.loading = true;
      this.firebase
        .createReceta(receta)
        .then(() => {
          this.toastr.success('Se registro con exito', 'Receta registrada', {
            positionClass: 'toast-bottom-right',
          });
          this.loading = false;
          this.router.navigate(['/lista']);
        })
        .catch((err) => {
          this.loading = false;
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `<span style="color:#FFFF">Verifica los campos<span>`,
      });
    }
  }
}
