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

export function cpfMask(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+$/, '$1');
}

export function validarCPF(cpf: string): boolean {
  const numeros = cpf.replace(/\D/g, '');

  if (numeros.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(numeros)) {
    return false;
  }

  let somaDigitoUm = 0;

  for (let i = 0; i < 9; i++) {
    somaDigitoUm += Number(numeros[i]) * (10 - i);
  }

  let resto = (somaDigitoUm * 10) % 11;
  const digito1 = resto === 10 ? 0 : resto;

  if (digito1 !== Number(numeros[9])) {
    return false;
  }

  let somaDigitoDois = 0;

  for (let i = 0; i < 10; i++) {
    somaDigitoDois += Number(numeros[i]) * (11 - i);
  }

  resto = (somaDigitoDois * 10) % 11;
  const digito2 = resto === 10 ? 0 : resto;

  return digito2 === Number(numeros[10]);
}
