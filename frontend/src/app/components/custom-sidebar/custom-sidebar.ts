import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  options: MenuOption[] = [
    { path: 'cliente', name: 'Cliente' },
    { path: 'evento', name: 'Evento' },
    { path: 'ingresso', name: 'Ingresso' },
  ];
}
