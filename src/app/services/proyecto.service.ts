import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Proyecto } from '../model/Proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private db: AngularFireDatabase) { }
  lista: AngularFireList<any>;
  lastKey: string = '';

  getProyect(limit: number, end?: string){
    this.lista = null;
    if(end == null){
      return this.lista = this.db.list('/Proyectos', ref => 
      ref.orderByKey()
      .ref.limitToLast(limit));
    }else{
      return this.lista = this.db.list('/Proyectos', ref => 
        ref.orderByKey()
        .endAt(end)
        .limitToLast(limit+1)
        );
    }
  }

  addProyect(proyecto: Proyecto){
    let key;
    return key = this.db.list('/Proyectos').push({
      titulo: proyecto.titulo,
      descripcion: proyecto.descripcion,
      idCliente: proyecto.idCliente,
      proyectManager: proyecto.proyectManager,
      semanas: proyecto.semanas,
      fechaInicio: proyecto.fechaInicio,
      fechaFinal: proyecto.fechaFinal,
      estado: proyecto.estado
    }).key.toString();
  }

}