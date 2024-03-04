import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerCompComponent } from './timer-comp/timer-comp.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimerHelpComponent } from './timer-help/timer-help.component';



@NgModule({
  declarations: [
    TimerCompComponent,
    TimerHelpComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TimerModule { }
