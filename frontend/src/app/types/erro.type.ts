type ErroApiResponse = {
  status: number;
  mensagem: string;
  erros: string[];
  data: string;
};

export type ErroResponse = {
  error: ErroApiResponse;
};
