import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomButton } from '../../components/custom-button/custom-button';
import { EventoService } from '../../services/evento-service';
import { EventoResponse } from '../../types/evento.type';
import { formatEndereco } from '../../utils/format.util';

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
  openDialog = input.required<(evento?: EventoResponse) => void>();

  displayedColumns: string[] = ['id', 'titulo', 'descricao', 'data', 'endereco', 'acoes'];
  dataSource = new MatTableDataSource<EventoResponse>([]);
  errorMessage = '';

  formatEndereco = formatEndereco;

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
