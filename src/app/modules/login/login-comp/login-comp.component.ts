import { Component } from '@angular/core';
import { AuthGoogleService } from '../../../core/services/auth-google.service'

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.scss']
})
export class LoginCompComponent {

  constructor(private AuthGoogleService : AuthGoogleService){}

  //LLama al servicio de login de google
  login(){
    this.AuthGoogleService.login(); 
  }
}
