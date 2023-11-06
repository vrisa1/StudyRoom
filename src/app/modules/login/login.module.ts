import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginCompComponent } from './login-comp/login-comp.component';


@NgModule({
  declarations: [
    LoginCompComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  exports: [
    LoginCompComponent
  ]
})
export class LoginModule { }
