function validateDocument(cpf: string): string | null {
  if (!cpf) return "CPF vazio";

  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    return "CPF deve conter 11 dígitos";
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return "CPF inválido";
  }
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) {
    return "CPF inválido";
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) {
    return "CPF inválido";
  }

  return null; // CPF válido
}
export default validateDocument;
