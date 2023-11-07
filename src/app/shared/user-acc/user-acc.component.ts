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

  usuarioNuevo : any  = this.AuthGoogleService.getProfile();

  src : string = this.usuarioNuevo.picture;

  name  : string = this.usuarioNuevo.name;
  

  mostrarDatos(){
    //let usuarioNuevo : any = this.AuthGoogleService.getProfile()
    
   //console.log(`${usuarioNuevo.name} ${usuarioNuevo.picture} ${usuarioNuevo.email}`);
    console.log(this.usuarioNuevo.name)
  }

}
