import { EnderecoResponse } from '../types/endereco.type';

export function formatEndereco(endereco: EnderecoResponse): string {
  if (!endereco) {
    return '-';
  }
  const cepFormatado = endereco.cep.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
  return `${endereco.logradouro}, ${endereco.numero}, ${endereco.complemento}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, ${cepFormatado}`;
}
