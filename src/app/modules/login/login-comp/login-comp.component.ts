import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../../core/services/auth-google.service'

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.scss']
})
export class LoginCompComponent implements OnInit{

  isUser: any;

  constructor(private AuthGoogleService : AuthGoogleService){}

  ngOnInit(): void {
    
    //Corrobora si ya hay un usuario logeado o no 
    this.AuthGoogleService.userProfileSubject.subscribe((user) => {
      this.isUser = !!user;
    });

    this.isUser = !!this.AuthGoogleService.getProfile()
  }

  //LLama al servicio de login de google
  login(){
    this.AuthGoogleService.login(); 
  }
}
