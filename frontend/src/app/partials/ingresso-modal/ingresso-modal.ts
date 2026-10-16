import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomAutocomplete } from '../../components/custom-autocomplete/custom-autocomplete';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ClienteService } from '../../services/cliente-service';
import { EventoService } from '../../services/evento-service';
import { IngressoService } from '../../services/ingresso-service';
import { ClienteResponse } from '../../types/cliente.type';
import { ErroResponse } from '../../types/erro.type';
import { EventoResponse } from '../../types/evento.type';
import { IngressoResponse } from '../../types/ingresso.type';
import { formatCpf } from '../../utils/cpf.util';

const selectionValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value as ClienteResponse | EventoResponse;
  return value ? null : { selectionRequired: true };
};

@Component({
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    CustomButton,
    CustomAutocomplete,
  ],
  providers: [DatePipe],
  selector: 'app-ingresso-modal',
  templateUrl: './ingresso-modal.html',
})
export class IngressoModal {
  readonly dialogRef = inject(MatDialogRef<IngressoModal>);
  readonly data: IngressoResponse = inject(MAT_DIALOG_DATA);

  readonly ingressoService = inject(IngressoService);
  readonly eventoService = inject(EventoService);
  readonly clienteService = inject(ClienteService);
  readonly datePipe = inject(DatePipe);
  readonly snackBar = inject(MatSnackBar);

  readonly clienteControl = new FormControl<ClienteResponse>(this.data?.cliente, [
    Validators.required,
    selectionValidator,
  ]);
  readonly eventoControl = new FormControl<EventoResponse>(this.data?.evento, [
    Validators.required,
    selectionValidator,
  ]);
  readonly form = new FormGroup({
    cliente: this.clienteControl,
    evento: this.eventoControl,
  });

  clientes: ClienteResponse[] = [];
  eventos: EventoResponse[] = [];
  isLoadingClientes = true;
  isLoadingEventos = true;
  isSaving = false;
  private clientesFalharam = false;
  private eventosFalharam = false;

  constructor() {
    this.carregarOpcoes();
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

    const ingressoId = this.data?.id;
    const cliente = this.clienteControl.value;
    const evento = this.eventoControl.value;
    if (!cliente || !evento) {
      this.isSaving = false;
      this.form.markAllAsTouched();
      return;
    }

    const request = {
      clienteId: cliente.id,
      eventoId: evento.id,
    };
    const method = ingressoId
      ? this.ingressoService.atualizar(ingressoId, request)
      : this.ingressoService.criar(request);

    method.subscribe({
      next: () => {
        this.snackBar.open(
          ingressoId ? 'Ingresso atualizado com sucesso.' : 'Ingresso cadastrado com sucesso.',
          'Fechar',
          { duration: 4000, panelClass: ['api-snackbar--success'] },
        );
        this.dialogRef.close(true);
      },
      error: (erro: ErroResponse) => {
        this.isSaving = false;
        this.snackBar.open(erro.error.mensagem, 'Fechar', {
          duration: 4000,
          panelClass: ['api-snackbar--error'],
        });
      },
    });
  };

  displayCliente = (value: ClienteResponse): string => {
    if (!value) {
      return '';
    }
    return `${value.nome} - ${formatCpf(value.cpf)}`;
  };

  displayEvento = (value: EventoResponse): string => {
    if (!value) {
      return '';
    }
    return this.formatarEvento(value);
  };

  filtrarCliente = (option: ClienteResponse, searchTerm: string): boolean => {
    return this.correspondeBusca(
      `${option.nome} ${option.cpf} ${formatCpf(option.cpf)}`,
      searchTerm,
    );
  };

  filtrarEvento = (option: EventoResponse, searchTerm: string): boolean => {
    return this.correspondeBusca(`${option.descricao} ${this.formatarEvento(option)}`, searchTerm);
  };

  private carregarOpcoes(): void {
    this.clienteService.buscarTodos().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.isLoadingClientes = false;
        this.clienteControl.updateValueAndValidity();
      },
      error: () => {
        this.isLoadingClientes = false;
        this.clientesFalharam = true;
        this.snackBar.open('Não foi possível carregar os clientes. Tente novamente.', 'Fechar', {
          duration: 4000,
          panelClass: ['api-snackbar--error'],
        });
      },
    });

    this.eventoService.buscarTodos().subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        this.isLoadingEventos = false;
        this.eventoControl.updateValueAndValidity();
      },
      error: (erro: ErroResponse) => {
        this.isLoadingEventos = false;
        this.eventosFalharam = true;
        this.snackBar.open('Não foi possível carregar os eventos. Tente novamente.', 'Fechar', {
          duration: 4000,
          panelClass: ['api-snackbar--error'],
        });
      },
    });
  }

  private formatarEvento(evento: EventoResponse): string {
    const dataFormatada = this.datePipe.transform(evento.data, 'dd/MM/yyyy HH:mm');
    return `${evento.titulo} - ${dataFormatada || evento.data}`;
  }

  private correspondeBusca(texto: string, termo: string): boolean {
    return this.normalizar(texto).includes(this.normalizar(termo));
  }

  private normalizar(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
}
