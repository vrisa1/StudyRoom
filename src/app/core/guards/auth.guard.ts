import { CanActivateFn, Router } from '@angular/router';
import { AuthGoogleService } from '../services/auth-google.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthGoogleService);
  const router = inject(Router);
  const isLoged = authService.checkAuthentication();
  console.log(isLoged);
  if(!isLoged) router.navigate(["/landing"]);
  return true;
};
