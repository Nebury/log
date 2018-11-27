import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { InicioComponent } from '../app/components/inicio/inicio.component';
import { HistorialComponent } from '../app/components/historial/historial.component';
import { ClientesComponent } from '../app/components/clientes/clientes.component';
import { NuevoProyectoComponent } from '../app/components/nuevo-proyecto/nuevo-proyecto.component';
import { MisTareasComponent } from '../app/components/mis-tareas/mis-tareas.component';
import { DescripcionComponent } from '../app/components/descripcion/descripcion.component';

import { AppRoutingModule } from '../app/routing/app-routing.module';
import { LoginComponent } from '../app/components/login/login.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InformeComponent } from './components/informe/informe.component';
import { BitacoraComponent } from './components/bitacora/bitacora.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HistorialComponent,
    ClientesComponent,
    NuevoProyectoComponent,
    MisTareasComponent,
    LoginComponent,
    NavbarComponent,
    InformeComponent,
    BitacoraComponent,
    DescripcionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
