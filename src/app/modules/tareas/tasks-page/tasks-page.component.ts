import { Component } from '@angular/core';
import { TasksService } from '../service/tasks.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {
  tasks: any[] = [];
  taskForm: FormGroup;
  editForm: FormGroup;

  task: any;

  constructor(private fb: FormBuilder, private tasksService: TasksService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

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

  markAsToDo(task: any){
    task.state = 'todo';
    this.tasksService.updateTask(task).subscribe(()=>{
      console.log("Marcada como pendiente")
    });
  }

  markAsInCourse(task: any){
    task.state = 'inCourse';
    this.tasksService.updateTask(task).subscribe(()=>{
      console.log("Marcada como en proceso")
    });
  }

  markAsCompleted(task: any): void {
    task.state = 'completed';
    this.tasksService.updateTask(task).subscribe(()=>{
      console.log("Marcada como completada")
    });
  }

  deleteTask(taskId: number): void {
    this.tasksService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
      this.taskForm.reset();
    });
  }
  
  editTask(task: any): void {
    this.task = task;
    console.log(task);
    this.editForm.reset(); 
    console.log(task);
    this.editForm.patchValue({
      title: task.title,
      description: task.description,
    });

  }
  
  acceptChanges(): void {
    const updatedTask: any = this.editForm.value;
    updatedTask.id = this.task.id; // Mantener el ID original
    updatedTask.state = this.task.state;
    this.tasksService.updateTask(updatedTask).subscribe(() => {
      this.loadTasks();
      this.editForm.reset();
  })}
  

}
