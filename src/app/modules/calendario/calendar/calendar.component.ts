declare var $ :any;

import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, forwardRef, signal } from '@angular/core';
import { CalendarOptions, Calendar, EventClickArg, EventApi, DateSelectArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
//import { INITIAL_EVENTS, createEventId } from './event-utils';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import esLocale from '@fullcalendar/core/locales/es';
import multiMonthPlugin from '@fullcalendar/multimonth';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import { CalendarPageComponent } from '../calendar-page/calendar-page.component';
import { CalendarService } from '../service/calendar.service';
import { T } from '@fullcalendar/core/internal-common';
import { map, switchMap } from 'rxjs';
import { AuthGoogleService } from '../../login/service/auth-google.service';
import { RequestsService } from 'src/app/core/services/requests.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit{

  eventos: any[] = [];

  ngOnInit(): void {

    this.actualizarListaDeEventos();
    console.log(this.calendarOptions);
  //  this.eventosFC = this.CalendarPageComponent.manejarEventoAgregadoOEliminado();
  //  console.log(this.CalendarPageComponent.manejarEventoAgregadoOEliminado);
  //  console.log(this.eventosFC);
   //this.googleCalendarToArray();
  }
  
  constructor(private changeDetector: ChangeDetectorRef, private CalendarService: CalendarService, private CalendarPageComponent : CalendarPageComponent, private AuthGoogleService: AuthGoogleService, private RequestsService: RequestsService) {}

  calendarVisible = signal(true);
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      multiMonthPlugin,
      //bootstrap5Plugin
      googleCalendarPlugin
    ],
    locale: esLocale,
    nowIndicator: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    events: "",
    // events: [
    //   {
    //     id: '1',
    //     title: 'hola',
    //     start: new Date().toISOString().replace(/T.*$/, ''),
    //     color: 'green',
    //   },
    //   {
    //     id: '2',
    //     title: 'brisa',
    //     start: new Date().toISOString().replace(/T.*$/, '') + 'T00:00:00',
    //   },
    //   {
    //     id: '3',
    //     title: 'pepe',
    //     start: new Date().toISOString().replace(/T.*$/, '') + 'T12:00:00',
    //   },
    // ],
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  
  currentEvents = signal<EventApi[]>([]);

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');

    //$("#addEventModal").modal("show");

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

     if (title) {
       calendarApi.addEvent({
         //id: createEventId(),
         title,
         start: selectInfo.startStr,
         end: selectInfo.endStr,
         allDay: selectInfo.allDay
       });
     }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
  
  private actualizarListaDeEventos(): void {
    this.CalendarService.iniciarCalendario().pipe(
      switchMap(() => this.CalendarService.updateEventList()),
      map((data: any) => this.transformarEventos(data)) // Transforma los eventos aquí
    ).subscribe(
      (eventosTransformados: any) => {
        this.calendarOptions.events = eventosTransformados;
        console.log('Eventos obtenidos:', this.eventos);
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }
  
  private transformarEventos(eventosGoogle: any[]): any[] {
    // Realiza la lógica de transformación aquí
    return eventosGoogle.map((eventoGoogle) => {
      return {
        id: eventoGoogle.id,
        title: eventoGoogle.summary,
        start: eventoGoogle.start.dateTime || eventoGoogle.start.date, // Ajusta según tus necesidades
        end: eventoGoogle.end.dateTime || eventoGoogle.end.date, // Ajusta según tus necesidades
        // Otras propiedades según tus necesidades
      };
    });
  }
 /*
  private actualizarListaDeEventos(): void{
    this.CalendarService.iniciarCalendario().pipe(
      switchMap(() => this.CalendarService.updateEventList())
    ).subscribe(
      (data: any) => {
        this.calendarOptions.events = data;
        this.eventos = data;
        console.log('Eventos obtenidos:', this.eventos);
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }
  */
  manejarEventoAgregadoOEliminado(): void {
    this.actualizarListaDeEventos();
  }

  
  //  googleCalendarToArray(){
  //    const eventosG = this.eventos;

  //    this.eventos.
    
  //    let events: EventInput[] = [];

  //    for(let evento of eventosG){
  //      events.push(evento);
  //    }

  //    console.log("googleCalendarToFC: " + events);
  //  }
}

