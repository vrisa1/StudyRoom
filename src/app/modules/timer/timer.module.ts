import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerCompComponent } from './timer-comp/timer-comp.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TimerCompComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TimerModule { }
