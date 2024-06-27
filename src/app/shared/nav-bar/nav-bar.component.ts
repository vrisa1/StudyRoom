import { Component, Input, OnInit } from '@angular/core';
import { Route, Router, RouterModule, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { AuthGoogleService } from 'src/app/core/services/auth-google.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit{
  
  isUser: any;

  constructor(private authGoogleService: AuthGoogleService) { }

  ngOnInit(): void {

    //Corrobora si hay un usuario logeado o no 
    this.authGoogleService.userProfileSubject.subscribe((user) => {
      this.isUser = !!user;
    });

    this.isUser = !!this.authGoogleService.getProfile()
  }  
}
