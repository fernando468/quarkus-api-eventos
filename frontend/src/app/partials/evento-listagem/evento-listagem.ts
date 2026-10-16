import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomButton } from '../../components/custom-button/custom-button';
import { EventoService } from '../../services/evento-service';
import { EventoResponse } from '../../types/evento.type';
import { formatEndereco } from '../../utils/endereco.util';

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
  readonly openDialog = input.required<(evento?: EventoResponse) => void>();
  readonly displayedColumns: string[] = ['id', 'titulo', 'descricao', 'data', 'endereco', 'acoes'];
  readonly dataSource = new MatTableDataSource<EventoResponse>([]);
  readonly formatEndereco = formatEndereco;

  errorMessage = '';

  constructor(private eventoService: EventoService) {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.errorMessage = '';
    this.eventoService.buscarTodos().subscribe({
      next: (clientes) => {
        this.dataSource.data = clientes;
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar os eventos. Tente novamente.';
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
