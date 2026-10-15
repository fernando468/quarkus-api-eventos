import { EnderecoRequest, EnderecoResponse } from './endereco.type';

export type EventoRequest = {
  titulo: string;
  descricao: string;
  data: string;
  endereco: EnderecoRequest;
};

export type EventoResponse = {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  endereco: EnderecoResponse;
};

export const TITULO_MIN_LENGTH = 5;
export const TITULO_MAX_LENGTH = 20;
export const DESCRICAO_MIN_LENGTH = 3;
export const DESCRICAO_MAX_LENGTH = 200;
