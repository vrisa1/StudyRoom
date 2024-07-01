import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing/landing-page/landing-page.component';
import { Error404Component } from './shared/error404/error404.component';
import { LoginModule } from './modules/login/login.module';
import { MainModule } from './modules/main/main.module';
import { LoginCompComponent } from './modules/login/login-comp/login-comp.component';
import { UserAccComponent } from './shared/user-acc/user-acc.component';
import { MainPageComponent } from './modules/main/main-page/main-page.component';
import { TimerCompComponent } from './modules/timer/timer-comp/timer-comp.component';
import { CalendarPageComponent } from './modules/calendario/calendar-page/calendar-page.component';
import { FilesPageComponent } from './modules/files/files-page/files-page.component';
import { TasksPageComponent } from './modules/tareas/tasks-page/tasks-page.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponent,
    loadChildren: ()=> import("./modules/landing/landing.module").then(m => m.LandingModule)
  },
  {
    path: 'main', 
    component: MainPageComponent,
    loadChildren: ()=> import("./modules/main/main.module").then(m => m.MainModule)
  }, 
  {
    path: 'timer', 
    component: TimerCompComponent,
    loadChildren: ()=> import("./modules/timer/timer.module").then(m => m.TimerModule),
    canActivate:[authGuard]
  },
  {
    path: 'calendar',
    component: CalendarPageComponent,
    loadChildren: ()=> import("./modules/calendario/calendario.module").then(m=>m.CalendarioModule),
    canActivate:[authGuard]
  },
  {

    path: 'tasks',
    component: TasksPageComponent,
    loadChildren: ()=> import("./modules/tareas/tareas.module").then(m=>m.TareasModule),
    canActivate:[authGuard]
  },
  {
     path: 'files',
     component: FilesPageComponent,
     loadChildren: ()=> import("./modules/files/files.module").then(m=>m.FilesModule),
     canActivate:[authGuard]
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
