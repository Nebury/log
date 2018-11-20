import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  proyectos = [];
  count: number = 4;
  done: boolean = false;

  constructor(private db: AngularFireDatabase) {
    this.cargarDatos();
  }

  ngOnInit() {
  }

  onScroll(){
//    this.cargarDatos();
  }

  cargarDatos(){
    let todos = [];
    this.db.database.ref('/Proyectos')
    .orderByChild('estado')
    .equalTo('Terminado')
    .limitToLast(5)    
    .on('value', resp =>{
      resp.forEach(proy =>{
        let item = proy.val();
        item.key = proy.key;
        todos.push(item);
      });
    });
    this.proyectos = todos.reverse();
}

}