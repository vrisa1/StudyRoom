import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { SharedModule } from "../../shared/shared.module";
import { UtilitiesComponent } from './utilities/utilities.component';


@NgModule({
    declarations: [
        MainPageComponent,
        UtilitiesComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        MainRoutingModule,
        SharedModule
    ]
})
export class MainModule { }
