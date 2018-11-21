import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private ngZone: NgZone){
    this.user = null;
    this.password = null;
    this.title = 'Login';
  }


  ngOnInit() {
  }

  user: String;
  password: String;
  title: String;

  verificar(): void{
    if(true){
      this.ngZone.run(() => {
        this.router.navigateByUrl('/inicio');
      });
    }else{

    }
  }

}
