import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private service: ProyectoService) {
  }

  proyectos = [];

  @HostListener("window:scroll", ['$event'])
  scroll($event: Event){
    const top = window.scrollY
    const doc = document.body.offsetHeight;
    const win = window.outerHeight;
    if (Math.trunc(top) == (doc - win + 32)){
//      this.more()
      alert(this.service.lastKey)
    }
  }

  ngOnInit() {
    this.proyectos = this.service.initialProyects(5);
  }

  more(){
    this.proyectos = [...this.proyectos, this.service.getMore(5)]
  }

}
