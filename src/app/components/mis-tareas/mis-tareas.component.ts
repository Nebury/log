import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-tareas',
  templateUrl: './mis-tareas.component.html',
  styleUrls: ['./mis-tareas.component.css']
})
export class MisTareasComponent implements OnInit {

  algo: number;

  constructor(private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

  informe(){
    this.ngZone.run(() => {
      this.router.navigateByUrl('/informe');
    });
  }

  bitacora(){
    this.ngZone.run(() => {
      this.router.navigateByUrl('/bitacora');
    });
  }

}
