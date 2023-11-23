import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import { switchMap } from 'rxjs';
import { evento } from 'src/app/core/models';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit {

  eventos: any[] = [];

  evento = new evento("Evento Actualizado","Este evento fue actualizado",{
    "dateTime": "2023-11-22T00:18:00Z",
    "timeZone": "America/Argentina/Buenos_Aires"
},{
  "dateTime": "2023-11-22T00:24:00Z",
  "timeZone": "America/Argentina/Buenos_Aires"
})
  


  constructor(private CalendarService : CalendarService){}
  
  ngOnInit(): void {
    this.actualizarListaDeEventos();
  }
    
  private actualizarListaDeEventos(): void{
    this.CalendarService.iniciarCalendario().pipe(
      switchMap(() => this.CalendarService.updateEventList())
    ).subscribe(
      (data: any) => {
        this.eventos = data;
        console.log('Eventos obtenidos:', this.eventos);
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }

  manejarEventoAgregadoOEliminado(): void {
    this.actualizarListaDeEventos();
  }

  eventoId: string="slfkdst5ju1m151e64ghnn3av8" 
  
  borrarEvento(){
    this.CalendarService.borrarEvento(this.eventoId);
    this.manejarEventoAgregadoOEliminado();
  }
  
  actualizarEvento(){
    this.CalendarService.actualizarEvento(this.evento, this.eventoId);
    this.manejarEventoAgregadoOEliminado();
  }
  
}
