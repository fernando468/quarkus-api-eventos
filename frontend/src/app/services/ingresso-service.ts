import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { IngressoRequest, IngressoResponse } from '../types/ingresso.type';
import { BaseService } from './base-service';

@Service()
export class IngressoService extends BaseService<IngressoRequest, IngressoResponse> {
  constructor() {
    super();
    this.urlBase = '/ingressos';
  }

  cancelar(id: number): Observable<IngressoResponse> {
    return this.http.put<IngressoResponse>(`${this.endpoint}/cancelar/${id}`, {});
  }

  finalizar(id: number): Observable<IngressoResponse> {
    return this.http.put<IngressoResponse>(`${this.endpoint}/finalizar/${id}`, {});
  }

  confirmarPagamento(id: number): Observable<IngressoResponse> {
    return this.http.put<IngressoResponse>(`${this.endpoint}/confirmar-pagamento/${id}`, {});
  }
}
