import { Component, Input, OnInit } from '@angular/core';
import { Route, Router, RouterModule, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit{
  
  @Input() isUser: boolean = false; 

  ngOnInit(): void {
    
  }
  
  constructor(private router: Router){}

  //rutas
  

}
