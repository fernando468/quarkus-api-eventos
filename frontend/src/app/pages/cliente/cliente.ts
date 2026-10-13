import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderPages } from '../../partials/header-pages/header-pages';
import { ClienteModal } from '../../partials/pages/cliente-modal/cliente-modal';

@Component({
  imports: [HeaderPages],
  selector: 'app-cliente',
  styleUrl: './cliente.css',
  templateUrl: './cliente.html',
})
export class Cliente {
  readonly dialog = inject(MatDialog);

  openDialog = (): void => {
    const dialogRef = this.dialog.open(ClienteModal);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  };
}
