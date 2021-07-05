import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListaPacientesComponent } from './pages/lista-pacientes/lista-pacientes.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  { path:"", component:InicioComponent },
  { path:"registro", component:RegistroComponent },
  { path:"editarPaciente/:id", component:RegistroComponent },
  { path:"lista", component:ListaPacientesComponent },
  { path:"receta", component:RecetaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
