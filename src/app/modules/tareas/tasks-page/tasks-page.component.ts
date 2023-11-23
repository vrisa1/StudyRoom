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
    this.updateTask(task);
  }

  updateTask(task: any, acceptChanges: boolean = false): void {
    if (this.taskForm.valid) {
      if (acceptChanges) {
        const updatedTask: any = this.taskForm.value;
        updatedTask.id = task.id; // Mantener el ID original
        this.tasksService.updateTask(updatedTask).subscribe(() => {
          this.loadTasks();
          this.taskForm.reset();
        });
      } else {
        this.taskForm.reset();
      }
    }
  }

  editTask(task: any): void {
    this.taskForm.reset();  // Reiniciar el formulario antes de editar
  
    // Verificar si el control 'id' existe en el formulario
    const idControl = this.taskForm.get('id');
    if (idControl) {
      idControl.setValue(task.id);
    }
  
    // Establecer los valores para los otros controles
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
    });
  }
  
  acceptChanges(): void {
    const updatedTask: any = this.taskForm.value;
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.taskForm.reset();
    }
  }
  
  rejectChanges(): void {
    this.taskForm.reset();
  }

  deleteTask(taskId: number): void {
    this.tasksService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
      this.taskForm.reset();
    });
  }
}
