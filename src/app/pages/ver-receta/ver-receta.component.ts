import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Columns, Ol, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-receta',
  templateUrl: './ver-receta.component.html',
  styleUrls: ['./ver-receta.component.css'],
})
export class VerRecetaComponent implements OnInit {
  recetas: any[] = [];
  id: string | null;

  constructor(
    private firebase: FirebaseServiceService,
    private designar: ActivatedRoute
  ) {
    this.id = this.designar.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getReceta();
  }

  getReceta() {
    this.firebase.getReceta().subscribe((data) => {
      this.recetas = [];
      data.forEach((element: any) => {
        if (this.id == element.payload.doc.data().ref_id) {
          this.recetas.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data(),
          });
        }
      });
    });
  }

  deleteReceta(id: any) {
    Swal.fire({
      title: '¿Esta seguro de eliminar la receta?',
      showCancelButton: true,
      confirmButtonText: `Confirmar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Receta eliminada', '', 'success');
        this.firebase.deleteReceta(id);
      }
    });
  }

  printPDF(
    fecha: any,
    temperatura: any,
    presionArterial: any,
    diagnosticoMedico: any,
    tratamiento: any
  ): void {
    const pdf = new PdfMakeWrapper();

    pdf.pageSize('A4');

    pdf.pageMargins([40, 60, 60, 60]);

    pdf.header(
      new Txt('Receta').fontSize(16).alignment('center').margin(40).end
    );

    pdf.add(pdf.ln(6));
    pdf.add([
      new Columns([
        'Fecha:  ' + fecha,
        'Presion Arterial:  ' + presionArterial,
        'Temperatura:  ' + temperatura,
      ])
        .bold()
        .margin([60, 0, 0, 0]).end,
    ]);

    pdf.add(pdf.ln(5));
    pdf.add(
      new Txt('Diagnostico. \n \n' + diagnosticoMedico)
        .bold()
        .margin([60, 0, 0, 0]).end
    );

    pdf.add(pdf.ln(5));
    pdf.add(
      new Txt('Tratamiento').alignment('left').bold().margin([60, 0, 0, 0]).end
    );
    pdf.add(pdf.ln(2));
    pdf.add(new Txt(tratamiento).margin([60, 0, 0, 0]).end);

    pdf.create().open();
  }
}
