import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatButton],
  selector: 'app-custom-button',
  styleUrl: './custom-button.css',
  templateUrl: './custom-button.html',
})
export class CustomButton {
  title = input.required<string>();
}
