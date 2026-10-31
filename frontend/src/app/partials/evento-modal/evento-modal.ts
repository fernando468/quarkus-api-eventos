import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomInput } from '../../components/custom-input/custom-input';
import { EventoService } from '../../services/evento-service';
import { NotificationService } from '../../services/notification-service';

import { ENDERECO_VALIDATION_CONSTANTS } from '../../types/endereco.type';
import { ErroResponse } from '../../types/erro.type';
import { EVENTO_VALIDATION_CONSTANTS, EventoResponse } from '../../types/evento.type';
import { formatLocalDateTime } from '../../utils/date.util';
import { requiredLength } from '../../utils/required-length.utils';
import { EnderecoForm } from '../endereco-form/endereco-form';
import { finalize } from 'rxjs';

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
  readonly notification = inject(NotificationService);
  readonly ENDERECO_VALIDATION_CONSTANTS = ENDERECO_VALIDATION_CONSTANTS;
  readonly EVENTO_VALIDATION_CONSTANTS = EVENTO_VALIDATION_CONSTANTS;

  isSaving = false;

  constructor(private formBuilder: FormBuilder) {
    const { titulo, descricao, data, endereco } = this.data || {};

    const dataFormatada = formatLocalDateTime(data);

    const {
      LOGRADOURO_MAX_LENGTH,
      LOGRADOURO_MIN_LENGTH,
      NUMERO_MAX_LENGTH,
      NUMERO_MIN_LENGTH,
      COMPLEMENTO_MAX_LENGTH,
      COMPLEMENTO_MIN_LENGTH,
      BAIRRO_MAX_LENGTH,
      BAIRRO_MIN_LENGTH,
      CIDADE_MAX_LENGTH,
      CIDADE_MIN_LENGTH,
      ESTADO_MAX_LENGTH,
      ESTADO_MIN_LENGTH,
      CEP_MAX_LENGTH,
      CEP_MIN_LENGTH,
    } = this.ENDERECO_VALIDATION_CONSTANTS;

    const { TITULO_MAX_LENGTH, TITULO_MIN_LENGTH, DESCRICAO_MAX_LENGTH, DESCRICAO_MIN_LENGTH } =
      this.EVENTO_VALIDATION_CONSTANTS;

    this.form = this.formBuilder.group({
      titulo: [titulo || 'Título', requiredLength(TITULO_MIN_LENGTH, TITULO_MAX_LENGTH)],
      descricao: [
        descricao || 'Descrição',
        requiredLength(DESCRICAO_MIN_LENGTH, DESCRICAO_MAX_LENGTH),
      ],
      data: [dataFormatada || new Date(), Validators.required],
      endereco: this.formBuilder.group({
        logradouro: [
          endereco?.logradouro || 'Avenida Brasil',
          requiredLength(LOGRADOURO_MIN_LENGTH, LOGRADOURO_MAX_LENGTH),
        ],
        numero: [endereco?.numero || '111 B', requiredLength(NUMERO_MIN_LENGTH, NUMERO_MAX_LENGTH)],
        complemento: [
          endereco?.complemento || 'Casa Cinza',
          requiredLength(COMPLEMENTO_MIN_LENGTH, COMPLEMENTO_MAX_LENGTH),
        ],
        bairro: [
          endereco?.bairro || 'Centro',
          requiredLength(BAIRRO_MIN_LENGTH, BAIRRO_MAX_LENGTH),
        ],
        cidade: [
          endereco?.cidade || 'Maringá',
          requiredLength(CIDADE_MIN_LENGTH, CIDADE_MAX_LENGTH),
        ],
        estado: [endereco?.estado || 'PR', requiredLength(ESTADO_MIN_LENGTH, ESTADO_MAX_LENGTH)],
        cep: [endereco?.cep || '11111000', requiredLength(CEP_MIN_LENGTH, CEP_MAX_LENGTH)],
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

    const eventoId = this.data?.id;
    const method = eventoId
      ? this.eventoService.atualizar(eventoId, this.form.getRawValue())
      : this.eventoService.criar(this.form.getRawValue());

    method
      .pipe(
        finalize(() => (this.isSaving = false))
      )
      .subscribe({
        next: () => {
          this.notification.success(eventoId ? 'Evento atualizado com sucesso.' : 'Evento cadastrado com sucesso.');
          this.dialogRef.close(true);
        },
        error: (erro: ErroResponse) => {
          this.isSaving = false;
          this.notification.error(erro.error?.mensagem);
        },
    });
  };
}
