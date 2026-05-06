import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs';

export const authHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return auth.getAccessTokenSilently().pipe(
    switchMap((token) => {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next(authReq);
    }),
  );
};
