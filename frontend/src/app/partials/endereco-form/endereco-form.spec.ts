import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { EnderecoForm } from './endereco-form';

describe('Formulário de endereço', () => {
  let component: EnderecoForm;
  let fixture: ComponentFixture<EnderecoForm>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnderecoForm],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EnderecoForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'form',
      new FormGroup({
        logradouro: new FormControl(''),
        numero: new FormControl(''),
        complemento: new FormControl(''),
        bairro: new FormControl(''),
        cidade: new FormControl(''),
        estado: new FormControl(''),
        cep: new FormControl(''),
      }),
    );
    await fixture.whenStable();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir todos os campos de endereço', () => {
    expect(fixture.nativeElement.querySelectorAll('app-custom-input').length).toBe(7);
  });

  it('deve consultar o CEP e preencher os campos de endereço', () => {
    fixture.componentInstance.form().get('cep')?.setValue('87000-000');

    fixture.componentInstance.searchCep();

    const request = httpTestingController.expectOne('https://viacep.com.br/ws/87000000/json/');
    expect(request.request.method).toBe('GET');
    request.flush({
      bairro: 'Centro',
      localidade: 'Maringá',
      logradouro: 'Avenida Brasil',
      uf: 'PR',
    });

    expect(fixture.componentInstance.form().value).toEqual(
      expect.objectContaining({
        bairro: 'Centro',
        cidade: 'Maringá',
        estado: 'PR',
        logradouro: 'Avenida Brasil',
      }),
    );
    expect(fixture.componentInstance.isLookingUp()).toBe(false);
    httpTestingController.verify();
  });
});
