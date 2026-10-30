import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonAppearance } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CustomButton } from '../../components/custom-button/custom-button';
import { IngressoService } from '../../services/ingresso-service';
import { NotificationService } from '../../services/notification-service';
import { EnumResponse } from '../../types/enum.type';
import { ErroResponse } from '../../types/erro.type';
import { IngressoResponse } from '../../types/ingresso.type';
import { formatCpf } from '../../utils/cpf.util';
import {
  IngressoConfirmacaoAcao,
  IngressoConfirmacaoAcaoProps,
} from '../ingresso-confirmacao-acao/ingresso-confirmacao-acao';

type BotaoProps = {
  title: string;
  variant: MatButtonAppearance;
  backgroundColor: string;
  onClick: () => Observable<IngressoResponse>;
};

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatTableModule, CustomButton],
  providers: [DatePipe],
  selector: 'app-ingresso-listagem',
  styleUrl: './ingresso-listagem.css',
  templateUrl: './ingresso-listagem.html',
})
export class IngressoListagem {
  readonly openDialog = input.required<(ingresso: IngressoResponse) => void>();
  readonly displayedColumns: string[] = ['id', 'status', 'cliente', 'evento', 'acoes'];
  readonly dataSource = new MatTableDataSource<IngressoResponse>([]);
  readonly dialog = inject(MatDialog);
  readonly notification = inject(NotificationService);

  constructor(
    private ingressoService: IngressoService,
    private datePipe: DatePipe,
  ) {
    this.carregarIngressos();
  }

  openDialogConfirmacao = (ingresso: IngressoResponse, item: BotaoProps): void => {
    const dialogRef = this.dialog.open<
      IngressoConfirmacaoAcao,
      IngressoConfirmacaoAcaoProps,
      boolean
    >(IngressoConfirmacaoAcao, {
      data: {
        actionTitle: item.title,
        data: ingresso,
        onClick: () => item.onClick(),
      },
      autoFocus: 'dialog',
    });

    dialogRef.afterClosed().subscribe((ingressoCriado) => {
      console.log(ingressoCriado);
      if (ingressoCriado) {
        this.carregarIngressos();
      }
    });
  };

  carregarIngressos(): void {
    this.ingressoService.buscarTodos().subscribe({
      next: (ingressos) => {
        this.dataSource.data = ingressos;
      },
      error: (erro: ErroResponse) => {
        this.notification.error(erro.error?.mensagem);
      },
    });
  }

  cancelar(id: number): Observable<IngressoResponse> {
    return this.ingressoService.cancelar(id);
  }

  finalizar(id: number): Observable<IngressoResponse> {
    return this.ingressoService.finalizar(id);
  }

  confirmarPagamento(id: number): Observable<IngressoResponse> {
    return this.ingressoService.confirmarPagamento(id);
  }

  getListaBotao(ingresso: IngressoResponse): BotaoProps[] {
    const { id, status } = ingresso;
    const titulos: BotaoProps[] = [];

    if (status.valor === 'AGUARDANDO_PAGAMENTO') {
      titulos.push({
        title: 'Pagar',
        variant: 'filled',
        backgroundColor: '#00b124',
        onClick: () => this.confirmarPagamento(id),
      });
      titulos.push({
        title: 'Cancelar',
        variant: 'filled',
        backgroundColor: '#b10000',
        onClick: () => this.cancelar(id),
      });
    }
    if (status.valor === 'PAGAMENTO_CONFIRMADO') {
      titulos.push({
        title: 'Finalizar',
        variant: 'filled',
        backgroundColor: '',
        onClick: () => this.finalizar(id),
      });
      titulos.push({
        title: 'Cancelar',
        variant: 'filled',
        backgroundColor: '#b10000',
        onClick: () => this.cancelar(id),
      });
    }
    if (status.valor === 'CANCELADO' || status.valor === 'FINALIZADO') {
      titulos;
    }

    return titulos;
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
