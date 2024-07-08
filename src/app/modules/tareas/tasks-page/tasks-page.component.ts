import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../service/tasks.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})

export class TasksPageComponent implements OnInit{

  tasks: any[] = [];
  taskForm: FormGroup;
  editForm: FormGroup;
  loading: boolean = true;

  task: any;
  taskIdToDelete: any;

  constructor(private fb: FormBuilder, private tasksService: TasksService) {
    
    //Formulario para agregar tarea
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });

    //Formulario para editar tarea
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    
    this.tasksService.iniciarTareas().subscribe((tasks)=>{
      this.tasks = tasks;
      this.loading = false;
      console.log("Tareas: "+JSON.stringify(this.tasks));
    })
  }

  resetForm(): void {
    this.taskForm.reset();
  }

  //Obtener el arreglo de las tareas existentes
  loadTasks(): void{
    this.tasksService.actualizarTareas().subscribe(tasks=>{
        this.tasks = tasks;
        console.log('Tareas actualizadas:', this.tasks);
    }) 
  }
  
  //Agregar tarea
  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: any = this.taskForm.value;
      newTask.state = 'todo'; // Establecer el estado predeterminado
      newTask.id = this.tasks.length + 1; //// Asignar un ID basado en la longitud del arreglo
      this.tasks.push(newTask);
      this.saveTasks();
    }
  }

  //Marcar tarea como pendiente
  markAsToDo(task: any){
    task.state = 'todo';
    this.saveTasks();
  }

  //Marcar tarea como en proceso
  markAsInCourse(task: any){
    task.state = 'inCourse';
    this.saveTasks();
  }

  //Marcar tarea como completada
  markAsCompleted(task: any): void {
    task.state = 'completed';
    this.saveTasks();
  }
  
  //Obtener ID de la tarea a eliminar
  getIdToDelete(taskId: number): void{
    this.taskIdToDelete = taskId; 
  }

  //Eliminar tarea
  deleteTask(): void {
    this.tasks = this.tasks
    .filter(task => task.id !==  this.taskIdToDelete)
    .map(
      (task: any, index: number) => {
      task.id = index + 1;
      return task;
    });
    this.saveTasks();
  }
  
  //Editar tarea
  editTask(task: any): void {
    this.task = task;
    this.editForm.reset(); 
    this.editForm.patchValue({
      title: task.title,
      description: task.description,
    });
  }
  
  //Aceptar cambios al editar tarea
  acceptChanges(): void {
    const updatedTask: any = this.editForm.value;
    updatedTask.id = this.task.id; // Mantener el ID original
    updatedTask.state = this.task.state;
    
    // Elimina la tarea existente y agrega la actualizada
    this.tasks = this.tasks.filter(task => task.id !== updatedTask.id).concat(updatedTask);

    this.saveTasks();
}

  private saveTasks(): void {
  this.tasksService.editarTareas(this.tasks).subscribe(() => {
    this.taskForm.reset();
    this.editForm.reset();
  });
}

  //Si existe alguna tarea con estado pendiente
  toDoExist(): boolean {
    for (let task of this.tasks){
      if(task.state === 'todo'){
        return true;
      }
    }
    return false;
  }

  //Si existe alguna tarea con estado en proceso
  inCourseExist(): boolean {
    for (let task of this.tasks){
      if(task.state === 'inCourse'){
        return true;
      }
    }
    return false;
  }

  //Si existe alguna tarea con estado completada
  completedExist(): boolean {
    for (let task of this.tasks){
      if(task.state === 'completed'){
        return true;
      }
    }
    return false;
  }

}
