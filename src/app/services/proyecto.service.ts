import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private db: AngularFireDatabase) { }

  initialProyects(limit: number){
    let array = [];
    this.db.database.ref('/Proyectos')
    .limitToLast(limit)
    .on('value', arr => {
      arr.forEach(element => {
        let item = element.val();
        item.key = element.key;
        array.push(item);
      })
    });
    return array.reverse();
  }

}