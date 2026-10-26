import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cpfMask } from '../../utils/cpf.util';
import { CustomInput } from './custom-input';

describe('Campo personalizado', () => {
  let component: CustomInput;
  let fixture: ComponentFixture<CustomInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInput],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomInput);
    fixture.componentRef.setInput('form', new FormGroup({ nome: new FormControl('') }));
    fixture.componentRef.setInput('name', 'nome');
    fixture.componentRef.setInput('label', 'Nome');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve manter o valor sem máscara no formulário e exibi-lo formatado', () => {
    fixture.componentRef.setInput('mask', cpfMask);
    fixture.componentRef.setInput('maxLength', 11);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '123.456.789-01';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.control().value).toBe('12345678901');
    expect(input.value).toBe('123.456.789-01');
  });

  it('deve exibir valores definidos programaticamente com a máscara', () => {
    fixture.componentRef.setInput('mask', cpfMask);
    component.control().setValue('12345678901');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('123.456.789-01');
  });

  it('deve exibir a mensagem de erro do controle inválido', async () => {
    component.control().setValidators([Validators.required]);
    component.control().updateValueAndValidity();
    component.control().markAsTouched();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.control().hasError('required')).toBe(true);
    expect(component.message()).toBe('Nome é obrigatório(a)');
    const error = fixture.nativeElement.querySelector('.mat-mdc-form-field-error') as HTMLElement;
    expect(error.textContent).toContain('Nome é obrigatório(a)');
  });
});
