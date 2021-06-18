import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layout/main/main.component';
import { MenuFrontalComponent } from './layout/menu-frontal/menu-frontal.component';
import { MenuLateralComponent } from './layout/menu-lateral/menu-lateral.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListaPacientesComponent } from './pages/lista-pacientes/lista-pacientes.component';
import { InicioComponent } from './pages/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuFrontalComponent,
    MenuLateralComponent,
    RegistroComponent,
    ListaPacientesComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
