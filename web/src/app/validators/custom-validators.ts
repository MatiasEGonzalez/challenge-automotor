import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  
  static cuitValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cuit = control.value;
      if (!cuit) return null;

      // Solo 11 dígitos
      if (!/^\d{11}$/.test(cuit)) {
        return { cuitInvalid: { message: 'CUIT debe tener 11 dígitos' } };
      }

      // Algoritmo módulo 11
      const coeficientes = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
      let suma = 0;
      
      for (let i = 0; i < 10; i++) {
        suma += parseInt(cuit[i]) * coeficientes[i];
      }
      
      let digitoVerificador = 11 - (suma % 11);
      if (digitoVerificador === 11) digitoVerificador = 0;
      if (digitoVerificador === 10) return { cuitInvalid: { message: 'CUIT inválido' } };
      
      return digitoVerificador === parseInt(cuit[10]) ? null : { cuitInvalid: { message: 'CUIT inválido' } };
    };
  }

  static dominioValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dominio = control.value;
      if (!dominio) return null;

      const dominioUpper = dominio.toUpperCase();
      const valid = /^[A-Z]{3}[0-9]{3}$/.test(dominioUpper) || /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/.test(dominioUpper);
      
      return valid ? null : { dominioInvalid: { message: 'Formato: AAA999 o AA999AA' } };
    };
  }

  static fechaFabricacionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fecha = control.value;
      if (!fecha) return null;

      const fechaStr = fecha.toString();
      if (!/^\d{6}$/.test(fechaStr)) {
        return { fechaInvalid: { message: 'Formato: YYYYMM (6 dígitos)' } };
      }

      const año = parseInt(fechaStr.substring(0, 4));
      const mes = parseInt(fechaStr.substring(4, 6));

      if (año < 1900 || mes < 1 || mes > 12) {
        return { fechaInvalid: { message: 'Fecha inválida' } };
      }

      // No puede ser futuro
      const ahora = new Date();
      const añoActual = ahora.getFullYear();
      const mesActual = ahora.getMonth() + 1;

      if (año > añoActual || (año === añoActual && mes > mesActual)) {
        return { fechaInvalid: { message: 'No puede ser fecha futura' } };
      }

      return null;
    };
  }
}
