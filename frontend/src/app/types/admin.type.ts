export type AdminResponse = {
  id: number;
  nome: string;
  email: string;
};

export const ADMIN_VALIDATION_CONSTANTS = {
  NOME_MIN_LENGTH: 3,
  NOME_MAX_LENGTH: 100,
  EMAIL_MIN_LENGTH: 5,
  EMAIL_MAX_LENGTH: 100,
  SENHA_MIN_LENGTH: 8,
  SENHA_MAX_LENGTH: 16,
};
