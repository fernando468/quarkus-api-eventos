import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { administradorGuard, autenticadoGuard } from './auth.guard';
import { Cliente } from './pages/cliente/cliente';
import { Evento } from './pages/evento/evento';
import { Ingresso } from './pages/ingresso/ingresso';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { AutenticacaoService } from './services/autenticacao-service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      const autenticacaoService = inject(AutenticacaoService);
      if (!autenticacaoService.authenticated()) {
        return '/login';
      }
      return autenticacaoService.admin() ? '/cliente' : '/evento';
    },
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'registrar',
    component: Registro,
  },
  {
    path: 'cliente',
    component: Cliente,
    canActivate: [autenticadoGuard, administradorGuard],
  },
  {
    path: 'evento',
    component: Evento,
    canActivate: [autenticadoGuard],
  },
  {
    path: 'ingresso',
    component: Ingresso,
    canActivate: [autenticadoGuard],
  },
  { path: '**', redirectTo: '' },
];
