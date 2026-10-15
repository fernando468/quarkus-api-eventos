import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteModal } from './cliente-modal';

describe('ClienteModal', () => {
  let component: ClienteModal;
  let fixture: ComponentFixture<ClienteModal>;
  let dialogRef: { close: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    dialogRef = { close: vi.fn() };
    await TestBed.configureTestingModule({
      imports: [ClienteModal],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: null },
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
