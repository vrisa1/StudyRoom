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
import { AuthGoogleService } from '../../login/service/auth-google.service';
import { RequestsService } from 'src/app/core/services/requests.service';
import { NgForm, FormsModule } from '@angular/forms';
import { evento } from 'src/app/core/models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  isAllDay: boolean = false;
  startDate: string= ""; // Asegúrate de que el tipo sea el adecuado para tus necesidades
  endDate: string="";

  @Output() eventoCreado = new EventEmitter<evento>();

  @ViewChild('formulario') formulario!: NgForm;

  ngOnInit(): void {
    this.actualizarListaDeEventos();
    console.log(this.actualizarListaDeEventos());
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private CalendarService: CalendarService,
    private CalendarPageComponent: CalendarPageComponent,
    private AuthGoogleService: AuthGoogleService,
    private RequestsService: RequestsService
  ) {}

  //FULL CALENDAR------------------------------------------------------------------------------------------
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
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  currentEvents = signal<EventApi[]>([]);

  handleDateSelect(selectInfo: DateSelectArg) {
    $('#addEventModal').modal('show');
    
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    const fechaInicio: any = selectInfo.startStr;
    this.startDate = fechaInicio;

    const fechaFinal: any = selectInfo.startStr;
    this.endDate = fechaFinal;

  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  //GOOGLE CALENDAR----------------------------------------------------------------------------------------
  private actualizarListaDeEventos(): void {
    this.CalendarService.iniciarCalendario()
      .pipe(
        switchMap(() => this.CalendarService.updateEventList()),
        map((data: any) => this.transformarEventos(data)) // Transforma los eventos aquí
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

  manejarEventoAgregadoOEliminado(): void {
    this.actualizarListaDeEventos();
  }

  //AGREGAR EVENTO-----------------------------------------------------------------------------------------

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
          `${this.formulario.value.startDate}T${this.formulario.value.startTime}:00Z`
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

    console.log(nuevoEvento);

    this.CalendarService.crearEvento(nuevoEvento);
    this.manejarEventoAgregadoOEliminado();

    this.formulario.resetForm();
  }
}
