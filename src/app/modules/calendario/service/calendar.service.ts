import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestsService } from 'src/app/core/services/requests.service';
import { evento } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
   
  eventoId = "";

  constructor(private RequestsService : RequestsService ) { }

  iniciarCalendario(): Observable<void> {
    return new Observable<void>((observer) => {
      this.RequestsService.calendarInit().subscribe(
        () => {
          console.log('Calendario inicializado con éxito');
          observer.next();
          observer.complete();
        }
      );
    });
  }
  updateEventList(): Observable<any[]>{
      return this.RequestsService.getEvents();
    }
  
  
  
  borrarEvento(eventoId : string){
    this.RequestsService.deleteEvent(eventoId).subscribe(
      (deleteEvent : any)=>{
        console.log('Evento eliminado con éxito:', deleteEvent);
      }
    )
  }

  actualizarEvento(evento : evento, eventoId : string){
    this.RequestsService.updateEvent(evento, eventoId).subscribe(
      (updateEvent : any) =>{
        console.log('Evento actualizado con éxito:', updateEvent);
      })
  }
        
  crearEvento(evento : evento){
    this.RequestsService.addEvent(evento).subscribe(
        (addedEvent : any) =>{
          console.log('Evento agregado con éxito:', addedEvent);
        })
  }
    
  }
