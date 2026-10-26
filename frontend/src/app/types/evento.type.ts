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
  ativo: boolean;
  endereco: EnderecoResponse;
};

export const EVENTO_VALIDATION_CONSTANTS = {
  TITULO_MIN_LENGTH: 5,
  TITULO_MAX_LENGTH: 20,
  DESCRICAO_MIN_LENGTH: 3,
  DESCRICAO_MAX_LENGTH: 200,
};
