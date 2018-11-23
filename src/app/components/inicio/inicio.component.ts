import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/model/Proyecto';

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
  scroll($event: Event){
    const top = window.scrollY
    const doc = document.body.offsetHeight;
    const win = window.outerHeight;
    if (Math.trunc(top) == (doc - win + 32)){
      alert(this.lastKey)
    }
  }

  ngOnInit() {
    let array = [];
    this.service.getProyect()
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
    this.proyectos = array.reverse();
  }

  more(){
    let array2 = [];
    let cont = 1;
    this.db.database.ref('/Proyectos')
    .orderByKey()
    .limitToLast(6)
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
  }

}
