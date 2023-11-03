import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainCompComponent } from './main-comp/main-comp.component';


@NgModule({
  declarations: [
    MainCompComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports: [
    MainCompComponent
  ]
})
export class MainModule { }
