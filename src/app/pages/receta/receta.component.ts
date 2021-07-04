import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Columns, Ol, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css'],
})
export class RecetaComponent implements OnInit {
  nombre: any = '';
  fecha: any = '';
  nombrePaciente: any = '';
  peso: any = '';
  altura: any = '';
  temperatura: any = '';
  sintomas: any = '';
  receta: any = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  makePDF(): void {
    const pdf = new PdfMakeWrapper();

    pdf.pageSize('A4');

    pdf.pageMargins([40, 60, 60, 60]);

    pdf.header(new Txt('Receta').fontSize(16).alignment('center').margin(40).end);

    try {
      pdf.add(pdf.ln(6));
      pdf.add([new Txt('Nombre del Dr. \n \n' + this.nombre.target.value).bold().margin([60, 0, 0, 0]).end,
         new Ol([
          'Fecha:  ' + this.fecha.target.value + pdf.ln(2),
          'Peso:  ' + this.peso.target.value + pdf.ln(2),
          'Altura:  ' + this.altura.target.value + pdf.ln(2),
          'Temperatura:  ' + this.temperatura.target.value])
          .bold()
          .type('none')
          .margin([340, -40, 0, 0]).end
      ]);

      pdf.add(pdf.ln(3));
      pdf.add(
        new Txt('Nombre del paciente')
          .alignment('left')
          .bold()
          .margin([60, 0, 0, 0]).end
      );
      pdf.add(pdf.ln(1));
      pdf.add(
        new Txt(this.nombrePaciente.target.value).margin([60, 0, 0, 0]).end
      );

      pdf.add(pdf.ln(3));
      pdf.add(new Txt('Sintomas').bold().margin([60, 0, 0, 0]).end);
      pdf.add(pdf.ln(1));
      pdf.add(new Txt(this.sintomas.target.value).margin([60, 0, 0, 0]).end);

      pdf.add(pdf.ln(3));
      pdf.add(new Txt('Receta').bold().margin([60, 0, 0, 0]).end);
      pdf.add(pdf.ln(1));
      pdf.add(new Txt(this.receta.target.value).margin([60, 0, 0, 0]).end);

      throw new Error("");

    } catch (error) {
      if (error instanceof TypeError) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: `<span style="color:#FFFF">Verifica los campos<span>`
        });
      } else {
        pdf.create().open();
        this.router.navigate(['/lista']);
      }
    }
  }
}
