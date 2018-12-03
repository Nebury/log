import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/model/Proyecto';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private service: ProyectoService) {}

  proyectos: Proyecto[];
  gotKey: boolean = false;
  lastKey: string = '';
  finish: boolean;
  start: boolean;
  pos: number = 0;
  keyPag: string[] = [];

  ngOnInit() {
    let cont: number = 0;
    this.start = false;
    this.finish = true;
    let array = [];
    this.service.getProyects(5)
    .snapshotChanges()
    .subscribe(list => {
      list.forEach(proy => {
        let x = proy.payload.toJSON();
        let y = x as Proyecto;
        y.key = proy.key;
        array.push(y)
        if (!this.gotKey){
          this.lastKey = y.key;
          this.gotKey = true;
        }
        cont += 1;
        if (cont == 5){
          this.finish = true;
        }
     })
    });
    this.gotKey = false;
    this.proyectos = array.reverse();
    if (!this.keyPag.includes(this.lastKey)){
      this.keyPag.push(this.lastKey)
    }
  }

  next(){
    this.start = true;
    let array2 = [];
    let cont = 1;
    let over = this.lastKey
    this.service.getProyects(5, this.lastKey)
    .snapshotChanges()
    .subscribe(list => {
      list.forEach(proy => {
        let x = proy.payload.toJSON();
        let y = x as Proyecto;
        y.key = proy.key;
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
      this.service.getProyects(5, this.keyPag[this.pos])
      .snapshotChanges()
      .subscribe(list => {
        list.forEach(proy => {
        let x = proy.payload.toJSON();
        x['$key'] = proy.key;
        let y = x as Proyecto;
        y.key = proy.key;
        if (cont <= 5){
          array2.push(y);
          if (cont == 1){
            this.lastKey = y.key;
          }
        }
        cont += 1;
        })
      });
      this.proyectos = array2;
    }
  }

  borrar(proy: Proyecto){
    if (confirm("¿Está seguro de eliminar el proyecto elegido?")){
      this.service.removeProyect(proy.key);
      let index = this.proyectos.indexOf(proy);
      let key = this.proyectos.splice(index, 1);
      if (this.pos == 0){
        this.proyectos = [];
        this.ngOnInit();  
      }
    }
  }

}
