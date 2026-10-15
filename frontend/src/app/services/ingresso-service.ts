import { Service } from '@angular/core';
import { IngressoRequest, IngressoResponse } from '../types/ingresso.type';
import { BaseService } from './base-service';

@Service()
export class IngressoService extends BaseService<IngressoRequest, IngressoResponse> {
  constructor() {
    super();
    this.urlBase = '/ingressos';
  }
}
