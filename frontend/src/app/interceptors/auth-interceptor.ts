import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const token = localStorage.getItem('access_token');

  const isPublicRoute =
    req.url.includes(`${environment.apiUrl}/auth/login/`) ||
    req.url.includes(`${environment.apiUrl}/auth/cadastro/`) ||
    req.url.includes(`${environment.apiUrl}/auth/refresh/`);

  if (!token || isPublicRoute) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};