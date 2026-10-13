import { Component } from '@angular/core';
import { HeaderPages } from '../../partials/header-pages/header-pages';

@Component({
  imports: [HeaderPages],
  selector: 'app-evento',
  styleUrl: './evento.css',
  templateUrl: './evento.html',
})
export class Evento {
  openDialog() {
    console.log('Abrindo dialog');
  }
}
