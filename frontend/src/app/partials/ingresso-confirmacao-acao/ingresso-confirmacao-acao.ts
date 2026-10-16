import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CustomButton } from '../../components/custom-button/custom-button';
import { IngressoResponse } from '../../types/ingresso.type';
import { formatCpf } from '../../utils/format.util';

export type IngressoConfirmacaoAcaoProps = {
  actionTitle: string;
  onClick: () => Observable<IngressoResponse>;
  data: IngressoResponse;
};

@Component({
  imports: [MatDialogModule, CustomButton, DatePipe],
  selector: 'app-ingresso-confirmacao-acao',
  styleUrl: './ingresso-confirmacao-acao.css',
  templateUrl: './ingresso-confirmacao-acao.html',
})
export class IngressoConfirmacaoAcao {
  readonly dialogRef = inject(MatDialogRef<IngressoConfirmacaoAcao>);
  readonly props: IngressoConfirmacaoAcaoProps = inject(MAT_DIALOG_DATA);

  actionTitle: string;
  formatCpf = formatCpf;

  constructor() {
    this.actionTitle = this.props.actionTitle;
  }

  getMensagem(): string {
    const { data } = this.props;

    return `Ingresso: ${data.id} do cliente: ${data.cliente.nome} - ${formatCpf(data.cliente.cpf)}
      para o evento ${data.evento.titulo} no dia ${data.evento.data}`;
  }

  onCancel = (): void => {
    this.dialogRef.close();
  };

  onConfirm = (): void => {
    if (this.props) {
      this.props.onClick().subscribe({
        next: () => this.dialogRef.close(true),
        error: () => `Não foi possível ${this.props.actionTitle}. Tente novamente.`,
      });
    }
  };
}
