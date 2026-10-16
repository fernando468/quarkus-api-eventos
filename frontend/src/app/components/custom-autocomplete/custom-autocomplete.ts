import { AsyncPipe } from '@angular/common';
import { Component, inject, Injector, input, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { combineLatest, map, Observable, startWith } from 'rxjs';

@Component({
  imports: [
    AsyncPipe,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  selector: 'app-custom-autocomplete',
  styleUrl: './custom-autocomplete.css',
  templateUrl: './custom-autocomplete.html',
})
export class CustomAutocomplete<T> implements OnInit {
  private readonly injector = inject(Injector);

  readonly form = input.required<FormGroup>();
  readonly name = input.required<string>();
  readonly label = input.required<string>();
  readonly placeholder = input.required<string>();
  readonly options = input.required<(readonly T[] & { ativo: boolean }[]) | T[]>();
  readonly displayWith = input.required<(value: T) => string>();
  readonly filterFn = input.required<(option: T, searchTerm: string) => boolean>();
  readonly loading = input(false);
  readonly loadingText = input('Carregando...');
  readonly emptyText = input('Nenhuma opção encontrada');
  readonly openOnFocus = input(true);

  filteredOptions!: Observable<(T[] & { ativo?: boolean }[]) | T[]>;

  ngOnInit(): void {
    const control = this.control();
    this.filteredOptions = combineLatest([
      control.valueChanges.pipe(startWith(control.value)),
      toObservable(this.options, { injector: this.injector }),
    ]).pipe(map(([value, options]) => this.filterOptions(value, options)));
  }

  control(name?: string | null): FormControl {
    return this.form().get(name || this.name()) as FormControl;
  }

  onBlur(): void {
    this.control().markAsTouched();
  }

  message(): string {
    const control = this.control();
    if (control.hasError('required')) {
      return `${this.label()} é obrigatório(a)`;
    }
    if (control.hasError('selectionRequired')) {
      return `Escolha ${this.label().toLowerCase()} da lista`;
    }
    return '';
  }

  hasSearchTerm(): boolean {
    const value = this.control().value;
    return typeof value === 'string' && value.trim().length > 0;
  }

  private filterOptions(value: unknown, options: readonly T[]): T[] {
    if (value !== null && typeof value === 'object') {
      return [];
    }

    const searchTerm = typeof value === 'string' ? value.trim() : '';
    if (!this.openOnFocus() && !searchTerm) {
      return [];
    }

    return options.filter((option) => this.filterFn()(option, searchTerm));
  }

  isDisabled(option: T): boolean {
    if (option === null || option === undefined) {
      return false;
    }

    if (typeof option === 'object' && 'ativo' in option) {
      return !option.ativo as boolean;
    }

    return false;
  }
}
