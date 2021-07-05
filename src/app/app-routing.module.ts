import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListaPacientesComponent } from './pages/lista-pacientes/lista-pacientes.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { VerRecetaComponent } from './pages/ver-receta/ver-receta.component';

const routes: Routes = [
  { path:"", component:InicioComponent },
  { path:"inicio", component:InicioComponent },
  { path:"registro", component:RegistroComponent },
  { path:"editarPaciente/:id", component:RegistroComponent },
  { path:"lista", component:ListaPacientesComponent },
  { path:"receta/:id", component:RecetaComponent },
  { path:"ver-receta/:id", component:VerRecetaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
