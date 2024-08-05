import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  console.log(inject(AuthService).isLogged());
  return inject(AuthService).isLogged() == false
    ? inject(Router).navigate(['/login'])
    : true;
};
