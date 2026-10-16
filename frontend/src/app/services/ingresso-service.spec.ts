import { TestBed } from '@angular/core/testing';
import { IngressoService } from './ingresso-service';

describe('Serviço de ingresso', () => {
  let service: IngressoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngressoService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
