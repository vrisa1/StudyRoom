import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.module';
import { MainModule } from './modules/main/main.module';
import { LoginCompComponent } from './modules/login/login-comp/login-comp.component';
import { MainCompComponent } from './modules/main/main-comp/main-comp.component';

const routes: Routes = [
  {path: '', component: LoginCompComponent}, 
  {path: 'login', component: LoginCompComponent}, 
  {path: 'main', component: MainCompComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
