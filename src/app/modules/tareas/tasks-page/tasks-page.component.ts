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

  constructor(private fb: FormBuilder, private tasksService: TasksService) {
    this.taskForm = this.fb.group({
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
  
  editando : Boolean= false;

  editTask(task: any): void {
    this.taskForm.reset(); 
    this.editando = true
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
    });

  }
  
  acceptChanges(task: any): void {
    const updatedTask: any = this.taskForm.value;
    updatedTask.id = task.id; // Mantener el ID original
    this.tasksService.updateTask(updatedTask).subscribe(() => {
      this.loadTasks();
      this.taskForm.reset();
  })}
  
  rejectChanges(): void {
    this.taskForm.reset();
    this.editando = false
  }

  
}
