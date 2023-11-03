import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit{
  
  @Input() isUser: boolean = true; 

  ngOnInit(): void {
    
  }
  
  constructor(private router: Router){}

  //rutas
  

}
