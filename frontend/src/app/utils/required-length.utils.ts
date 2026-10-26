import { ValidatorFn, Validators } from '@angular/forms';

export function requiredLength(minLength: number, maxLength: number): ValidatorFn[] {
  return [Validators.required, Validators.minLength(minLength), Validators.maxLength(maxLength)];
}
