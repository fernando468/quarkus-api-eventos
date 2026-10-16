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

const TITULO_MIN_LENGTH = 5;
const TITULO_MAX_LENGTH = 20;
const DESCRICAO_MIN_LENGTH = 3;
const DESCRICAO_MAX_LENGTH = 200;

export { DESCRICAO_MAX_LENGTH, DESCRICAO_MIN_LENGTH, TITULO_MAX_LENGTH, TITULO_MIN_LENGTH };
