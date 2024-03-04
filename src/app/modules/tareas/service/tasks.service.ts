import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Servicio de tareas
export class TasksService {

  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  //Obtener arreglo de tareas
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //Agregar tarea
  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  //Editar tarea
  updateTask(task: any): Observable<any> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<any>(url, task);
  }

  //Eliminar tarea
  deleteTask(taskId: number): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<any>(url);
  }
}
