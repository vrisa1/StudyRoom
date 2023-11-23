import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc'
import { Observable, Subject, from, switchMap } from 'rxjs';
import { usuario } from 'src/app/core/models';


@Injectable({
  providedIn: 'root'
})

export class AuthGoogleService {

  constructor(private oauthService: OAuthService) {
    this.initlogin();
  }

  userProfileSubject = new Subject<usuario | null>();

  initlogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '411879157561-3tha9273s0e8kpp1eij1198ul9amb1um.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/main',
      scope: 'openid profile email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/calendar',
    }

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.oauthService.events.subscribe((event) => {
      if (event.type === 'token_received') {
        this.loadUserProfile();
      }
    })
  }


  login() {
    this.oauthService.initLoginFlow();
  }

  loadUserProfile() {
    this.oauthService.loadUserProfile().then((userProfile: any) => {
      if (userProfile) {
        const user: usuario = new usuario(
          userProfile.info.name,
          userProfile.info.picture,
          userProfile.info.email,
          this.oauthService.getAccessToken()
        );
        this.userProfileSubject.next(user);
      } else {
        this.userProfileSubject.next(null);
      }
    }).catch((error) => {
      console.error('Error loading user profile:', error);
      this.userProfileSubject.next(null);
    });
  }

  logout() {
    this.oauthService.logOut();
    this.userProfileSubject.next(null);
  }

  getToken(): string {
    return this.oauthService.getAccessToken();
  }

}
