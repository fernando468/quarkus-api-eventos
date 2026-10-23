import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '../../environments/environment';
import { AutenticacaoService } from './autenticacao-service';

function createToken(claims: object): string {
  return `header.${btoa(JSON.stringify(claims))}.signature`;
}

describe('Serviço de autenticação', () => {
  let service: AutenticacaoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    service = TestBed.inject(AutenticacaoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
  });

  it('deve autenticar cliente e identificar a role do token', () => {
    service.login({ email: 'usuario@email.com', senha: 'senha123' }).subscribe();

    const request = httpTestingController.expectOne(`${environment.apiUrl}/autenticacao/login`);
    expect(request.request.method).toBe('POST');
    request.flush({
      accessToken: createToken({ groups: 'CLIENTE' }),
      tokenType: 'Bearer',
      expiresIn: 900,
    });

    expect(service.authenticated()).toBe(true);
    expect(service.admin()).toBe(false);
    expect(service.role()).toBe('CLIENTE');
    expect(localStorage.getItem('accessToken')).toBe(createToken({ groups: 'CLIENTE' }));
  });

  it('deve identificar a role admin do token', () => {
    service.login({ email: 'admin@email.com', senha: 'senha123' }).subscribe();

    httpTestingController
      .expectOne(`${environment.apiUrl}/autenticacao/login`)
      .flush({
        accessToken: createToken({ groups: ['CLIENTE', 'ADMIN'] }),
        tokenType: 'Bearer',
        expiresIn: 900,
      });

    expect(service.role()).toBe('ADMIN');
    expect(service.admin()).toBe(true);
  });
});
