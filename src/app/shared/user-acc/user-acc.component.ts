import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGoogleService } from '../../modules/login/service/auth-google.service';

@Component({
  selector: 'app-user-acc',
  templateUrl: './user-acc.component.html',
  styleUrls: ['./user-acc.component.scss']
})
export class UserAccComponent implements OnInit{
  constructor(private AuthGoogleService : AuthGoogleService, private Router : Router){}
  ngOnInit(): void {
    console.log(this.AuthGoogleService.getAccessToken());
  }

  logout(){
    this.AuthGoogleService.logout();
    this.Router.navigate(['landing']);
  }

  usuarioNuevo : any  = this.AuthGoogleService.getProfile();

  
}
