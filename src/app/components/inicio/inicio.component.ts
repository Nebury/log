import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  once: boolean = false;

  constructor() {
  }

  @HostListener("window:scroll", ['$event'])
  scroll($event: Event){
    const top = event.srcElement.children[0].scrollTop;
    const height = event.srcElement.children[0].scrollHeight;
    if((top + 626) == height){
      alert('bottom')
    }
  }

  ngOnInit() {
  }

}