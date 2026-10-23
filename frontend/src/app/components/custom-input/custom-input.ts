import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

type TypeField = 'text' | 'password' | 'numeric' | 'email' | 'datetime-local';
type MaskType = 'cpf' | 'cep' | 'phone' | 'none';
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

  value = '';

  onChange: (value: string) => void = (value) => value;

  onTouched: () => void = () => {
    return;
  };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  applyMask(value: string): string {
    const maskFn = this.mask();
    console.log(maskFn);
    return maskFn ? maskFn(value) : value;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const rawValue = inputElement.value;

    const formattedValue = this.applyMask(rawValue);

    this.value = formattedValue;
    inputElement.value = formattedValue;

    this.onChange(formattedValue);
  }

  onBlur(): void {
    this.onTouched();
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

    return '';
  }
}
