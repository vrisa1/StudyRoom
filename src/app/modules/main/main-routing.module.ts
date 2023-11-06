import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCompComponent } from './main-comp/main-comp.component';

const routes: Routes = [
  {path: '', component : MainCompComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
