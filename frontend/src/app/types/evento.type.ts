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
