import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CustomButton } from '../../components/custom-button/custom-button';
import { IngressoResponse } from '../../types/ingresso.type';
import { formatCpf } from '../../utils/cpf.util';

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
  readonly snackBar = inject(MatSnackBar);
  readonly formatCpf = formatCpf;

  actionTitle: string;

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
        next: () => {
          const successMessage =
            this.props.actionTitle === 'Pagar'
              ? 'Pagamento confirmado com sucesso.'
              : `Ingresso ${this.props.actionTitle.toLowerCase()} com sucesso.`;
          this.snackBar.open(successMessage, 'Fechar', {
            duration: 4000,
            panelClass: ['api-snackbar--success'],
          });
          this.dialogRef.close(true);
        },
        error: () => {
          this.snackBar.open(
            `Não foi possível ${this.props.actionTitle.toLowerCase()} o ingresso. Tente novamente.`,
            'Fechar',
            { duration: 4000, panelClass: ['api-snackbar--error'] },
          );
        },
      });
    }
  };
}
