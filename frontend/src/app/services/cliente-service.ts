import { Service } from '@angular/core';
import { ClienteRequest, ClienteResponse } from '../types/cliente.type';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';

@Service()
export class ClienteService extends BaseService<ClienteRequest, ClienteResponse> {
  constructor() {
    super();
    this.urlBase = '/clientes';
  }

  buscarClienteAutenticado(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(`${this.endpoint}/autenticado`);
  }
}
