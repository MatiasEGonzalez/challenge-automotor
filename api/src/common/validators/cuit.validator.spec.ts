import { isCuitValid } from './cuit.validator';

describe('isCuitValid', () => {
  it('debe aceptar CUIT válido', () => {
    expect(isCuitValid('20329642365')).toBe(true); // CUIT que sabemos que pasa
  });

  it('debe rechazar formato inválido', () => {
    expect(isCuitValid('123')).toBe(false);
    expect(isCuitValid('ABCDEFGHIJK')).toBe(false);
    expect(isCuitValid('')).toBe(false);
    expect(isCuitValid(null as any)).toBe(false);
  });

  it('debe rechazar dígito verificador incorrecto', () => {
    expect(isCuitValid('20329642367')).toBe(false); // dígito incorrecto (debería ser 5)
    expect(isCuitValid('20329642368')).toBe(false); // dígito incorrecto (debería ser 5)
  });

  it('debe rechazar CUIT con longitud incorrecta', () => {
    expect(isCuitValid('2032964236')).toBe(false); // 10 dígitos
    expect(isCuitValid('203296423650')).toBe(false); // 12 dígitos
  });
});
