import { Component, input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CustomButton } from '../../components/custom-button/custom-button';

@Component({
  imports: [CustomButton],
  selector: 'app-header-pages',
  styleUrl: './header-pages.css',
  templateUrl: './header-pages.html',
})
export class HeaderPages {
  readonly title = input.required<string>();
  readonly onClick = input<() => void>();
  readonly isProduction = environment.production;

  constructor() {
    console.log(this.onClick());
  }
}
