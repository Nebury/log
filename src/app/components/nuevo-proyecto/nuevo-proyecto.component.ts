import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Proyecto } from '../../model/Proyecto';
import { Tarea } from '../../model/Tarea';
import { Equipo } from '../../model/Equipo';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {
  cont: number = 100;
  proyecto: Proyecto = {
    titulo: null,
    descripcion: null,
    idCliente: null,
    proyectManager: null,
    semanas: null,
    fechaInicio: null,
    fechaFinal: null,
    estado: null
  };

  tarea: Tarea = {
    descripcion: null,
    encargado: null,
    estado: null,
    comentario: null
  };

  equipo: Equipo = {
    nombre: null,
    apellido: null
  }

  key: String;
  listaProy: Observable<any[]>;
  listaTarea: Observable<any[]>;
  listaEquipo: Observable<any[]>;

  constructor(public db: AngularFireDatabase) { 
    this.listaProy = db.list('Proyectos').valueChanges();
    this.listaTarea = db.list('Tareas').valueChanges();
    this.listaEquipo = db.list('Equipo').valueChanges();
  }

  ngOnInit() {  }

  enterProyecto(): void{
    this.proyecto.titulo = 'titulo' + this.cont;
    this.proyecto.descripcion = 'descripcion' + this.cont;
    this.proyecto.idCliente = this.cont;
    this.proyecto.proyectManager = this.cont;
    this.proyecto.semanas = this.cont;
    this.proyecto.fechaInicio = '11-16-2018';
    this.proyecto.fechaFinal = '5-24-2020';
    this.proyecto.estado = 'Terminado';
    this.key = this.db.list('/Proyectos').push({
      titulo: this.proyecto.titulo,
      descripcion: this.proyecto.descripcion,
      idCliente: this.proyecto.idCliente,
      proyectManager: this.proyecto.proyectManager,
      semanas: this.proyecto.semanas,
      fechaInicio: this.proyecto.fechaInicio,
      fechaFinal: this.proyecto.fechaFinal,
      estado: this.proyecto.estado
    }).key.toString();
    this.cont += 2;
    alert(this.key);
  }

  enterTarea(): void{
    this.tarea.descripcion = 'Hacer' + this.cont;
    this.tarea.encargado = this.cont;
    this.tarea.estado = 'En Progreso';
    this.tarea.comentario = '...C';
    this.db.list('/Proyectos/' + this.key + '/Tarea').push({
      descripcion: this.tarea.descripcion,
      encargado: this.tarea.encargado,
      estado: this.tarea.estado,
      comentario: this.tarea.comentario
    });
    alert(this.key);
    this.cont += 2;
  }

  enterEquipo(): void{
    this.equipo.nombre = 'Fulano' + this.cont;
    this.equipo.apellido = 'Mengano' + this.cont;
    this.db.list('Proyectos/' + this.key + '/Equipo').push({
      nombre: this.equipo.nombre,
      apellido: this.equipo.apellido
    });
    alert('Done');
    this.cont += 2;
  }

}
