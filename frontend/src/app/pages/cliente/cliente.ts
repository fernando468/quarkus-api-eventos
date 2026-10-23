import { Component } from '@angular/core';
import { ClienteListagem } from '../../partials/cliente-listagem/cliente-listagem';
import { HeaderPages } from '../../partials/header-pages/header-pages';

@Component({
  imports: [HeaderPages, ClienteListagem],
  selector: 'app-cliente',
  styleUrl: './cliente.css',
  templateUrl: './cliente.html',
})
export class Cliente {}
