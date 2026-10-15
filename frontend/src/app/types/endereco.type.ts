export type EnderecoRequest = {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

export type EnderecoResponse = {
  id: number;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

const LOGRADOURO_MIN_LENGTH = 5;
const LOGRADOURO_MAX_LENGTH = 100;
const NUMERO_MIN_LENGTH = 1;
const NUMERO_MAX_LENGTH = 5;
const COMPLEMENTO_MIN_LENGTH = 2;
const COMPLEMENTO_MAX_LENGTH = 100;
const BAIRRO_MIN_LENGTH = 2;
const BAIRRO_MAX_LENGTH = 60;
const CIDADE_MIN_LENGTH = 3;
const CIDADE_MAX_LENGTH = 60;
const ESTADO_MIN_LENGTH = 2;
const ESTADO_MAX_LENGTH = 2;
const CEP_MIN_LENGTH = 8;
const CEP_MAX_LENGTH = 8;

export {
  BAIRRO_MAX_LENGTH,
  BAIRRO_MIN_LENGTH,
  CEP_MAX_LENGTH,
  CEP_MIN_LENGTH,
  CIDADE_MAX_LENGTH,
  CIDADE_MIN_LENGTH,
  COMPLEMENTO_MAX_LENGTH,
  COMPLEMENTO_MIN_LENGTH,
  ESTADO_MAX_LENGTH,
  ESTADO_MIN_LENGTH,
  LOGRADOURO_MAX_LENGTH,
  LOGRADOURO_MIN_LENGTH,
  NUMERO_MAX_LENGTH,
  NUMERO_MIN_LENGTH,
};
