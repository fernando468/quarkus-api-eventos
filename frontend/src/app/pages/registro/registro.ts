import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomInput } from '../../components/custom-input/custom-input';
import { EnderecoForm } from '../../partials/endereco-form/endereco-form';
import { AutenticacaoService } from '../../services/autenticacao-service';
import { NotificationService } from '../../services/notification-service';
import { CLIENTE_VALIDATION_CONSTANTS } from '../../types/cliente.type';
import { ENDERECO_VALIDATION_CONSTANTS } from '../../types/endereco.type';
import { ErroResponse } from '../../types/erro.type';
import { cpfMask } from '../../utils/cpf.util';
import { cepMask } from '../../utils/endereco.util';
import { requiredLength } from '../../utils/required-length.utils';
import { phoneMask } from '../../utils/telefone.util';
import { cpfValidator } from '../../validators/cpf.validator';

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
  private readonly notification = inject(NotificationService);

  readonly cpfMask = cpfMask;
  readonly phoneMask = phoneMask;
  readonly cepMask = cepMask;
  readonly CLIENTE_VALIDATION_CONSTANTS = CLIENTE_VALIDATION_CONSTANTS;
  readonly ENDERECO_VALIDATION_CONSTANTS = ENDERECO_VALIDATION_CONSTANTS;
  readonly form: FormGroup;

  isSubmitting = false;

  constructor() {
    const {
      NOME_MAX_LENGTH,
      NOME_MIN_LENGTH,
      CPF_MAX_LENGTH,
      CPF_MIN_LENGTH,
      EMAIL_MAX_LENGTH,
      EMAIL_MIN_LENGTH,
      TELEFONE_MAX_LENGTH,
      TELEFONE_MIN_LENGTH,
      SENHA_MAX_LENGTH,
      SENHA_MIN_LENGTH,
    } = this.CLIENTE_VALIDATION_CONSTANTS;

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

    this.form = this.formBuilder.nonNullable.group({
      nome: ['', requiredLength(NOME_MIN_LENGTH, NOME_MAX_LENGTH)],
      email: ['', [...requiredLength(EMAIL_MIN_LENGTH, EMAIL_MAX_LENGTH), Validators.email]],
      telefone: ['', requiredLength(TELEFONE_MIN_LENGTH, TELEFONE_MAX_LENGTH)],
      cpf: ['', [...requiredLength(CPF_MIN_LENGTH, CPF_MAX_LENGTH), cpfValidator()]],
      endereco: this.formBuilder.nonNullable.group({
        logradouro: ['', requiredLength(LOGRADOURO_MIN_LENGTH, LOGRADOURO_MAX_LENGTH)],
        numero: ['', requiredLength(NUMERO_MIN_LENGTH, NUMERO_MAX_LENGTH)],
        complemento: ['', requiredLength(COMPLEMENTO_MIN_LENGTH, COMPLEMENTO_MAX_LENGTH)],
        bairro: ['', requiredLength(BAIRRO_MIN_LENGTH, BAIRRO_MAX_LENGTH)],
        cidade: ['', requiredLength(CIDADE_MIN_LENGTH, CIDADE_MAX_LENGTH)],
        estado: ['', requiredLength(ESTADO_MIN_LENGTH, ESTADO_MAX_LENGTH)],
        cep: ['', requiredLength(CEP_MIN_LENGTH, CEP_MAX_LENGTH)],
      }),
      senha: ['', requiredLength(SENHA_MIN_LENGTH, SENHA_MAX_LENGTH)],
    });
    this.isSubmitting = false;
  }

  get enderecoForm() {
    return this.form.controls['endereco'] as FormGroup;
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
        this.notification.success('Conta criada com sucesso. Faça login para continuar.');
        void this.router.navigateByUrl('/login');
      },
      error: (erro: ErroResponse) => {
        this.isSubmitting = false;
        this.notification.error(erro.error?.mensagem);
      },
    });
  };

  private limite(minLength: number, maxLength: number) {
    return [Validators.required, Validators.minLength(minLength), Validators.maxLength(maxLength)];
  }
}
