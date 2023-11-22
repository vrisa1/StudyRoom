import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LandingModule } from './modules/landing/landing.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { MainModule } from './modules/main/main.module';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LandingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    LoginModule,
    MainModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
