import { Routes } from '@angular/router';
import { Cliente } from './pages/cliente/cliente';
import { Evento } from './pages/evento/evento';
import { Ingresso } from './pages/ingresso/ingresso';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cliente',
    pathMatch: 'full',
  },
  {
    path: 'cliente',
    component: Cliente,
  },
  {
    path: 'evento',
    component: Evento,
  },
  {
    path: 'ingresso',
    component: Ingresso,
  },
];
