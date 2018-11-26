import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

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
}