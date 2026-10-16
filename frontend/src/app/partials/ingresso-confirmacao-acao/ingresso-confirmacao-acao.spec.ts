import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IngressoConfirmacaoAcao } from './ingresso-confirmacao-acao';

describe('IngressoConfirmacaoAcao', () => {
  let component: IngressoConfirmacaoAcao;
  let fixture: ComponentFixture<IngressoConfirmacaoAcao>;
  const ingresso = {
    id: 1,
    cliente: { nome: 'Cliente', cpf: '12345678901' },
    evento: { titulo: 'Evento', data: '2026-10-15T18:00:00' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngressoConfirmacaoAcao],
      providers: [
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            actionTitle: 'confirmar',
            data: ingresso,
            onClick: () => of(ingresso),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IngressoConfirmacaoAcao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
