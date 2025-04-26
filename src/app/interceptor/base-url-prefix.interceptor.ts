import { HttpInterceptorFn } from '@angular/common/http';

export const BaseUrlPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://localhost:8080';
  if (!req.url.startsWith('http')) {
    const cloneReq = req.clone({ url: `${baseUrl}${req.url}` });
    return next(cloneReq);
  }
  return next(req);
};
