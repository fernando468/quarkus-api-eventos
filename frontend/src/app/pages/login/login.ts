import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomInput } from '../../components/custom-input/custom-input';
import { AutenticacaoService } from '../../services/autenticacao-service';
import { NotificationService } from '../../services/notification-service';
import { ErroResponse } from '../../types/erro.type';

@Component({
  imports: [ReactiveFormsModule, RouterLink, CustomButton, CustomInput],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly autenticacaoService = inject(AutenticacaoService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  readonly form = this.formBuilder.nonNullable.group({
    email: ['admin@admin.com', [Validators.required, Validators.email, Validators.maxLength(100)]],
    senha: ['12345678', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
  });
  isSubmitting = false;

  entrar = (): void => {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.autenticacaoService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting = false;
        void this.router.navigateByUrl(this.autenticacaoService.admin() ? '/cliente' : '/evento');
      },
      error: (erro: ErroResponse) => {
        this.isSubmitting = false;
        this.notification.error(erro.error?.mensagem);
      },
    });
  };
}
