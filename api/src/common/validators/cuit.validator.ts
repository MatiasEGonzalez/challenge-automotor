export function isCuitValid(cuit: string): boolean {
  if (!cuit || typeof cuit !== 'string') return false;
  
  // Solo 11 dígitos
  if (!/^\d{11}$/.test(cuit)) return false;
  
  // Algoritmo módulo 11 (del XML PCK_AUTOMOTOR.es_cuit_valido)
  const coeficientes = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let suma = 0;
  
  for (let i = 0; i < 10; i++) {
    suma += parseInt(cuit[i]) * coeficientes[i];
  }
  
  let digitoVerificador = 11 - (suma % 11);
  if (digitoVerificador === 11) digitoVerificador = 0;
  
  // Si da 10, es inválido (como en el original)
  if (digitoVerificador === 10) return false;
  
  return digitoVerificador === parseInt(cuit[10]);
}
