import { Component } from '@angular/core';
import { HeaderPages } from '../../partials/header-pages/header-pages';

@Component({
  imports: [HeaderPages],
  selector: 'app-ingresso',
  styleUrl: './ingresso.css',
  templateUrl: './ingresso.html',
})
export class Ingresso {
  openDialog() {
    console.log('Abrindo dialog');
  }
}
