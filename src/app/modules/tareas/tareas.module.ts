import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksPageComponent } from './tasks-page/tasks-page.component';



@NgModule({
  declarations: [
    TasksPageComponent
  ],
  imports: [
    CommonModule,
    TareasRoutingModule,
    ReactiveFormsModule
]})
export class TareasModule { }
