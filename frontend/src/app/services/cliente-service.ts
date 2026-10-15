import { Service } from '@angular/core';
import { ClienteRequest, ClienteResponse } from '../types/cliente.type';
import { BaseService } from './base-service';

@Service()
export class ClienteService extends BaseService<ClienteRequest, ClienteResponse> {
  constructor() {
    super();
    this.urlBase = '/clientes';
  }
}
