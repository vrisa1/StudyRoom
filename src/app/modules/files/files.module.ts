import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesPageComponent } from './files-page/files-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FilesPageComponent
  ],
  imports: [
    CommonModule,
    FilesRoutingModule,
    FormsModule 
  ]
})
export class FilesModule { }
