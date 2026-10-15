import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClienteService } from '../../../services/cliente-service';
import { ClienteResponse } from '../../../types/cliente.type';
import { ClienteListagem } from './cliente-listagem';

describe('ClienteListagem', () => {
  let component: ClienteListagem;
  let fixture: ComponentFixture<ClienteListagem>;
  const buscarTodos = vi.fn(() => of([] as ClienteResponse[]));

  beforeEach(async () => {
    buscarTodos.mockReset().mockReturnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [ClienteListagem],
      providers: [{ provide: ClienteService, useValue: { buscarTodos } }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the client fields returned by the service', async () => {
    buscarTodos.mockReturnValue(
      of([
        {
          id: 42,
          nome: 'Ana Silva',
          cpf: '12345678901',
          email: 'ana@example.com',
          telefone: '44999998888',
          endereco: {
            logradouro: 'Rua Central',
            numero: '10',
            complemento: '',
            bairro: 'Centro',
            cidade: 'Maringá',
            estado: 'PR',
            cep: '87000000',
          },
        },
      ]),
    );

    component.carregarClientes();
    await fixture.whenStable();
    fixture.detectChanges();

    const tableText = fixture.nativeElement.querySelector('table').textContent;
    expect(tableText).toContain('42');
    expect(tableText).toContain('Ana Silva');
    expect(tableText).toContain('12345678901');
    expect(tableText).toContain('ana@example.com');
    expect(tableText).toContain('44999998888');
  });

  it('should request the clients again when reloaded', () => {
    component.carregarClientes();

    expect(buscarTodos).toHaveBeenCalledTimes(2);
  });
});
