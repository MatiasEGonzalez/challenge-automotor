export function isDominioValid(dominio: string): boolean {
  if (!dominio || typeof dominio !== 'string') return false;
  
  const dominioUpper = dominio.toUpperCase();
  
  // AAA999 o AA999AA (del XML PCK_AUTOMOTOR.validar_dominio)
  return /^[A-Z]{3}[0-9]{3}$/.test(dominioUpper) || /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/.test(dominioUpper);
}
