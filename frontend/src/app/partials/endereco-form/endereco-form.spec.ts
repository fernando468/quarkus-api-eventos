import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { EnderecoForm } from './endereco-form';

describe('EnderecoForm', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all address inputs', () => {
    expect(fixture.nativeElement.querySelectorAll('app-custom-input').length).toBe(7);
  });

  it('should look up the CEP and fill in the address fields', () => {
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

  it('should display an error for an invalid CEP without sending a request', () => {
    fixture.componentInstance.form().get('cep')?.setValue('123');

    fixture.componentInstance.searchCep();

    expect(fixture.componentInstance.lookupError()).toBe('Informe um CEP com 8 dígitos.');
    httpTestingController.expectNone('https://viacep.com.br/ws/123/json/');
  });

  it('should display an error when the CEP is not found', () => {
    fixture.componentInstance.form().get('cep')?.setValue('87000000');

    fixture.componentInstance.searchCep();
    httpTestingController
      .expectOne('https://viacep.com.br/ws/87000000/json/')
      .flush({ erro: true });

    expect(fixture.componentInstance.lookupError()).toBe('CEP não encontrado.');
  });
});
