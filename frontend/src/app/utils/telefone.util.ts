function formatTelefoneComDigitoExtra(telefone: string): string {
  const digits = telefone.replace(/\D/g, '').slice(0, 11);

  return digits.replace(/^(\d{2})(\d)(\d{4})(\d{4})$/, '($1) $2 $3-$4');
}

function formatTelefoneSemDigitoExtra(telefone: string): string {
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

export function phoneMask(value: string): string {
  const numeric = value.replace(/\D/g, '');

  // Se tiver mais de 10 dígitos, assume telefone com 9º dígito: (XX) 9XXXX-XXXX
  if (numeric.length > 10) {
    return numeric
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+$/, '$1');
  }

  // Telefone tradicional com 8 dígitos: (XX) XXXX-XXXX
  return numeric
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+$/, '$1');
}
