import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { CustomButton } from '../../../components/custom-button/custom-button';
import { CustomInput } from '../../../components/custom-input/custom-input';
import { ClienteService } from '../../../services/cliente-service';
import {
  CPF_MAX_LENGTH,
  CPF_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  NOME_MAX_LENGTH,
  NOME_MIN_LENGTH,
  TELEFONE_MAX_LENGTH,
  TELEFONE_MIN_LENGTH,
} from '../../../types/cliente.type';
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
} from '../../../types/endereco.type';
import { EnderecoForm } from '../../endereco-form/endereco-form';

@Component({
  imports: [MatDialogActions, MatDialogContent, CustomButton, CustomInput, EnderecoForm],
  selector: 'app-cliente-modal',
  styleUrl: './cliente-modal.css',
  templateUrl: './cliente-modal.html',
})
export class ClienteModal {
  readonly dialogRef = inject(MatDialogRef<ClienteModal>);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly form: FormGroup;

  readonly clienteService = inject(ClienteService);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: ['José', this.requiredLength(NOME_MIN_LENGTH, NOME_MAX_LENGTH)],
      email: [
        'email@email.com',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(EMAIL_MIN_LENGTH),
          Validators.maxLength(EMAIL_MAX_LENGTH),
        ],
      ],
      telefone: ['44900001111', this.requiredLength(TELEFONE_MIN_LENGTH, TELEFONE_MAX_LENGTH)],
      cpf: ['48925618001', this.requiredLength(CPF_MIN_LENGTH, CPF_MAX_LENGTH)],
      endereco: this.formBuilder.group({
        logradouro: [
          'Avenida Brasil',
          this.requiredLength(LOGRADOURO_MIN_LENGTH, LOGRADOURO_MAX_LENGTH),
        ],
        numero: ['111 B', this.requiredLength(NUMERO_MIN_LENGTH, NUMERO_MAX_LENGTH)],
        complemento: [
          'Casa Cinza',
          this.requiredLength(COMPLEMENTO_MIN_LENGTH, COMPLEMENTO_MAX_LENGTH),
        ],
        bairro: ['Centro', this.requiredLength(BAIRRO_MIN_LENGTH, BAIRRO_MAX_LENGTH)],
        cidade: ['Maringá', this.requiredLength(CIDADE_MIN_LENGTH, CIDADE_MAX_LENGTH)],
        estado: ['PR', this.requiredLength(ESTADO_MIN_LENGTH, ESTADO_MAX_LENGTH)],
        cep: ['11111000', this.requiredLength(CEP_MIN_LENGTH, CEP_MAX_LENGTH)],
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
    console.log(this.form.getRawValue());
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.clienteService.criar(this.form.getRawValue()).subscribe();
    this.dialogRef.close(this.form.getRawValue());
  };

  private requiredLength(minLength: number, maxLength: number): ValidatorFn[] {
    return [Validators.required, Validators.minLength(minLength), Validators.maxLength(maxLength)];
  }
}
