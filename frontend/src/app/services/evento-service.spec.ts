import { TestBed } from '@angular/core/testing';
import { EventoService } from './evento-service';

describe('Serviço de evento', () => {
  let service: EventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
