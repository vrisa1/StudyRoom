import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Error404Component } from './error404/error404.component';
import { LoginModule } from "../modules/login/login.module";
import { UserAccComponent } from './user-acc/user-acc.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
    declarations: [
        NavBarComponent,
        Error404Component,
        UserAccComponent,
        FooterComponent
    ],
    exports: [
        NavBarComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        LoginModule
    ]
})
export class SharedModule { }
