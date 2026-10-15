import { Service } from '@angular/core';
import { EventoRequest, EventoResponse } from '../types/evento.type';
import { BaseService } from './base-service';

@Service()
export class EventoService extends BaseService<EventoRequest, EventoResponse> {
  constructor() {
    super();
    this.urlBase = '/eventos';
  }
}
