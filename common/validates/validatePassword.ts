function getPasswordError(value: string): string | null {
  if (value.length < 4) {
    return "Sua senha precisa ter no mínimo 4 caracteres";
  }
  if ((value.match(/[A-Z]/g) || []).length < 1) {
    return "Sua senha precisa ter no mínimo 1 letra maiúscula";
  }
  if ((value.match(/[^a-z]/gi) || []).length < 1) {
    return "Sua senha precisa ter no mínimo 1 caractere especial";
  }
  return null;
};
export default getPasswordError;