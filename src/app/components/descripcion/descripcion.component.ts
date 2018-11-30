import { Component, OnInit, NgZone } from '@angular/core';
import { Proyecto } from 'src/app/model/Proyecto';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit {

  proyecto: Proyecto;
  proyKey: string;
  constructor(private router: ActivatedRoute, private service: ProyectoService, private ngZone: NgZone, private rute: Router ) { }

  ngOnInit() {
    this.proyKey = this.router.snapshot.paramMap.get('id');
    this.service.getProyect(this.proyKey)
    .snapshotChanges()
    .subscribe(list => {
      list.forEach(item => {
        let x = item.payload.toJSON();
        let y = x as Proyecto;
        y.key = item.key;
        this.proyecto = y;
      })
    });
  }

  algo: number;



  informe(){
    this.ngZone.run(() => {
      this.rute.navigateByUrl('/informe');
    });
  }

  bitacora(){
    this.ngZone.run(() => {
      this.rute.navigateByUrl('/bitacora');
    });
  }

}
