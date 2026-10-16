import { HttpClient } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomInput } from '../../components/custom-input/custom-input';

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
  readonly form = input.required<FormGroup>();
  readonly lookupError = signal('');
  readonly isLookingUp = signal(false);

  private readonly http = inject(HttpClient);
  private readonly snackBar = inject(MatSnackBar);

  searchCep(): void {
    const cep = String(this.form().get('cep')?.value ?? '').replace(/\D/g, '');
    if (cep.length !== 8) {
      this.lookupError.set('Informe um CEP com 8 dígitos.');
      return;
    }

    this.lookupError.set('');
    this.isLookingUp.set(true);
    this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (address) => {
        this.isLookingUp.set(false);
        if (address.erro) {
          this.lookupError.set('CEP não encontrado.');
          this.snackBar.open('CEP não encontrado.', 'Fechar', {
            duration: 4000,
            panelClass: ['api-snackbar--error'],
          });
          return;
        }

        this.form().patchValue({
          logradouro: address.logradouro,
          bairro: address.bairro,
          cidade: address.localidade,
          estado: address.uf,
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
        this.lookupError.set('Não foi possível buscar o CEP. Tente novamente.');
        this.snackBar.open('Não foi possível buscar o CEP. Tente novamente.', 'Fechar', {
          duration: 4000,
          panelClass: ['api-snackbar--error'],
        });
      },
    });
  }
}
