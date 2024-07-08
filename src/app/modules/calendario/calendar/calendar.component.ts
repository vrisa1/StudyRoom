declare var $: any;

import { ChangeDetectorRef, Component, ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
  signal,
} from '@angular/core';
import {
  CalendarOptions,
  Calendar,
  EventClickArg,
  EventApi,
  DateSelectArg,
  EventInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import esLocale from '@fullcalendar/core/locales/es';
import multiMonthPlugin from '@fullcalendar/multimonth';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { CalendarPageComponent } from '../calendar-page/calendar-page.component';
import { CalendarService } from '../service/calendar.service';
import { map, switchMap } from 'rxjs';
import { AuthGoogleService } from '../../../core/services/auth-google.service';
import { RequestsService } from 'src/app/core/services/requests.service';
import { NgForm, FormsModule } from '@angular/forms';
import { evento } from 'src/app/core/models';
import { format } from 'date-fns';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent implements OnInit {
  
  //variables para agregar eventos
  title: string="";
  description: string="";
  startDate: string= "";
  endDate: string="";
  isAllDay: boolean = false; 
  startTime: string="";
  endTime: string="";

  //variables de evento para modificarEvento()
  tituloM: string="";
  descripcionM: string="";
  fechaInicioM: string | any="";
  fechaFinalM: string | any="";
  horaInicioM: string | any="";
  horaFinalM: string | any="";
  eventoId: string="";
  minEndDate: string="";
  minEndTime: string="";

  @Output() eventoCreado = new EventEmitter<evento>();

  @ViewChild('formulario') formulario!: NgForm;
  @ViewChild('formularioModificar') formularioModificar!:NgForm;

  ngOnInit(): void {
    this.actualizarListaDeEventos();
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private CalendarService: CalendarService,
    private CalendarPageComponent: CalendarPageComponent,
    private AuthGoogleService: AuthGoogleService,
    private RequestsService: RequestsService
  ) {}

  //FULL CALENDAR plugin configuracion -------------------------------------------------------------------
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      multiMonthPlugin,
      googleCalendarPlugin,
    ],
    locale: esLocale,
    nowIndicator: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    events: '',
    weekends: true,
    selectable: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  currentEvents = signal<EventApi[]>([]);

  //Manejar cuando se clickea una fecha u hora, para crear un evento
  handleDateSelect(selectInfo: DateSelectArg) {    
    
    this.title="";
    this.description="";
    const fechaInicio: any = selectInfo.startStr;
    const fechaFinal: any = selectInfo.endStr;
    this.startDate = this.formatearFecha(fechaInicio);
    this.endDate = this.formatearFecha(fechaFinal);

    const allDay: any = selectInfo.allDay;
    this.isAllDay = allDay;

    console.log(this.startDate);
    console.log(this.endDate);

    if(!allDay){
      this.startTime = this.formatearHora(fechaInicio);
      this.endTime = this.formatearHora(fechaFinal);
    } else {
      this.startTime="";
      this.endTime="";
    }

    console.log(this.startTime);
    console.log(this.endTime);

    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    $('#addEventModal').modal('show');

  }

  formatearFecha(fecha: Date | null): string {
    return fecha ? new Date(fecha).toISOString().split('T')[0] : '';
  }
  
  formatearHora(fecha: Date | null): string {
    return fecha ? new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  }

  //Manejar cuando se clickea un evento, para editarlo o eliminarlo
  handleEventClick(clickInfo: EventClickArg) {
    $('#clickEventModal').modal('show');

    this.eventoId = clickInfo.event.id;
    this.tituloM = clickInfo.event.title;
    this.descripcionM = clickInfo.event.extendedProps['description'];
    this.fechaInicioM = this.formatearFecha(clickInfo.event.start);
    this.fechaFinalM = this.formatearFecha(clickInfo.event.end);
    this.horaInicioM = this.formatearHora(clickInfo.event.start);
    this.horaFinalM = this.formatearHora(clickInfo.event.end);

    if(this.horaInicioM=='00:00' && (this.horaFinalM=='00:00' || this.horaFinalM=='')){
      this.isAllDay = true;
    } else {
      this.isAllDay = false;
    }
    
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); 
  }

  //GOOGLE CALENDAR----------------------------------------------------------------------------------------
  private actualizarListaDeEventos(): void {
    this.CalendarService.iniciarCalendario()
      .pipe(
        switchMap(() => this.CalendarService.updateEventList()),
        map((data: any) => this.transformarEventos(data))
      )
      .subscribe(
        (eventosTransformados: any) => {
          this.calendarOptions.events = eventosTransformados;
          console.log('Eventos obtenidos:', this.calendarOptions.events);
        },
        (error) => {
          console.error('Error al obtener eventos:', error);
        }
      );
  }

  //Transforma los eventos de google calendar
  private transformarEventos(eventosGoogle: any[]): any[] {
    return eventosGoogle.map((eventoGoogle) => {
      return {
        id: eventoGoogle.id,
        title: eventoGoogle.summary,
        start: eventoGoogle.start.dateTime || eventoGoogle.start.date,
        end: eventoGoogle.end.dateTime || eventoGoogle.end.date,
        extendedProps: {
          description: eventoGoogle.description
        },
      };
    });
  }

  manejarEventoAgregadoOEliminado(): void {
    this.actualizarListaDeEventos();
  }

  updateEndDateMin(start: string, allDay: boolean, startHM?: string) {
    console.log('updateEndDateMin called with', start, allDay, startHM);

    if (start && allDay) {
        const startDate = new Date(start);
        startDate.setDate(startDate.getDate() + 1); // Incrementar la fecha de inicio en un día
        this.minEndDate = startDate.toISOString().split('T')[0]; // Actualizar endDate con la fecha mínima permitida
        this.endDate = this.minEndDate; // Establecer endDate en la fecha mínima permitida
        this.minEndTime = ''; // Limpiar minEndTime cuando es todo el día
    } else if (start && !allDay) {
        this.minEndDate = start; // La fecha mínima permitida para endDate es la misma que la fecha de inicio
        this.endDate = start; // La fecha de finalización debe ser al menos la misma que la fecha de inicio

        if (startHM && this.startDate === this.endDate) {
          this.minEndTime = startHM;
        } else {
          this.minEndTime = ''; // Limpiar minEndTime si las fechas no son iguales o no hay startHM
        }
    } else {
        this.minEndDate = ''; // Si no hay fecha de inicio válida, limpiar endDate
        this.minEndTime = ''; // Limpiar minEndTime también
    }
}


  //ABM DE EVENTOS-------------------------------------------------------------------------------------------
  crearEvento() {
    let startDateTime;
    let endDateTime;

    if (this.formulario.value.allDay) {
      // Si es un evento de todo el día
      startDateTime = {
        date: this.formulario.value.startDate,
      };
      endDateTime = {
        date: this.formulario.value.endDate,
      };
    } else {
      // Si no es un evento de todo el día
      startDateTime = {
        dateTime: new Date(
          `${this.formulario.value.startDate}T${this.formulario.value.startTime}:00`
        ).toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires',
      };
      endDateTime = {
        dateTime: new Date(
          `${this.formulario.value.endDate}T${this.formulario.value.endTime}:00`
        ).toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires',
      };
    }
    const nuevoEvento = new evento(
      this.formulario.value.summary,
      this.formulario.value.description,
      startDateTime,
      endDateTime
    );

    this.CalendarService.crearEvento(nuevoEvento);
    this.manejarEventoAgregadoOEliminado();
    this.formulario.resetForm();
  } 
  
  modificarEvento(){
    let startDateTime;
    let endDateTime;
    if (this.formularioModificar.value.allDay) {
      // Si es un evento de todo el día
      startDateTime = {
        date: this.formularioModificar.value.startDate,
      };
      endDateTime = {
        date: this.formularioModificar.value.endDate,
      };
    } else {
      // Si no es un evento de todo el día
      startDateTime = {
        dateTime: new Date(
          `${this.formularioModificar.value.startDate}T${this.formularioModificar.value.startTime}:00`
        ).toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires',
      };
      endDateTime = {
        dateTime: new Date(
          `${this.formularioModificar.value.endDate}T${this.formularioModificar.value.endTime}:00`
        ).toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires',
      };
    }
    const eventoModificado = new evento(
      this.formularioModificar.value.summary,
      this.formularioModificar.value.description,
      startDateTime,
      endDateTime
    );
  
    this.CalendarService.actualizarEvento(eventoModificado, this.eventoId);
    this.manejarEventoAgregadoOEliminado();
    this.formularioModificar.resetForm();
  }

  borrarEvento(){
    this.CalendarService.borrarEvento(this.eventoId);
    this.manejarEventoAgregadoOEliminado();
  }
}
