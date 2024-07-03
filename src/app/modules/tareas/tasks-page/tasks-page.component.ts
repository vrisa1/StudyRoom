import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../service/tasks.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})

export class TasksPageComponent implements OnInit{

  tasks: any[] = [];
  taskForm: FormGroup;
  editForm: FormGroup;

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
    this.loadTasks();

  }

  resetForm(): void {
    this.taskForm.reset();
  }

  //Obtener el arreglo de las tareas existentes
  loadTasks(): void {
    this.tasksService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  //Agregar tarea
  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: any = this.taskForm.value;
      newTask.state = 'todo'; // Establecer el estado predeterminado
      this.tasksService.addTask(newTask).subscribe(() => {
        this.loadTasks();
        this.taskForm.reset();
      });
    }
  }

  //Marcar tarea como pendiente
  markAsToDo(task: any){
    task.state = 'todo';
    this.tasksService.updateTask(task).subscribe(()=>{
      console.log("Marcada como pendiente")
    });
  }

  //Marcar tarea como en proceso
  markAsInCourse(task: any){
    task.state = 'inCourse';
    this.tasksService.updateTask(task).subscribe(()=>{
      console.log("Marcada como en proceso")
    });
  }

  //Marcar tarea como completada
  markAsCompleted(task: any): void {
    task.state = 'completed';
    this.tasksService.updateTask(task).subscribe(()=>{
      console.log("Marcada como completada")
    });
  }

  //Obtener ID de la tarea a eliminar
  getIdToDelete(taskId: number): void{
    this.taskIdToDelete = taskId; 
  }

  //Eliminar tarea
  deleteTask(): void {
    this.tasksService.deleteTask(this.taskIdToDelete).subscribe(() => {
      this.loadTasks();
      this.taskForm.reset();
    });
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
    this.tasksService.updateTask(updatedTask).subscribe(() => {
      this.loadTasks();
      this.editForm.reset();
  })}

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
