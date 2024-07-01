import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { tarea } from 'src/app/core/models';
import { RequestsService } from 'src/app/core/services/requests.service';

@Injectable({
  providedIn: 'root'
})

//Servicio de tareas
export class TasksService {


  constructor(private requestsService: RequestsService) {}

 
  iniciarTareas(): Observable<any> {
    return this.requestsService.tareasInit().pipe(
      switchMap(() => this.actualizarTareas()),
      tap((tareas) => {
        console.log('Tareas inicializadas con éxito:', tareas);
      }),
    );
  }

  actualizarTareas(): Observable<any> {
    return this.requestsService.getTareas().pipe(
      map((tareas) => {
        if(tareas){
          tareas.forEach((tarea: any, index: number) => {
            tarea.id = index + 1;
          })}else{
            tareas = [];
        }
        return tareas;
        }))
  }

  editarTareas(tareas: any): Observable<any> {
    return this.requestsService.updateBddTareas(tareas).pipe(
      tap((respuesta) => {
        console.log("respuesta: " + JSON.stringify(respuesta));
      })
    );}
}
