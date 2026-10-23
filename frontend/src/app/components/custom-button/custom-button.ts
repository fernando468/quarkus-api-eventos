import { Component, input } from '@angular/core';
import { MatButton, MatButtonAppearance } from '@angular/material/button';

@Component({
  imports: [MatButton],
  selector: 'app-custom-button',
  styleUrl: './custom-button.css',
  templateUrl: './custom-button.html',
})
export class CustomButton {
  readonly title = input.required<string>();
  readonly onClick = input.required<() => void>();
  readonly variant = input<MatButtonAppearance>('filled');
  readonly style = input<string>('');
  readonly disabled = input<boolean>(false);
}
