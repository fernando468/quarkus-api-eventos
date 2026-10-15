import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderPages } from '../../partials/header-pages/header-pages';
import { ClienteListagem } from '../../partials/pages/cliente-listagem/cliente-listagem';
import { ClienteModal } from '../../partials/pages/cliente-modal/cliente-modal';
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

  openDialog = (): void => {
    const dialogRef = this.dialog.open<ClienteModal, void, boolean>(ClienteModal);

    dialogRef.afterClosed().subscribe((clienteCriado) => {
      if (clienteCriado) {
        this.clienteListagem?.carregarClientes();
      }
    });
  };
}
