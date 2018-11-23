import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { last } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private db: AngularFireDatabase) { }

  lastKey: string = '';

  initialProyects(){
    let gotKey = false;
    let array = [];
    this.db.database.ref('/Proyectos')
    .limitToLast(5)
    .on('value', arr => {
      arr.forEach(element => {
        let item = element.val();
        item.key = element.key;
        array.push(item);
        if(!gotKey){
          this.lastKey = item.key;
          gotKey = true;
        }
      })
    });
    return array.reverse();
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