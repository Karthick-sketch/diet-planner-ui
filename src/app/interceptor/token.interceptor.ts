import { inject } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpInterceptorFn,
} from '@angular/common/http';
import { switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

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
    const rawHttp = new HttpClient(httpBackend);
    return rawHttp
      .post(
        `${environment.baseUrl}/user/refresh`,
        {},
        { withCredentials: true, observe: 'response' },
      )
      .pipe(
        switchMap((res: any) => {
          const accessToken = res.body?.accessToken;
          if (accessToken) {
            authService.setAccessToken(accessToken);
            authService.setLoggedIn(true);
            const cloneReq = req.clone({
              setHeaders: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            });
            return next(cloneReq);
          }
          return next(req);
        }),
      );
  }
};
