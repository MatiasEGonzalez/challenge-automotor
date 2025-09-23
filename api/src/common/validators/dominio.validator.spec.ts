import { isDominioValid } from './dominio.validator';

describe('isDominioValid', () => {
  it('debe aceptar formato AAA999', () => {
    expect(isDominioValid('ABC123')).toBe(true);
    expect(isDominioValid('XYZ999')).toBe(true);
  });

  it('debe aceptar formato AA999AA', () => {
    expect(isDominioValid('AB123CD')).toBe(true);
    expect(isDominioValid('XY999ZZ')).toBe(true);
  });

  it('debe aceptar minúsculas (las convierte)', () => {
    expect(isDominioValid('abc123')).toBe(true);
    expect(isDominioValid('ab123cd')).toBe(true);
  });

  it('debe rechazar formatos inválidos', () => {
    expect(isDominioValid('A1B2C3')).toBe(false);
    expect(isDominioValid('ABCD123')).toBe(false);
    expect(isDominioValid('AB12CD')).toBe(false);
    expect(isDominioValid('')).toBe(false);
    expect(isDominioValid(null)).toBe(false);
  });
});
