import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, RegistroRequest, TokenResponse, UserRole } from '../types/autenticacao.type';
import { ClienteResponse } from '../types/cliente.type';

interface TokenClaims {
  exp?: number;
  groups?: string | string[];
  role?: string;
  roles?: string[];
}

@Service()
export class AutenticacaoService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly token = signal<string | null>(null);
  readonly role = signal<UserRole | null>(null);
  readonly authenticated = computed(() => this.token() !== null && this.role() !== null);
  readonly admin = computed(() => this.role() === 'ADMIN');

  constructor() {
    this.restoreSession();
  }

  login(request: LoginRequest): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${environment.apiUrl}/autenticacao/login`, request)
      .pipe(tap((response) => this.saveSession(response.accessToken)));
  }

  registrar(request: RegistroRequest): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(`${environment.apiUrl}/autenticacao/registrar`, request);
  }

  get accessToken(): string | null {
    return this.token();
  }

  logout(): void {
    this.token.set(null);
    this.role.set(null);
    localStorage.removeItem('accessToken');
    void this.router.navigateByUrl('/login');
  }

  private restoreSession(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }

    const claims = this.decodeClaims(accessToken);
    if (!claims || (claims.exp !== undefined && claims.exp * 1000 <= Date.now())) {
      localStorage.removeItem('accessToken');
      return;
    }

    this.token.set(accessToken);
    this.role.set(this.getRole(claims));
  }

  private saveSession(accessToken: string): void {
    const claims = this.decodeClaims(accessToken);
    if (!claims) {
      throw new Error('O token recebido pela API é inválido.');
    }

    this.token.set(accessToken);
    this.role.set(this.getRole(claims));
    localStorage.setItem('accessToken', accessToken);
  }

  private decodeClaims(accessToken: string): TokenClaims | null {
    try {
      const payload = accessToken.split('.')[1];
      if (!payload) {
        return null;
      }

      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes)) as TokenClaims;
    } catch {
      return null;
    }
  }

  private getRole(claims: TokenClaims): UserRole | null {
    const groups = Array.isArray(claims.groups)
      ? claims.groups
      : claims.groups
        ? [claims.groups]
        : [];
    const roles = [...groups, ...(claims.roles ?? []), ...(claims.role ? [claims.role] : [])].map(
      (role) => role.toLowerCase(),
    );

    if (roles.includes('admin')) {
      return 'ADMIN';
    }
    if (roles.includes('cliente')) {
      return 'CLIENTE';
    }
    return null;
  }
}
