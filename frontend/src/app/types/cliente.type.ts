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

const NOME_MAX_LENGTH = 100;
const CPF_MAX_LENGTH = 11;
const EMAIL_MAX_LENGTH = 50;
const TELEFONE_MAX_LENGTH = 11;

const NOME_MIN_LENGTH = 3;
const TELEFONE_MIN_LENGTH = 10;
const EMAIL_MIN_LENGTH = 5;
const CPF_MIN_LENGTH = 11;

export {
  CPF_MAX_LENGTH,
  CPF_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  NOME_MAX_LENGTH,
  NOME_MIN_LENGTH,
  TELEFONE_MAX_LENGTH,
  TELEFONE_MIN_LENGTH,
};
