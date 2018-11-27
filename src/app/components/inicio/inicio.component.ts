import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/model/Proyecto';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private service: ProyectoService) {}

  proyectos: Proyecto[];
  gotKey: boolean = false;
  lastKey: string = '';
  finish: boolean;
  start: boolean;
  pos: number = 0;
  keyPag: string[] = [];

  ngOnInit() {
    this.start = false;
    this.finish = true;
    let array = [];
    this.service.getProyect(5)
    .snapshotChanges()
    .subscribe(list => {
      list.forEach(proy => {
        let x = proy.payload.toJSON();
        let y = x as Proyecto;
        y.key = proy.key;
        if (y.estado == 'Terminado'){
          array.push(y)
        }
        if (!this.gotKey){
          this.lastKey = y.key;
          this.gotKey = true;
        }
     })
    });
    this.gotKey = false;
    this.proyectos = array;
    if (!this.keyPag.includes(this.lastKey)){
      this.keyPag.push(this.lastKey)
    }
  }

  next(){
    this.start = true;
    let array2 = [];
    let cont = 1;
    let over = this.lastKey
    this.service.getProyect(5, this.lastKey)
    .snapshotChanges()
    .subscribe(list => {
      list.forEach(proy => {
        let x = proy.payload.toJSON();
        let y = x as Proyecto;
        y.key = proy.key;
        if (y.estado == 'Terminado'){
          if (cont <= 5){
            if (y.key == over){
              this.finish = false;
            }else{
              array2.push(y);
              if (cont == 1){
                this.lastKey = y.key;
              }  
            }
          }
        }
        cont += 1;
      })
    });
    this.proyectos = array2;
    this.pos += 1;
    if (!this.keyPag.includes(this.lastKey)){
      this.keyPag.push(this.lastKey)
    }
  }

  previous(){
    this.finish = true;
    this.pos -= 1;
    if (this.pos == 0){
      this.ngOnInit();
    }else{
      let array2 = [];
      let cont = 1;
      this.service.getProyect(5, this.keyPag[this.pos])
      .snapshotChanges()
      .subscribe(list => {
        list.forEach(proy => {
        let x = proy.payload.toJSON();
        x['$key'] = proy.key;
        let y = x as Proyecto;
        y.key = proy.key;
        if (y.estado == 'Terminado'){
          if (cont <= 5){
            array2.push(y);
            if (cont == 1){
              this.lastKey = y.key;
            }
          }
        }
        cont += 1;
        })
      });
      this.proyectos = array2;
    }
  }

}
