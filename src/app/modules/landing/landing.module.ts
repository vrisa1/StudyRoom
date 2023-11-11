import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { AccordionComponent } from './accordion/accordion.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from "../../shared/shared.module";
import { LoginModule } from "../login/login.module";


@NgModule({
    declarations: [
        AccordionComponent,
        LandingPageComponent
    ],
    exports: [
        AccordionComponent
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        SharedModule,
        LoginModule
    ]
})
export class LandingModule { }
