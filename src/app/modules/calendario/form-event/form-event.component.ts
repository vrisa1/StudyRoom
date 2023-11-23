import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { evento } from 'src/app/core/models';
import { CalendarService } from '../service/calendar.service'
import {CalendarPageComponent } from '../calendar-page/calendar-page.component'

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss']
})
export class FormEventComponent {

  @Output() eventoCreado = new EventEmitter<evento>();

  
  @ViewChild('formulario') formulario!: NgForm;
  @ViewChild('formulario2') formulario2!: NgForm;

  constructor(private CalendarService: CalendarService, private CalendarPageComponent : CalendarPageComponent){}

  crearEvento() {
    //Falta verificacion fechas inválidas!!!
    const nuevoEvento = new evento(
      this.formulario.value.summary,
      this.formulario.value.description,
      {
        dateTime: new Date (this.formulario.value.startDateTime).toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires'
      },
      {
        dateTime: new Date (this.formulario.value.endDateTime).toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires' 
      }
    );
    
    console.log(nuevoEvento);
   
    this.CalendarService.crearEvento(nuevoEvento);
    this.CalendarPageComponent.manejarEventoAgregadoOEliminado();
  
    this.formulario.resetForm();
  }

  verFechayHora() {
    console.log("fecha: "+ this.formulario2.value.prueba);
    console.log("Hora: "+ this.formulario2.value.prueba2);
  }
}
