import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BaseService } from './base-service';

describe('BaseService', () => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use the configured API URL', () => {
    service.urlBase = '/clientes';
    service.buscarTodos().subscribe();

    const request = httpTestingController.expectOne('http://localhost:8080/clientes');
    expect(request.request.method).toBe('GET');
  });
});
