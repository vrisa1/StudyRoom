import { Component, Input, OnInit } from '@angular/core';
import { Route, Router, RouterModule, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { AuthGoogleService } from 'src/app/core/services/auth-google.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit{
  
  @Input() isUser: boolean = false;

  constructor(private authGoogleService: AuthGoogleService) { }

  ngOnInit(): void {
    /*
    this.authGoogleService.userProfileSubject.subscribe(user => {
      if(user){
        this.isUser = true;
      }
      console.log(this.isUser);
    });
    */
  }  
}
