import { isYYYYMMValid } from './fecha-fabricacion.validator';

describe('isYYYYMMValid', () => {
  it('debe aceptar fechas válidas', () => {
    expect(isYYYYMMValid(202001)).toBe(true);
    expect(isYYYYMMValid(199912)).toBe(true);
  });

  it('debe rechazar año anterior a 1900', () => {
    expect(isYYYYMMValid(189912)).toBe(false);
  });

  it('debe rechazar mes inválido', () => {
    expect(isYYYYMMValid(202000)).toBe(false);
    expect(isYYYYMMValid(202013)).toBe(false);
  });

  it('debe rechazar fecha futura', () => {
    const nextYear = new Date().getFullYear() + 1;
    expect(isYYYYMMValid(parseInt(`${nextYear}01`))).toBe(false);
  });

  it('debe rechazar formato inválido', () => {
    expect(isYYYYMMValid(20201)).toBe(false); // 5 dígitos
    expect(isYYYYMMValid(2020123)).toBe(false); // 7 dígitos
    expect(isYYYYMMValid(null)).toBe(false);
  });
});
