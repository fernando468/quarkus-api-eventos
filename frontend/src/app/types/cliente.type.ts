import { EnderecoRequest, EnderecoResponse } from './endereco.type';

export type ClienteRequest = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: EnderecoRequest;
};

export type ClienteResponse = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: EnderecoResponse;
};

export const CLIENTE_VALIDATION_CONSTANTS = {
  NOME_MAX_LENGTH: 100,
  CPF_MAX_LENGTH: 11,
  EMAIL_MAX_LENGTH: 100,
  TELEFONE_MAX_LENGTH: 11,
  NOME_MIN_LENGTH: 3,
  TELEFONE_MIN_LENGTH: 10,
  EMAIL_MIN_LENGTH: 5,
  CPF_MIN_LENGTH: 11,
  SENHA_MIN_LENGTH: 8,
  SENHA_MAX_LENGTH: 16,
};
