import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return auth.isAuthenticated$.pipe(
    map((isAuth) => {
      if (isAuth) {
        return router.createUrlTree(['/dashboard']);
      }
      return true;
    }),
  );
};
