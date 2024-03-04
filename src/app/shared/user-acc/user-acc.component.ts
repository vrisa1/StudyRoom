import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGoogleService } from '../../core/services/auth-google.service';
import { usuario } from 'src/app/core/models';

@Component({
  selector: 'app-user-acc',
  templateUrl: './user-acc.component.html',
  styleUrls: ['./user-acc.component.scss']
})
export class UserAccComponent implements OnInit{

  usuarioNuevo: any;

  constructor(private AuthGoogleService : AuthGoogleService, private Router : Router){}
  
  ngOnInit(): void {
    
    //Obtener la informacion del usuario logueado
    this.AuthGoogleService.userProfileSubject.subscribe((user) => {
      this.usuarioNuevo = user;
    });
    this.usuarioNuevo = this.AuthGoogleService.getProfile()
  }

  //Cerrar sesion 
  logout(){
    this.AuthGoogleService.logout();
    this.Router.navigate(['landing']);
  }
  
}
