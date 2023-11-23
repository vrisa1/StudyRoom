import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { FormEventComponent } from './form-event/form-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksPageComponent } from '../tareas/tasks-page/tasks-page.component';


@NgModule({
  declarations: [
    CalendarPageComponent,
    FormEventComponent,
    TasksPageComponent
  ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CalendarioModule { }
