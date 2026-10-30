import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ClienteService } from '../../services/cliente-service';
import { EventoService } from '../../services/evento-service';
import { IngressoService } from '../../services/ingresso-service';
import { ClienteResponse } from '../../types/cliente.type';
import { EventoResponse } from '../../types/evento.type';
import { IngressoModal } from './ingresso-modal';

describe('Modal de ingresso', () => {
  let component: IngressoModal;
  let fixture: ComponentFixture<IngressoModal>;
  let dialogRef: { close: ReturnType<typeof vi.fn> };
  let ingressoService: { criar: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    dialogRef = { close: vi.fn() };
    ingressoService = { criar: vi.fn(() => of(null)) };
    await TestBed.configureTestingModule({
      imports: [IngressoModal],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: IngressoService, useValue: ingressoService },
        { provide: ClienteService, useValue: { buscarTodos: vi.fn(() => of([])) } },
        { provide: EventoService, useValue: { buscarTodos: vi.fn(() => of([])) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IngressoModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar o ingresso com os IDs do cliente e do evento selecionados', () => {
    component.clienteControl.setValue({
      id: 1,
      nome: 'Ana',
      email: 'ana@example.com',
      telefone: '44900001111',
      cpf: '12345678901',
      endereco: {
        id: 1,
        logradouro: 'Avenida Brasil',
        numero: '1',
        complemento: 'Casa',
        bairro: 'Centro',
        cidade: 'Maringá',
        estado: 'PR',
        cep: '87000000',
      },
    });
    component.eventoControl.setValue({
      id: 2,
      titulo: 'Show',
      descricao: 'Evento musical',
      data: '2026-12-01T20:00:00',
      ativo: true,
      endereco: {
        id: 1,
        logradouro: 'Avenida Brasil',
        numero: '1',
        complemento: 'Casa',
        bairro: 'Centro',
        cidade: 'Maringá',
        estado: 'PR',
        cep: '87000000',
      },
    });

    component.onConfirm();

    expect(ingressoService.criar).toHaveBeenCalledWith({ clienteId: 1, eventoId: 2 });
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('deve rejeitar texto que não foi selecionado no autocomplete', () => {
    component.clienteControl.setValue(null);
    component.eventoControl.setValue({
      id: 2,
      titulo: 'Show',
      descricao: 'Evento musical',
      data: '2026-12-01T20:00:00',
      ativo: true,
      endereco: {
        id: 1,
        logradouro: 'Avenida Brasil',
        numero: '1',
        complemento: 'Casa',
        bairro: 'Centro',
        cidade: 'Maringá',
        estado: 'PR',
        cep: '87000000',
      },
    });

    component.onConfirm();

    expect(ingressoService.criar).not.toHaveBeenCalled();
    expect(component.form.invalid).toBe(true);
  });

  it('deve exibir e filtrar clientes pelo nome e CPF -atado', () => {
    const cliente = { nome: 'Ána Silva', cpf: '12345678901' } as ClienteResponse;

    expect(component.displayCliente(cliente)).toBe('Ána Silva - 123.456.789-01');
    expect(component.filtrarCliente(cliente, 'ana')).toBe(true);
    expect(component.filtrarCliente(cliente, '456.789')).toBe(true);
  });

  it('deve exibir e filtrar eventos pelo título, descrição e data', () => {
    const evento = {
      titulo: 'Festa Junina',
      descricao: 'Música e comidas',
      data: '2026-06-20T20:00:00',
    } as EventoResponse;

    expect(component.displayEvento(evento)).toContain('Festa Junina - ');
    expect(component.filtrarEvento(evento, 'junina')).toBe(true);
    expect(component.filtrarEvento(evento, 'musica')).toBe(true);
  });
});
