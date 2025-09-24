export function isYYYYMMValid(fecha: number): boolean {
  if (!fecha || typeof fecha !== 'number') return false;
  
  const fechaStr = fecha.toString();
  if (fechaStr.length !== 6) return false;
  
  const año = parseInt(fechaStr.substring(0, 4));
  const mes = parseInt(fechaStr.substring(4, 6));
  
  // Validaciones básicas (del XML PCK_AUTOMOTOR.validar_fabricacion)
  if (año < 1900 || mes < 1 || mes > 12) return false;
  
  // No puede ser futuro
  const ahora = new Date();
  const añoActual = ahora.getFullYear();
  const mesActual = ahora.getMonth() + 1;
  
  if (año > añoActual) return false;
  if (año === añoActual && mes > mesActual) return false;
  
  return true;
}
