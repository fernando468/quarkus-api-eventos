import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AutenticacaoService } from '../../services/autenticacao-service';
import { Registro } from './registro';

describe('Página de cadastro', () => {
  let component: Registro;
  let fixture: ComponentFixture<Registro>;
  let router: Router;

  const autenticacaoService = {
    registrar: vi.fn(),
  };
  const snackBar = {
    open: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [Registro],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: AutenticacaoService, useValue: autenticacaoService },
        { provide: MatSnackBar, useValue: snackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Registro);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.detectChanges();
  });

  it('deve criar a página e exibir o formulário de cadastro', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Criar conta');
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  it('não deve cadastrar quando houver campos inválidos', () => {
    component.cadastrar();

    expect(component.form.touched).toBe(true);
    expect(autenticacaoService.registrar).not.toHaveBeenCalled();
  });

  it('deve enviar os dados de cadastro e encaminhar para o login', () => {
    autenticacaoService.registrar.mockReturnValue(of({ id: 1 }));
    component.form.setValue({
      nome: 'Maria da Silva',
      email: 'maria@email.com',
      telefone: '44900001111',
      cpf: '48925618001',
      endereco: {
        logradouro: 'Avenida Brasil',
        numero: '111',
        complemento: 'Casa',
        bairro: 'Centro',
        cidade: 'Maringá',
        estado: 'PR',
        cep: '87000000',
      },
      senha: 'senha123',
    });
    const request = component.form.getRawValue();

    fixture.nativeElement.querySelector('app-custom-button button').click();

    expect(autenticacaoService.registrar).toHaveBeenCalledWith(request);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Conta criada com sucesso. Faça login para continuar.',
      'Fechar',
      expect.objectContaining({ panelClass: ['api-snackbar--success'] }),
    );
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    expect(component.isSubmitting).toBe(false);
  });

  it('deve exibir o erro retornado pela API', () => {
    autenticacaoService.registrar.mockReturnValue(
      throwError(() => ({ error: { mensagem: 'E-mail já cadastrado' } })),
    );
    component.form.setValue({
      nome: 'Maria da Silva',
      email: 'maria@email.com',
      telefone: '44900001111',
      cpf: '48925618001',
      endereco: {
        logradouro: 'Avenida Brasil',
        numero: '111',
        complemento: 'Casa',
        bairro: 'Centro',
        cidade: 'Maringá',
        estado: 'PR',
        cep: '87000000',
      },
      senha: 'senha123',
    });

    component.cadastrar();

    expect(snackBar.open).toHaveBeenCalledWith(
      'E-mail já cadastrado',
      'Fechar',
      expect.objectContaining({ panelClass: ['api-snackbar--error'] }),
    );
    expect(component.isSubmitting).toBe(false);
  });
});
