import { EnderecoRequest } from './endereco.type';

export type LoginRequest = {
  email: string;
  senha: string;
};

export type RegistroRequest = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: EnderecoRequest;
  senha: string;
};

export type TokenResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

export type UserRole = 'CLIENTE' | 'ADMIN';
