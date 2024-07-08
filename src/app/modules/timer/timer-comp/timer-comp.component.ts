import { Component, OnInit } from '@angular/core';
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
        transform: 'translateX(-25%)'
      })),
      state('three', style({
        transform: 'translateX(-50%)'
      })),
      state('four', style({
        transform: 'translateX(-75%)'
      })),
      transition('* <=> *', [
        animate('500ms ease')
      ])
    ])
  ]
})

export class TimerCompComponent implements OnInit{
  
  //VARIABLE DE PÁGINA (ANIMACIÓN)

  pageNumber = 'one'

  //VARIABLES TEMPORIZADOR

  workDuration = 25
  breakDuration = 5
  minutes = this.workDuration
  seconds = 0
  totalCycles = 4
  currentCycle = 1

  //MENSAJE DE ESTADO (POMODORO <=> DESCANSO)

  stage = 'Pomodoro'

  //VARIABLE DE INTERVALO (FUNCIONALIDAD TEMPORIZADOR)

  interval: any //Almacena en ID del intervalo.

  //BOOLEANOS DE ESTADO DEL TEMPORIZADOR (PAUSA, STOP, PLAY)

  running = false
  paused = false

  //LÍMITES DE TIEMPO EN CONFIGURACIÓN

  minFocusReached = false
  maxFocusReached = false
  minBreakReached = false
  maxBreakReached = false

  //LÍMITES DE CANTIDAD DE CICLOS
  minCycles = false
  maxCycles = false 

  //VARIABLES DE AUDIO

  workAudio: any
  breakAudio: any

  //BOTONES "SIGUIENTE" Y "ATRÁS" (ANIMACIONES) 

  toggle(pageNumber: string){
    this.pageNumber = pageNumber
  }

  //BOTONES "-" Y "+" (CONFIGURACIÓN DE LÍMITE DE TIEMPO)

  increaseFocusTime(){ //Botón "+" en configuración de trabajo.
    this.workDuration += 1
    this.minutes = this.workDuration //Actualiza minutos del contador/temporizador.
    if(this.workDuration == 60){ //No permite más de 60 minutos.
      this.maxFocusReached = true
    }
    if(this.workDuration == 2){ //Vuelve a habilitar el botón "-".
      this.minFocusReached = false
    }
  }

  decreaseFocusTime(){ //Botón "-" en configuración de trabajo.
    this.workDuration -= 1
    this.minutes = this.workDuration //Actualiza minutos del contador/temporizador.
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

  //BOTONES DE CONFIGURACIÓN DE CICLOS

  increaseTotalCycles(){
    this.totalCycles += 1
      if(this.totalCycles == 10){
     this.maxCycles = true
    }
    if(this.totalCycles == 2){
     this.minCycles = false
    }
  }

  decreaseTotalCycles(){
    this.totalCycles --
    if(this.totalCycles == 1){
     this.minCycles = true
    }
    if(this.totalCycles == 9){
     this.maxCycles = false
    }
  }

  //BOTONES "PAUSA", "STOP"

  interrupt(){
    this.paused = true
  }

  resume(){
    this.paused = false
  }

  clear(){ //Detiene el temporizador y lo devuelve al valor elegido. Cambia estado a !running
    this.running = false
    clearInterval(this.interval)
    this.minutes = this.workDuration
    this.seconds = 0
    this.stage = "Pomodoro"
    this.currentCycle = 1
  }

  //FUNCIONALIDAD

  start(){

    this.running = true

    this.interval = setInterval(() => counter(), 1000) //Comienza el conteo cada 1 segundo.

    const counter = () => { //Función ejecutada dentro del intervalo.

      if(!this.paused){ //Si el temporizador no está pausado,

        this.seconds -- //se decrementa 1 segundo.

        if(this.seconds == -1 && this.minutes == 0 && this.stage == "Pomodoro"){ //Cuando el tiempo de trabajo se termina,
          this.playBreakAlarm() //suena la alarma,
          this.stage = 'Descanso' //se cambia el estado a descanso,
          this.minutes = this.breakDuration //se asigna la duración de descanso a la variable minutos,
          this.seconds = 0 //se inicializa la variable segundos en 0.
        }

        else if(this.seconds == -1 && this.minutes == 0 && this.stage == "Descanso"){ //Cuando el tiempo de descanso se termina,
          
          this.currentCycle ++ //se aumenta el contador de ciclos.

          if(this.currentCycle > this.totalCycles){ //Si ya se cumplió la cantidad de ciclos previamente configurada,
            this.clear() //se detiene el temporizador,
            this.currentCycle = 1 //se reinicia el contador de ciclos.
          }
          else{ //Si todavía no se cumplió la cantidad de ciclos,
            this.stage = 'Pomodoro' //se cambia el estado a descanso,
            this.minutes = this.workDuration //se asigna la duración de descanso a la variable minutos,
            this.seconds = 0 //se inicializa la variable segundos en 0.
          }

          this.playWorkAlarm() //Suena la alarma.

        }

        else if(this.seconds == -1){ //Cuando los segundos se vuelven negativos,
          this.seconds = 59 //se vuelve a empezar desde 59,
          this.minutes-- //se decrementa 1 minuto.
        }

      }
    }
  }
  
  //FUNCIONES DE ALARMA (AUDIO DEL TEMPORIZADOR)

  playWorkAlarm(){ //Dispara la alarma de trabajo.
    this.workAudio.play()
  }

  playBreakAlarm(){ //Dispara la alarma de descanso.
    this.breakAudio.play()
  }

  ngOnInit(){ //Asigna los audios de las alarmas y las carga.
    this.workAudio = new Audio()
    this.workAudio.src = "../assets/workAlarm.mp3"
    this.workAudio.load()

    this.breakAudio = new Audio()
    this.breakAudio.src = "../assets/breakAlarm.mp3"
    this.breakAudio.load()
  }

  ngOnDestroy(){ //Detiene el conteo al salir de la página del temporizador
    clearInterval(this.interval)
  }
  
}
