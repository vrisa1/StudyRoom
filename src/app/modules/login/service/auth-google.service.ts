import { Injectable } from '@angular/core';
import {AuthConfig, OAuthService } from 'angular-oauth2-oidc'
import { usuario } from 'src/app/core/models';


@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService{

  constructor(private oauthService : OAuthService) {
    this.initlogin();
   }


  initlogin(){
    const config : AuthConfig = {
      issuer : 'https://accounts.google.com',
      strictDiscoveryDocumentValidation : false,
      clientId : '411879157561-3tha9273s0e8kpp1eij1198ul9amb1um.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/main',
      scope : 'openid profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
    }

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    this.oauthService.initLoginFlow();
  }

  logout(){
    this.oauthService.logOut();
  }

  getProfile(){
    return this.oauthService.getIdentityClaims();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }
}
 