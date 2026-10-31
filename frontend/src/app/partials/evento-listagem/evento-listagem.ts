import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomButton } from '../../components/custom-button/custom-button';
import { EventoService } from '../../services/evento-service';
import { NotificationService } from '../../services/notification-service';
import { ErroResponse } from '../../types/erro.type';
import { EventoResponse } from '../../types/evento.type';
import { formatEndereco } from '../../utils/endereco.util';
import { AutenticacaoService } from '../../services/autenticacao-service';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CustomButton,
    MatIconModule,
    DatePipe,
  ],
  selector: 'app-evento-listagem',
  styleUrl: './evento-listagem.css',
  templateUrl: './evento-listagem.html',
})
export class EventoListagem {
  readonly openDialog = input.required<(evento: EventoResponse) => void>();
  readonly displayedColumns: string[] = ['id', 'titulo', 'descricao', 'data', 'endereco'];
  readonly dataSource = new MatTableDataSource<EventoResponse>([]);
  readonly formatEndereco = formatEndereco;
  isAdmin = false;

  constructor(
    private eventoService: EventoService,
    private notification: NotificationService,
    private authenticationService: AutenticacaoService
  ) {
    this.carregarEventos();
    this.isAdmin = authenticationService.admin();
    if (this.isAdmin) {
      this.displayedColumns.push('acoes');
    }
  }

  carregarEventos(): void {
    this.eventoService.buscarTodos().subscribe({
      next: (clientes) => {
        this.dataSource.data = clientes;
      },
      error: (erro: ErroResponse) => {
        this.notification.error(erro.error?.mensagem);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
