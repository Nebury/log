import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/model/Proyecto';
import { query } from '@angular/core/src/render3/query';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private service: ProyectoService) {
  }

  proyectos: Proyecto[];
  gotKey: boolean = false;
  lastKey: string = '';

  @HostListener("window:scroll", ['$event'])
  scroll(event){
/*
    $event: Event   // parametro
    const top = window.scrollY
    const doc = document.body.offsetHeight;
    const win = window.outerHeight;
    if (Math.trunc(top) == (doc - win + 32)){
      alert(this.lastKey)
    }
*/
    console.log('scrolled')
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.more();
    }
  }

  ngOnInit() {
    let array = [];
    this.service.getProyect(5)
    .snapshotChanges()
    .subscribe(list => {
      list.forEach(proy => {
        let x = proy.payload.toJSON();
        x['$key'] = proy.key;
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
    this.proyectos = array;
  }

  more(){
    let array2 = [];
    let cont = 1;
    this.service.getProyect(5, this.lastKey)
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
    this.proyectos = array2.reverse();
  }

}
