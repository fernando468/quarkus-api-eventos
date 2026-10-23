import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomInput } from '../../components/custom-input/custom-input';
import { EnderecoForm } from '../../partials/endereco-form/endereco-form';
import { AutenticacaoService } from '../../services/autenticacao-service';
import {
  CPF_MAX_LENGTH,
  CPF_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  NOME_MAX_LENGTH,
  NOME_MIN_LENGTH,
  TELEFONE_MAX_LENGTH,
  TELEFONE_MIN_LENGTH,
} from '../../types/cliente.type';
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
import { ErroResponse } from '../../types/erro.type';
import { cpfMask } from '../../utils/cpf.util';
import { cepMask } from '../../utils/endereco.util';
import { phoneMask } from '../../utils/telefone.util';

@Component({
  imports: [RouterLink, CustomButton, CustomInput, EnderecoForm],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  private readonly formBuilder = inject(FormBuilder);
  private readonly autenticacaoService = inject(AutenticacaoService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  cpfMask = cpfMask;
  phoneMask = phoneMask;
  cepMask = cepMask;

  readonly form = this.formBuilder.nonNullable.group({
    nome: ['', this.limite(NOME_MIN_LENGTH, NOME_MAX_LENGTH)],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(EMAIL_MIN_LENGTH),
        Validators.maxLength(EMAIL_MAX_LENGTH),
      ],
    ],
    telefone: ['', this.limite(TELEFONE_MIN_LENGTH, TELEFONE_MAX_LENGTH)],
    cpf: ['', this.limite(CPF_MIN_LENGTH, CPF_MAX_LENGTH)],
    endereco: this.formBuilder.nonNullable.group({
      logradouro: ['', this.limite(LOGRADOURO_MIN_LENGTH, LOGRADOURO_MAX_LENGTH)],
      numero: ['', this.limite(NUMERO_MIN_LENGTH, NUMERO_MAX_LENGTH)],
      complemento: ['', this.limite(COMPLEMENTO_MIN_LENGTH, COMPLEMENTO_MAX_LENGTH)],
      bairro: ['', this.limite(BAIRRO_MIN_LENGTH, BAIRRO_MAX_LENGTH)],
      cidade: ['', this.limite(CIDADE_MIN_LENGTH, CIDADE_MAX_LENGTH)],
      estado: ['', this.limite(ESTADO_MIN_LENGTH, ESTADO_MAX_LENGTH)],
      cep: ['', this.limite(CEP_MIN_LENGTH, CEP_MAX_LENGTH)],
    }),
    senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
  });
  isSubmitting = false;

  get enderecoForm() {
    return this.form.controls.endereco;
  }

  cadastrar = (): void => {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.autenticacaoService.registrar(this.form.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.snackBar.open('Conta criada com sucesso. Faça login para continuar.', 'Fechar', {
          duration: 4000,
          panelClass: ['api-snackbar--success'],
        });
        void this.router.navigateByUrl('/login');
      },
      error: (erro: ErroResponse) => {
        this.isSubmitting = false;
        this.snackBar.open(erro.error?.mensagem, 'Fechar', {
          duration: 4000,
          panelClass: ['api-snackbar--error'],
        });
      },
    });
  };

  private limite(minLength: number, maxLength: number) {
    return [Validators.required, Validators.minLength(minLength), Validators.maxLength(maxLength)];
  }
}
