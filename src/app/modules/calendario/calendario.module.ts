import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { FormEventComponent } from './form-event/form-event.component';
import { FormsModule } from '@angular/forms';
import { TasksPageComponent } from './tasks-page/tasks-page.component';


@NgModule({
  declarations: [
    CalendarPageComponent,
    FormEventComponent,
    TasksPageComponent
  ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    FormsModule
  ]
})
export class CalendarioModule { }
