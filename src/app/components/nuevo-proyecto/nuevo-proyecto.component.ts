import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../model/Proyecto';
import { Tarea } from '../../model/Tarea';
import { Equipo } from '../../model/Equipo';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Cliente } from 'src/app/model/Cliente';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {

  proyecto: Proyecto = {
    titulo: null,
    descripcion: null,
    idCliente: null,
    proyectManager: null,
    semanas: null,
    fechaInicio: null,
    fechaFinal: null,
    estado: null,
    key: null,
  };

  cliente: Cliente = {
    nombre: null,
    id: null,
  }

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
  clientes: Cliente[] = [{
    nombre: 'Nombre 1',
    id: 1,
  },
  {
    nombre: 'Nombre 2',
    id: 2,
  },
  {
    nombre: 'Nombre 3',
    id: 3,
  }];

  proyMang: number[] = [10, 20, 30, 40, 50];

  constructor(private service: ProyectoService) { }

  ngOnInit() {  }

  save(): void{
    alert(this.proyecto.titulo);
    alert(this.proyecto.descripcion);
    alert(this.proyecto.idCliente);
    alert(this.proyecto.proyectManager);
    alert(this.proyecto.semanas);
    alert(this.proyecto.fechaInicio);
    /*
    this.key = this.service.addProyect(this.proyecto);
    alert('Nuevo Proyecto Ingresado, su key es: ' + this.key);
    */
  }
/*

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
*/
}


