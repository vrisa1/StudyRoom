import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../login/service/auth-google.service';

@Component({
  selector: 'app-main-comp',
  templateUrl: './main-comp.component.html',
  styleUrls: ['./main-comp.component.scss']
})
export class MainCompComponent {

  constructor(private AuthGoogleService : AuthGoogleService, private Router : Router){}

  logout(){
    this.AuthGoogleService.logout();
    this.Router.navigate(['login']);
  }

  mostrarDatos(){
   console.log(JSON.stringify(this.AuthGoogleService.getProfile()));
  }
  
}
