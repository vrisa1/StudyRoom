import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import { switchMap } from 'rxjs';
import { T } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})

export class CalendarPageComponent implements OnInit {

  //eventos: any[] = [];

  constructor(private CalendarService : CalendarService){}
  
  ngOnInit(): void {
    //this.actualizarListaDeEventos();
  }
    
  // private actualizarListaDeEventos(): any[] {
  //   this.CalendarService.iniciarCalendario().pipe(
  //     switchMap(() => this.CalendarService.updateEventList())
  //   ).subscribe(
  //     (data: any) => {
  //       this.eventos = data;
  //       console.log('Eventos obtenidos:', this.eventos);
  //     },
  //     (error) => {
  //       console.error('Error al obtener eventos:', error);
  //     }
  //   );
  //   return this.eventos;
  // }

  // manejarEventoAgregadoOEliminado(): any[] {
  //   return this.actualizarListaDeEventos();
  // }
  
}
