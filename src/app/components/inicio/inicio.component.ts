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
    this.started();
  }

  started(){
    this.start = false;
    this.finish = true;
    let array = [];
    this.service.getProyects(5, null, true)
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
     })
    });
    this.gotKey = false;
    this.proyectos = array;
    if (!this.keyPag.includes(this.lastKey)){
      this.keyPag.push(this.lastKey)
    }
  }

  next(){
    this.pos += 1;
    this.start = true;
    let array2 = [];
    let cont = 1;
    let over = this.lastKey
    this.service.getProyects( ((this.pos + 1) * 5) , null, true)
    .snapshotChanges()
    .subscribe(list => {
      list.forEach(proy => {
        if (cont <= 5){
          let x = proy.payload.toJSON();
          let y = x as Proyecto;
          y.key = proy.key;
          if (y.key == over){
            this.finish = false;
          }
          if(this.finish){
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
      this.service.getProyects( (this.pos + 1) * 5, null, true)
      .snapshotChanges()
      .subscribe(list => {
        list.forEach(proy => {
        let x = proy.payload.toJSON();
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


//Tiempo para arreglar paginado   20:50   -    22:10