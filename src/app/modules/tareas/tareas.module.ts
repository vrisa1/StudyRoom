import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksPageComponent } from './tasks-page/tasks-page.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { TaskHelpComponent } from './task-help/task-help.component';



@NgModule({
  declarations: [
    TasksPageComponent,
    TaskHelpComponent
  ],
  imports: [
    CommonModule,
    TareasRoutingModule,
    ReactiveFormsModule,
    SharedModule
]})
export class TareasModule { }
