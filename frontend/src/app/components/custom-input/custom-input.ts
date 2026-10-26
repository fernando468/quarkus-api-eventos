import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

type TypeField = 'text' | 'password' | 'numeric' | 'email' | 'datetime-local';
type MaskFunction = ((value: string) => string) | null;

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  selector: 'app-custom-input',
  styleUrl: './custom-input.css',
  templateUrl: './custom-input.html',
})
export class CustomInput {
  readonly form = input.required<FormGroup>();
  readonly name = input.required<string>();
  readonly label = input.required<string>();
  readonly type = input<TypeField>('text');
  readonly required = input<boolean>(false);
  readonly minLength = input<number>(0);
  readonly maxLength = input<number>(255);
  readonly mask = input<MaskFunction>(null);

  displayValue(): string {
    const value = String(this.control().value ?? '');
    const maskFn = this.mask();
    return maskFn ? maskFn(value) : value;
  }

  maxInputLength(): number {
    const maskFn = this.mask();
    return maskFn ? maskFn('9'.repeat(this.maxLength())).length : this.maxLength();
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const maskFn = this.mask();
    const rawValue = maskFn ? inputElement.value.replace(/\D/g, '') : inputElement.value;
    this.control().setValue(rawValue);
    this.control().markAsDirty();
    inputElement.value = maskFn ? maskFn(rawValue) : rawValue;
  }

  onBlur(): void {
    this.control().markAsTouched();
  }

  control(name?: NullOrUndefined<string>): FormControl {
    return this.form().get(name || this.name()) as FormControl;
  }

  message(): string {
    const formField = this.control(this.name());

    if (formField?.hasError('required')) {
      return `${this.label()} é obrigatório(a)`;
    }
    if (formField?.hasError('email')) {
      return 'Informe um e-mail válido';
    }
    if (formField?.hasError('minlength')) {
      return `${this.label()} não atingiu o mínimo de caracteres`;
    }
    if (formField?.hasError('maxlength')) {
      return `${this.label()} passou do máximo de caracteres`;
    }
    if (formField?.hasError('cpfInvalid')) {
      return 'CPF inválido';
    }
    return '';
  }
}
