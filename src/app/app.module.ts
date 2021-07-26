import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment} from '../environments/environment';

import { MainComponent } from './layout/main/main.component';
import { MenuFrontalComponent } from './layout/menu-frontal/menu-frontal.component';
import { MenuLateralComponent } from './layout/menu-lateral/menu-lateral.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListaPacientesComponent } from './pages/lista-pacientes/lista-pacientes.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormatStatusPipe } from './pipe/format-status.pipe';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { VerRecetaComponent } from './pages/ver-receta/ver-receta.component'; // fonts provided for pdfmake
import { RecetaComponent } from './pages/receta/receta.component';

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuFrontalComponent,
    MenuLateralComponent,
    RegistroComponent,
    ListaPacientesComponent,
    InicioComponent,
    FormatStatusPipe,
    RecetaComponent,
    VerRecetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AngularFirestoreModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
