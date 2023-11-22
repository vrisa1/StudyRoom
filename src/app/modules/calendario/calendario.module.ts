import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { FormEventComponent } from './form-event/form-event.component';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    declarations: [
        CalendarPageComponent,
        FormEventComponent,
        CalendarComponent
    ],
    imports: [
        CommonModule,
        CalendarioRoutingModule,
        FormsModule,
        FullCalendarModule,
        SharedModule
    ]
})
export class CalendarioModule { }
