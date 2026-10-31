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
import { CustomAutocomplete } from '../../components/custom-autocomplete/custom-autocomplete';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ClienteService } from '../../services/cliente-service';
import { EventoService } from '../../services/evento-service';
import { IngressoService } from '../../services/ingresso-service';
import { NotificationService } from '../../services/notification-service';
import { ClienteResponse } from '../../types/cliente.type';
import { ErroResponse } from '../../types/erro.type';
import { EventoResponse } from '../../types/evento.type';
import { IngressoResponse } from '../../types/ingresso.type';
import { formatCpf } from '../../utils/cpf.util';
import { finalize } from 'rxjs';
import { AutenticacaoService } from '../../services/autenticacao-service';

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
  readonly notification = inject(NotificationService);
  readonly autenticacaoService = inject(AutenticacaoService);

  readonly clienteControl: FormControl<ClienteResponse | null>;
  readonly eventoControl: FormControl<EventoResponse | null>;
  readonly form: FormGroup<{
    cliente: FormControl<ClienteResponse | null>;
    evento: FormControl<EventoResponse | null>;
  }>;

  clientes: ClienteResponse[] = [];
  eventos: EventoResponse[] = [];
  isLoadingClientes = true;
  isLoadingEventos = true;
  isSaving = false;
  isAdmin = false;

  constructor() {
    this.clienteControl = new FormControl<ClienteResponse>(this.data?.cliente, [
      Validators.required,
      selectionValidator,
    ]);
    this.eventoControl = new FormControl<EventoResponse>(this.data?.evento, [
      Validators.required,
      selectionValidator,
    ]);
    this.form = new FormGroup({
      cliente: this.clienteControl,
      evento: this.eventoControl,
    });

    this.carregarOpcoes();
    this.isAdmin = this.autenticacaoService.admin();
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

    method.pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => {
          this.notification.success(ingressoId ? 'Ingresso atualizado com sucesso.' : 'Ingresso cadastrado com sucesso.');
          this.dialogRef.close(true);
      },
        error: (erro: ErroResponse) => {
          this.isSaving = false;
          this.notification.error(erro.error?.mensagem);
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

    const method = this.isAdmin
      ? this.clienteService.buscarTodos()
      : this.clienteService.buscarClienteAutenticado();

    method.subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.isLoadingClientes = false;
        this.clienteControl.updateValueAndValidity();
      },
      error: () => {
        this.isLoadingClientes = false;
        this.notification.error('Não foi possível carregar os clientes. Tente novamente.');
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
        this.notification.error('Não foi possível carregar os eventos. Tente novamente.');
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
