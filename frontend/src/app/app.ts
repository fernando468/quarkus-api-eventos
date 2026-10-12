import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomSidebar } from './components/custom-sidebar/custom-sidebar';

@Component({
  imports: [RouterOutlet, CustomSidebar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
