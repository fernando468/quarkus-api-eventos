import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomInput } from '../../components/custom-input/custom-input';
import { EventoService } from '../../services/evento-service';
import {
  BAIRRO_MAX_LENGTH,
  BAIRRO_MIN_LENGTH,
  CEP_MAX_LENGTH,
  CEP_MIN_LENGTH,
  CIDADE_MAX_LENGTH,
  CIDADE_MIN_LENGTH,
  COMPLEMENTO_MAX_LENGTH,
  COMPLEMENTO_MIN_LENGTH,
  ESTADO_MAX_LENGTH,
  ESTADO_MIN_LENGTH,
  LOGRADOURO_MAX_LENGTH,
  LOGRADOURO_MIN_LENGTH,
  NUMERO_MAX_LENGTH,
  NUMERO_MIN_LENGTH,
} from '../../types/endereco.type';
import {
  DESCRICAO_MAX_LENGTH,
  DESCRICAO_MIN_LENGTH,
  EventoResponse,
  TITULO_MAX_LENGTH,
  TITULO_MIN_LENGTH,
} from '../../types/evento.type';
import { formatLocalDateTime } from '../../utils/date.util';
import { EnderecoForm } from '../endereco-form/endereco-form';

@Component({
  imports: [MatDialogActions, MatDialogContent, CustomButton, CustomInput, EnderecoForm],
  selector: 'app-evento-modal',
  styleUrl: './evento-modal.css',
  templateUrl: './evento-modal.html',
})
export class EventoModal {
  readonly dialogRef = inject(MatDialogRef<EventoModal>);
  readonly data: EventoResponse = inject(MAT_DIALOG_DATA);
  readonly form: FormGroup;

  readonly eventoService = inject(EventoService);

  isSaving = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder) {
    const { titulo, descricao, data, endereco } = this.data || {};

    const dataFormatada = formatLocalDateTime(data);

    this.form = this.formBuilder.group({
      titulo: [titulo || 'Título', this.requiredLength(TITULO_MIN_LENGTH, TITULO_MAX_LENGTH)],
      descricao: [
        descricao || 'Descrição',
        this.requiredLength(DESCRICAO_MIN_LENGTH, DESCRICAO_MAX_LENGTH),
      ],
      data: [dataFormatada || '2022-01-01', Validators.required],
      endereco: this.formBuilder.group({
        logradouro: [
          endereco?.logradouro || 'Avenida Brasil',
          this.requiredLength(LOGRADOURO_MIN_LENGTH, LOGRADOURO_MAX_LENGTH),
        ],
        numero: [
          endereco?.numero || '111 B',
          this.requiredLength(NUMERO_MIN_LENGTH, NUMERO_MAX_LENGTH),
        ],
        complemento: [
          endereco?.complemento || 'Casa Cinza',
          this.requiredLength(COMPLEMENTO_MIN_LENGTH, COMPLEMENTO_MAX_LENGTH),
        ],
        bairro: [
          endereco?.bairro || 'Centro',
          this.requiredLength(BAIRRO_MIN_LENGTH, BAIRRO_MAX_LENGTH),
        ],
        cidade: [
          endereco?.cidade || 'Maringá',
          this.requiredLength(CIDADE_MIN_LENGTH, CIDADE_MAX_LENGTH),
        ],
        estado: [
          endereco?.estado || 'PR',
          this.requiredLength(ESTADO_MIN_LENGTH, ESTADO_MAX_LENGTH),
        ],
        cep: [endereco?.cep || '11111000', this.requiredLength(CEP_MIN_LENGTH, CEP_MAX_LENGTH)],
      }),
    });
  }

  get enderecoForm(): FormGroup {
    return this.form.get('endereco') as FormGroup;
  }

  onCancel = (): void => {
    this.dialogRef.close();
  };

  onConfirm = (): void => {
    if (this.form.invalid || this.isSaving) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    const eventoId = this.data?.id;
    const method = eventoId
      ? this.eventoService.atualizar(eventoId, this.form.getRawValue())
      : this.eventoService.criar(this.form.getRawValue());

    method.subscribe({
      next: () => this.dialogRef.close(true),
      error: () => {
        this.isSaving = false;
      },
    });
  };

  private requiredLength(minLength: number, maxLength: number): ValidatorFn[] {
    return [Validators.required, Validators.minLength(minLength), Validators.maxLength(maxLength)];
  }
}
