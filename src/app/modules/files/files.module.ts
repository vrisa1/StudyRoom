import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesPageComponent } from './files-page/files-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    declarations: [
        FilesPageComponent
    ],
    imports: [
        CommonModule,
        FilesRoutingModule,
        FormsModule,
        SharedModule
    ]
})
export class FilesModule { }
