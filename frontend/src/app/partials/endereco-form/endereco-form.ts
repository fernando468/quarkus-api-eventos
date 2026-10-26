import { HttpClient } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomInput } from '../../components/custom-input/custom-input';
import { ENDERECO_VALIDATION_CONSTANTS } from '../../types/endereco.type';
import { cepMask } from '../../utils/endereco.util';

interface ViaCepResponse {
  bairro: string;
  localidade: string;
  logradouro: string;
  uf: string;
  erro?: boolean;
}

@Component({
  imports: [CustomInput, MatIconModule],
  selector: 'app-endereco-form',
  styleUrl: './endereco-form.css',
  templateUrl: './endereco-form.html',
})
export class EnderecoForm {
  private readonly http = inject(HttpClient);
  private readonly snackBar = inject(MatSnackBar);

  readonly form = input.required<FormGroup>();
  readonly isLookingUp = signal(false);

  readonly cepMask = cepMask;
  readonly ENDERECO_VALIDATION_CONSTANTS = ENDERECO_VALIDATION_CONSTANTS;

  searchCep(): void {
    const cep = String(this.form().get('cep')?.value ?? '').replace(/\D/g, '');
    if (
      cep.length !== this.ENDERECO_VALIDATION_CONSTANTS.CEP_MIN_LENGTH ||
      cep.length !== this.ENDERECO_VALIDATION_CONSTANTS.CEP_MAX_LENGTH
    ) {
      return;
    }

    this.isLookingUp.set(true);
    this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (endereco) => {
        this.isLookingUp.set(false);
        if (endereco.erro) {
          this.snackBar.open('CEP não encontrado.', 'Fechar', {
            duration: 4000,
            panelClass: ['api-snackbar--error'],
          });
          return;
        }

        this.form().patchValue({
          logradouro: endereco.logradouro,
          bairro: endereco.bairro,
          cidade: endereco.localidade,
          estado: endereco.uf,
          complemento: '',
          numero: '',
        });
        this.snackBar.open('Endereço carregado com sucesso.', 'Fechar', {
          duration: 4000,
          panelClass: ['api-snackbar--success'],
        });
      },
      error: () => {
        this.isLookingUp.set(false);
        this.snackBar.open('Não foi possível buscar o CEP. Tente novamente.', 'Fechar', {
          duration: 4000,
          panelClass: ['api-snackbar--error'],
        });
      },
    });
  }
}
