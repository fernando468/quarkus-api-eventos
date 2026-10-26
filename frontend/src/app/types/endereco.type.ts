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

export const ENDERECO_VALIDATION_CONSTANTS = {
  LOGRADOURO_MIN_LENGTH: 5,
  LOGRADOURO_MAX_LENGTH: 100,
  NUMERO_MIN_LENGTH: 1,
  NUMERO_MAX_LENGTH: 10,
  COMPLEMENTO_MIN_LENGTH: 2,
  COMPLEMENTO_MAX_LENGTH: 100,
  BAIRRO_MIN_LENGTH: 2,
  BAIRRO_MAX_LENGTH: 60,
  CIDADE_MIN_LENGTH: 3,
  CIDADE_MAX_LENGTH: 60,
  ESTADO_MIN_LENGTH: 2,
  ESTADO_MAX_LENGTH: 2,
  CEP_MIN_LENGTH: 8,
  CEP_MAX_LENGTH: 8,
};
