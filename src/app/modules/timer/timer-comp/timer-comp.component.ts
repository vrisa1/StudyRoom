import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-timer-comp',
  templateUrl: './timer-comp.component.html',
  styleUrls: ['./timer-comp.component.scss'],
  animations: [
    trigger('pageNumber', [
      state('one', style({
        transform: 'translateX(-0%)'
      })),
      state('two', style({
        transform: 'translateX(-33.3%)'
      })),
      state('three', style({
        transform: 'translateX(-66.6%)'
      })),
      transition('* <=> *', [
        animate('500ms ease')
      ])
    ])
  ]
})
export class TimerCompComponent {

  //VARIABLE DE PÁGINA (ANIMACIÓN)

  pageNumber = 'one'

  //VARIABLES TEMPORIZADOR

  workDuration = 25
  breakDuration = 5
  minutes = this.workDuration // - 1 ??
  seconds = 0

  //MENSAJE DE ESTADO (POMODORO <=> DESCANSO)

  message = 'Pomodoro'

  //VARIABLE DE INTERVALO (FUNCIONALIDAD TEMPORIZADOR)

  interval: any = 0

  //BOOLEANOS DE ESTADO DEL TEMPORIZADOR (PAUSA, STOP, PLAY)

  pause = false;
  // stop = false;

  //LIMITES DE TIEMPO EN CONFIGURACIÓN

  minFocusReached = false
  maxFocusReached = false
  minBreakReached = false
  maxBreakReached = false

  //BOTONES "SIGUIENTE" Y "ATRÁS" (ANIMACIONES) 

  toggle(pageNumber: string){
    this.pageNumber = pageNumber;
  }

  //BOTONES "-" Y "+" (CONFIGURACIÓN DE LÍMITE DE TIEMPO)

  increaseFocusTime(){ //Botón "+" en configuración de trabajo.
    this.workDuration += 1
    this.minutes = this.workDuration //this.workDuration - 1 ?? Actualiza minutos del contador/temporizador.
    if(this.workDuration == 60){ //No permite más de 60 minutos.
      this.maxFocusReached = true
    }
    if(this.workDuration == 2){ //Vuelve a habilitar el botón "-".
      this.minFocusReached = false
    }
  }

  decreaseFocusTime(){ //Botón "-" en configuración de trabajo.
    this.workDuration -= 1
    this.minutes = this.workDuration //this.workDuration - 1 ?? Actualiza minutos del contador/temporizador.
    if(this.workDuration == 1){ //No permite menos de 1 minuto.
      this.minFocusReached = true
    }
    if(this.workDuration == 59){ //Vuelve a habilitar el botón "+".
      this.maxFocusReached = false
    }
  }

  increaseBreakTime(){ //Botón "+" en configuración de descanso.
    this.breakDuration += 1
    if(this.breakDuration == 60){ //No permite más de 60 minutos.
      this.maxBreakReached = true
    }
    if(this.breakDuration == 2){ //Vuelve a habilitar el botón "-".
      this.minBreakReached = false
    }
  }

  decreaseBreakTime(){ //Botón "-" en configuración de descanso.
    this.breakDuration -= 1
    if(this.breakDuration == 1){ //No permite menos de 1 minuto.
      this.minBreakReached = true
    }
    if(this.breakDuration == 59){ //Vuelve a habilitar el botón "+".
      this.maxBreakReached = false
    }
  }

  //BOTONES "PAUSA", "STOP"

  interrupt(){
    this.pause = true;
  }

  // clear(){
  //   this.stop = true;
  // }

  //FUNCIONALIDAD

  start(){ //TERMINAR

    this.interval = setInterval(() => counter(), 1000) //intervalo o suscripcion?? Comienza el conteo cada 1 segundo.

    const counter = () => { //Función ejecutada dentro del intervalo.

      if(!this.pause){ //Si el temporizador no está pausado,

        this.seconds -- //se decrementa 1 segundo.

        if(this.seconds == -1 && this.minutes == 0){ //Cuando el tiempo de trabajo se termina,
          this.message = 'Descanso' //se cambia el estado a descanso,

          //aca deberia sonar la alarma

          this.minutes = this.breakDuration //se asigna la duración de descanso a la variable minutos,
          this.seconds = 0 //se inicializa la variable segundos en 0.
        }
        else if (this.seconds == -1) { //Cuando los segundos se vuelven negativos,
          this.seconds = 59 //se vuelve a empezar desde 59,
          this.minutes-- //se decrementa 1 minuto.
        }
          
      
       

      }
      

    }
  }
  
}


// if(this.seconds == -1){ //cuando los segundos se vuelven negativos

//   this.seconds = 59 //se vuelve a empezar
//   this.minutes-- //se decrementa un minuto

//   if(this.minutes == -1){ //cuando se terminan de contar los minutos

//     this.message = 'Descanso' //se cambia el estado a descanso
//   }

// }