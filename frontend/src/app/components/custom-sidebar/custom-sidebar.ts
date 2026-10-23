import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao-service';

interface MenuOption {
  name: string;
  path: string;
}

@Component({
  imports: [MatSidenavModule, RouterLink, RouterLinkActive],
  selector: 'app-custom-sidebar',
  styleUrl: './custom-sidebar.css',
  templateUrl: './custom-sidebar.html',
})
export class CustomSidebar {
  readonly autenticacaoService = inject(AutenticacaoService);
  readonly options: MenuOption[] = [
    { path: 'evento', name: 'Evento' },
    { path: 'ingresso', name: 'Ingresso' },
  ];

  get menuOptions(): MenuOption[] {
    return this.autenticacaoService.admin()
      ? [{ path: 'cliente', name: 'Cliente' }, ...this.options]
      : this.options;
  }
}
