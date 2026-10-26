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
  const telefone = value.replace(/\D/g, '');

  if (telefone.length === 11) {
    return formatTelefoneComDigitoExtra(telefone);
  }

  return formatTelefoneSemDigitoExtra(telefone);
}
