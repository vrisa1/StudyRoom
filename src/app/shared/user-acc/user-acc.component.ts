import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../modules/login/service/auth-google.service';

@Component({
  selector: 'app-user-acc',
  templateUrl: './user-acc.component.html',
  styleUrls: ['./user-acc.component.scss']
})
export class UserAccComponent {
  constructor(private AuthGoogleService : AuthGoogleService, private Router : Router){}

  logout(){
    this.AuthGoogleService.logout();
    this.Router.navigate(['landing']);
  }

  mostrarDatos(){
   console.log(JSON.stringify(this.AuthGoogleService.getProfile()));
  }

}
