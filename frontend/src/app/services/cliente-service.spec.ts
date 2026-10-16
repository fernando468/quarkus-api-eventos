import { TestBed } from '@angular/core/testing';
import { ClienteService } from './cliente-service';

describe('Serviço de cliente', () => {
  let service: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
