import { Component, signal } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { CustomSidebar } from './components/custom-sidebar/custom-sidebar';

@Component({
  imports: [RouterOutlet, CustomSidebar],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } }],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
