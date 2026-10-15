import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IngressoService } from '../../services/ingresso-service';
import { EnumResponse } from '../../types/enum.type';
import { IngressoResponse } from '../../types/ingresso.type';
import { formatCpf } from '../../utils/format.util';

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatTableModule],
  providers: [DatePipe],
  selector: 'app-ingresso-listagem',
  styleUrl: './ingresso-listagem.css',
  templateUrl: './ingresso-listagem.html',
})
export class IngressoListagem {
  openDialog = input.required<(evento?: IngressoResponse) => void>();

  displayedColumns: string[] = ['id', 'status', 'cliente', 'evento'];
  dataSource = new MatTableDataSource<IngressoResponse>([]);
  errorMessage = '';

  constructor(
    private ingressoService: IngressoService,
    private datePipe: DatePipe,
  ) {
    this.carregarIngressos();
  }

  carregarIngressos(): void {
    this.errorMessage = '';
    this.ingressoService.buscarTodos().subscribe({
      next: (ingressos) => {
        this.dataSource.data = ingressos;
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar os ingressos. Tente novamente.';
      },
    });
  }

  formatCliente(ingresso: IngressoResponse): string {
    const { cliente } = ingresso;
    return `${cliente.nome} - ${formatCpf(cliente.cpf)}`;
  }

  formatEvento(ingresso: IngressoResponse): string {
    const { evento } = ingresso;
    const dataFormatada = this.datePipe.transform(evento.data, 'dd/MM/yyyy HH:mm');

    return `${evento.titulo} - ${dataFormatada}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: IngressoResponse, filter: string) => {
      const { cliente, evento, status } = data;
      return (
        status.descricao.toLowerCase().includes(filter) ||
        cliente.nome.toLowerCase().includes(filter) ||
        cliente.cpf.toLowerCase().includes(filter) ||
        evento.titulo.toLowerCase().includes(filter) ||
        evento.descricao.toLowerCase().includes(filter)
      );
    };
  }

  getColorStatus(status: EnumResponse): string {
    if (status.valor === 'AGUARDANDO_PAGAMENTO') return '#767200';
    if (status.valor === 'CANCELADO') return '#ff0000';
    if (status.valor === 'PAGAMENTO_CONFIRMADO') return '#00ff40';
    if (status.valor === 'FINALIZADO') return '#000';
    return '#000';
  }
}
