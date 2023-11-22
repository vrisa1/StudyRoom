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
    loadChildren: ()=> import("./modules/timer/timer.module").then(m => m.TimerModule)
  }, 
  {
    path: '',
    redirectTo: 'landing',
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
