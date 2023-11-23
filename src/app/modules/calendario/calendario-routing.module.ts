import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';

const routes: Routes = [  {
  path: '',
  children: [
    { path: 'tasks', component: TasksPageComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarioRoutingModule { }
