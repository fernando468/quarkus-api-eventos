import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Service()
export abstract class BaseService<REQUEST, RESPONSE> {
  protected http = inject(HttpClient);
  private url: string = '';

  criar(request: REQUEST): Observable<RESPONSE> {
    return this.http.post<RESPONSE>(this.endpoint, request);
  }

  atualizar(request: REQUEST): Observable<RESPONSE> {
    return this.http.put<RESPONSE>(this.endpoint, request);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/${id}`);
  }

  buscarPorId(id: number): Observable<RESPONSE> {
    return this.http.get<RESPONSE>(`${this.endpoint}/${id}`);
  }

  buscarTodos(): Observable<RESPONSE[]> {
    return this.http.get<RESPONSE[]>(this.endpoint);
  }

  private get endpoint(): string {
    return `${environment.apiUrl}${this.url}`;
  }

  get urlBase(): string {
    return this.url;
  }

  set urlBase(url: string) {
    this.url = url;
  }
}
