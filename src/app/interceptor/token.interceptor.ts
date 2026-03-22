import { inject } from '@angular/core';
import {
  HttpBackend,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

const PUBLIC_URLS = ['/authenticate', '/user/register'];

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip interceptor for public endpoints that don't require authentication
  if (PUBLIC_URLS.some((url) => req.url.includes(url))) {
    return next(req);
  }

  const httpBackend = inject(HttpBackend);
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  if (token) {
    const cloneReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return next(cloneReq);
  } else {
    const baseUrl = environment.baseUrl;
    const refreshReq = new HttpRequest(
      'POST',
      `${baseUrl}/user/refresh`,
      {},
      {
        withCredentials: true,
      },
    );

    return httpBackend.handle(refreshReq).pipe(
      switchMap((res: any) => {
        const authHeader = res.headers?.get('Authorization');
        if (authHeader) {
          authService.setAccessToken(authHeader.substring(7));
          const cloneReq = req.clone({
            setHeaders: { Authorization: `Bearer ${authHeader}` },
            withCredentials: true,
          });
          return next(cloneReq);
        }
        return next(req);
      }),
    );
  }
};
