import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AutenticacaoService } from '../../services/autenticacao-service';
import { Login } from './login';

describe('Página de login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let router: Router;

  const autenticacaoService = {
    login: vi.fn(),
    admin: vi.fn(),
  };
  const snackBar = {
    open: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: AutenticacaoService, useValue: autenticacaoService },
        { provide: MatSnackBar, useValue: snackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();
  });

  it('deve criar a página e exibir o formulário de login', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Entrar');
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  it('não deve enviar o formulário quando os dados forem inválidos', () => {
    component.form.setValue({ email: '', senha: '' });
    fixture.nativeElement.querySelector('app-custom-button button').click();

    expect(component.form.touched).toBe(true);
    expect(autenticacaoService.login).not.toHaveBeenCalled();
  });

  it('deve autenticar e encaminhar usuário para eventos', () => {
    autenticacaoService.admin.mockReturnValue(false);
    autenticacaoService.login.mockReturnValue(of({ accessToken: 'token' }));
    component.form.setValue({ email: 'usuario@email.com', senha: 'senha123' });

    fixture.nativeElement.querySelector('app-custom-button button').click();

    expect(autenticacaoService.login).toHaveBeenCalledWith({
      email: 'usuario@email.com',
      senha: 'senha123',
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/evento');
    expect(component.isSubmitting).toBe(false);
  });

  it('deve encaminhar administradores para a listagem de clientes', () => {
    autenticacaoService.admin.mockReturnValue(true);
    autenticacaoService.login.mockReturnValue(of({ accessToken: 'token' }));
    component.form.setValue({ email: 'admin@email.com', senha: 'senha123' });

    fixture.nativeElement.querySelector('app-custom-button button').click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/cliente');
  });

  it('deve exibir o erro retornado pela API', () => {
    autenticacaoService.login.mockReturnValue(
      throwError(() => ({ error: { mensagem: 'Credenciais inválidas' } })),
    );
    component.form.setValue({ email: 'usuario@email.com', senha: 'senha123' });

    fixture.nativeElement.querySelector('app-custom-button button').click();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Credenciais inválidas',
      'Fechar',
      expect.objectContaining({ panelClass: ['api-snackbar--error'] }),
    );
    expect(component.isSubmitting).toBe(false);
  });
});
