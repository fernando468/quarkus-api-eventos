import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BaseService } from './base-service';

describe('Serviço base', () => {
  let service: BaseService<unknown, unknown>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BaseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve usar a URL configurada da API', () => {
    service.urlBase = '/clientes';
    service.buscarTodos().subscribe();

    const request = httpTestingController.expectOne('http://localhost:8080/clientes');
    expect(request.request.method).toBe('GET');
  });
});
