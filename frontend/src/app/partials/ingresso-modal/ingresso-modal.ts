import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ClienteService } from '../../services/cliente-service';
import { EventoService } from '../../services/evento-service';
import { IngressoService } from '../../services/ingresso-service';
import { IngressoResponse } from '../../types/ingresso.type';

@Component({
  imports: [MatDialogModule, CustomButton],
  selector: 'app-ingresso-modal',
  styleUrl: './ingresso-modal.css',
  templateUrl: './ingresso-modal.html',
})
export class IngressoModal {
  readonly dialogRef = inject(MatDialogRef<IngressoModal>);
  readonly data: IngressoResponse = inject(MAT_DIALOG_DATA);
  readonly form: FormGroup;

  readonly ingressoService = inject(IngressoService);
  readonly eventoService = inject(EventoService);
  readonly clienteService = inject(ClienteService);

  isSaving = false;
  errorMessage = '';

  constructor() {
    this.form = new FormGroup({});
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

    const ingressoId = this.data?.id;
    const method = ingressoId
      ? this.ingressoService.atualizar(ingressoId, this.form.getRawValue())
      : this.ingressoService.criar(this.form.getRawValue());

    method.subscribe({
      next: () => this.dialogRef.close(true),
      error: () => {
        this.isSaving = false;
      },
    });
  };
}
