import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventoListagem } from '../../partials/evento-listagem/evento-listagem';
import { EventoModal } from '../../partials/evento-modal/evento-modal';
import { HeaderPages } from '../../partials/header-pages/header-pages';
import { EventoResponse } from '../../types/evento.type';

@Component({
  imports: [HeaderPages, EventoListagem],
  selector: 'app-evento',
  styleUrl: './evento.css',
  templateUrl: './evento.html',
})
export class Evento {
  readonly dialog = inject(MatDialog);

  @ViewChild(EventoListagem)
  private eventoListagem?: EventoListagem;

  openDialog = (evento?: EventoResponse): void => {
    const dialogRef = this.dialog.open<EventoModal, EventoResponse, boolean>(EventoModal, {
      data: evento,
    });

    dialogRef.afterClosed().subscribe((eventoCriado) => {
      if (eventoCriado) {
        this.eventoListagem?.carregarEventos();
      }
    });
  };
}
