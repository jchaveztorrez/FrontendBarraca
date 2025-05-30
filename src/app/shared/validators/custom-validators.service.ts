// src/app/shared/validators/custom-validators.service.ts
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor() {}

  soloTexto(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      return regex.test(control.value) ? null : { soloTexto: true };
    };
  }

  direccionValida(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#-]+$/;
      return regex.test(control.value) ? null : { direccionInvalida: true };
    };
  }
}
