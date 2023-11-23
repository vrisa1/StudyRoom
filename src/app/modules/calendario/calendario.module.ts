import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { FormEventComponent } from './form-event/form-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksPageComponent } from '../tareas/tasks-page/tasks-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    CalendarPageComponent,
    FormEventComponent
  ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    SharedModule
  ]
})

export class CalendarioModule { }
