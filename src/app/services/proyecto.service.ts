import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private db: AngularFireDatabase) { }

  getProyectos(batch){
    let array = [];
    this.db.database.ref('/Proyectos')
    .orderByKey()
    .limitToLast(batch)
    .on('value', arr => {
      arr.forEach(each => {
        let item = each.val();
        item.key = each.key;
        array.push(item);
      })
    });
    return array.reverse();
  }
}