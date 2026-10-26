import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { validarCPF } from '../utils/cpf.util';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    return validarCPF(String(value)) ? null : { cpfInvalid: true };
  };
}
