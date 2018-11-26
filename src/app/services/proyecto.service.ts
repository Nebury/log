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

  getMore(limit: number){
    let array2 = [];
    let cont = 1;
    this.db.database.ref('/Proyectos')
    .orderByKey()
    .limitToLast(limit+1)
    .endAt(this.lastKey)
    .on('value', arr => {
      arr.forEach(element => {
        let item = element.val();
        item.key = element.key;
        if (cont <= 5){
          array2.push(item);  
          if (cont == 1){
            this.lastKey = item.key;
          }
        }
        cont += 1;
      })
    });
//    return array2.reverse();
  }

}