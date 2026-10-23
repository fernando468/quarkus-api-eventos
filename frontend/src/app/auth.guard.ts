import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacaoService } from './services/autenticacao-service';

export const autenticadoGuard: CanActivateFn = () => {
  const autenticacaoService = inject(AutenticacaoService);
  return autenticacaoService.authenticated() || inject(Router).createUrlTree(['/login']);
};

export const administradorGuard: CanActivateFn = () => {
  const autenticacaoService = inject(AutenticacaoService);
  return autenticacaoService.admin() || inject(Router).createUrlTree(['/evento']);
};
