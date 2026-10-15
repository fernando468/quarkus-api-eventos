import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteListagem } from '../../partials/cliente-listagem/cliente-listagem';
import { ClienteModal } from '../../partials/cliente-modal/cliente-modal';
import { HeaderPages } from '../../partials/header-pages/header-pages';
import { ClienteResponse } from '../../types/cliente.type';

@Component({
  imports: [HeaderPages, ClienteListagem],
  selector: 'app-cliente',
  styleUrl: './cliente.css',
  templateUrl: './cliente.html',
})
export class Cliente {
  readonly dialog = inject(MatDialog);
  @ViewChild(ClienteListagem) private clienteListagem?: ClienteListagem;

  openDialog = (cliente?: ClienteResponse): void => {
    const dialogRef = this.dialog.open<ClienteModal, ClienteResponse, boolean>(ClienteModal, {
      data: cliente,
    });

    dialogRef.afterClosed().subscribe((clienteCriado) => {
      if (clienteCriado) {
        this.clienteListagem?.carregarClientes();
      }
    });
  };
}
