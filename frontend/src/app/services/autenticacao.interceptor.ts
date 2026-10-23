import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AutenticacaoService } from './autenticacao-service';

export const autenticacaoInterceptor: HttpInterceptorFn = (request, next) => {
  const accessToken = inject(AutenticacaoService).accessToken;
  const apiOrigin = new URL(environment.apiUrl).origin;
  const requestOrigin = new URL(request.url, environment.apiUrl).origin;
  if (!accessToken || requestOrigin !== apiOrigin) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    }),
  );
};
