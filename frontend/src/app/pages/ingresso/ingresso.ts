import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderPages } from '../../partials/header-pages/header-pages';
import { IngressoListagem } from '../../partials/ingresso-listagem/ingresso-listagem';
import { IngressoModal } from '../../partials/ingresso-modal/ingresso-modal';
import { IngressoResponse } from '../../types/ingresso.type';

@Component({
  imports: [HeaderPages, IngressoListagem],
  selector: 'app-ingresso',
  styleUrl: './ingresso.css',
  templateUrl: './ingresso.html',
})
export class Ingresso {
  readonly dialog = inject(MatDialog);
  @ViewChild(IngressoListagem) private ingressoListagem?: IngressoListagem;

  openDialog = (ingresso?: IngressoResponse): void => {
    const dialogRef = this.dialog.open<IngressoModal, IngressoResponse, boolean>(IngressoModal, {
      data: ingresso,
      autoFocus: 'dialog',
    });

    dialogRef.afterClosed().subscribe((ingressoCriado) => {
      if (ingressoCriado) {
        this.ingressoListagem?.carregarIngressos();
      }
    });
  };
}
