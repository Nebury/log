import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HistorialComponent } from './historial/historial.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NuevoProyectoComponent } from './nuevo-proyecto/nuevo-proyecto.component';
import { MisTareasComponent } from './mis-tareas/mis-tareas.component';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'


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
