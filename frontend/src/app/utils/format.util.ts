import { EnderecoResponse } from '../types/endereco.type';

export function formatCpf(cpf: string): string {
  if (!cpf) {
    return '-';
  }
  return cpf
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatTelefoneComDigitoExtra(telefone: string | null | undefined): string {
  if (!telefone) {
    return '-';
  }

  const digits = telefone.replace(/\D/g, '').slice(0, 11);

  return digits.replace(/^(\d{2})(\d)(\d{4})(\d{4})$/, '($1) $2 $3-$4');
}

function formatTelefoneSemDigitoExtra(telefone: string | null | undefined): string {
  if (!telefone) {
    return '-';
  }

  const digits = telefone.replace(/\D/g, '').slice(0, 10);

  return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
}

export function formatTelefone(telefone: string): string {
  if (!telefone) {
    return '-';
  }
  if (telefone.length === 11) {
    return formatTelefoneComDigitoExtra(telefone);
  }
  return formatTelefoneSemDigitoExtra(telefone);
}

export function formatEndereco(endereco: EnderecoResponse): string {
  if (!endereco) {
    return '-';
  }
  const cepFormatado = endereco.cep.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
  return `${endereco.logradouro}, ${endereco.numero}, ${endereco.complemento}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, ${cepFormatado}`;
}
