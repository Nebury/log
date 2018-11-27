import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesComponent } from '../components/clientes/clientes.component';
import { InicioComponent } from '../components/inicio/inicio.component';
import { HistorialComponent } from '../components/historial/historial.component';
import { NuevoProyectoComponent } from '../components/nuevo-proyecto/nuevo-proyecto.component';
import { MisTareasComponent } from '../components/mis-tareas/mis-tareas.component';
import { LoginComponent } from '../components/login/login.component';
import { InformeComponent } from '../components/informe/informe.component';
import { BitacoraComponent } from '../components/bitacora/bitacora.component';
import { DescripcionComponent } from '../components/descripcion/descripcion.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent},
  { path: 'historial', component: HistorialComponent },
  { path: 'clientes', component: ClientesComponent},
  { path: 'nuevo-proyecto', component: NuevoProyectoComponent},
  { path: 'mis-tareas', component: MisTareasComponent},
  { path: 'informe', component: InformeComponent },
  { path: 'bitacora', component: BitacoraComponent },
  { path: 'descripcion/:id', component: DescripcionComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
