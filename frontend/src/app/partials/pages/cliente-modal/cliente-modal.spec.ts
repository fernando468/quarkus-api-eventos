import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ClienteService } from '../../../services/cliente-service';
import { ClienteModal } from './cliente-modal';

describe('ClienteModal', () => {
  let component: ClienteModal;
  let fixture: ComponentFixture<ClienteModal>;
  let dialogRef: { close: ReturnType<typeof vi.fn> };
  const criarCliente = vi.fn(() => of(null));

  beforeEach(async () => {
    dialogRef = { close: vi.fn() };
    criarCliente.mockReset().mockReturnValue(of(null));
    await TestBed.configureTestingModule({
      imports: [ClienteModal],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: ClienteService, useValue: { criar: criarCliente } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep the modal open and mark fields touched when the form is invalid', () => {
    component.onConfirm();

    expect(component.form.invalid).toBe(true);
    expect(component.form.touched).toBe(true);
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should close with a success result after creating the client', () => {
    component.onConfirm();

    expect(criarCliente).toHaveBeenCalledOnce();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should apply minimum and maximum length validators', () => {
    const nome = component.form.get('nome');
    nome?.setValue('ab');
    expect(nome?.hasError('minlength')).toBe(true);

    nome?.setValue('a'.repeat(101));
    expect(nome?.hasError('maxlength')).toBe(true);

    const cep = component.enderecoForm.get('cep');
    cep?.setValue('1234567');
    expect(cep?.hasError('minlength')).toBe(true);
  });
});
