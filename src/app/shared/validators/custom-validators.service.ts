// src/app/shared/validators/custom-validators.service.ts
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ServiceService } from '../../services/service.service'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor(private userService: ServiceService) {}

  // Validador para permitir solo texto (letras y espacios)
  soloTexto(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null; // Si el campo está vacío, es válido
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Solo letras (mayúsculas y minúsculas) y espacios
      return regex.test(control.value) ? null : { soloTexto: true }; // Devuelve error si no cumple
    };
  }

  // Validador para dirección (letras, números y algunos caracteres especiales)
  direccionValida(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null; // Campo vacío es válido
      const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#-]+$/; // Permite letras, números y caracteres comunes en direcciones
      return regex.test(control.value) ? null : { direccionInvalida: true }; // Devuelve error si es inválido
    };
  }

  // Validador personalizado para nombres (solo letras y espacios, obligatorio)
  validateName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const name = control.value?.trim(); // Elimina espacios en blanco
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!name) {
        return { required: true }; // Si está vacío, es requerido
      }
      return regex.test(name) ? null : { invalidName: true }; // Devuelve error si el nombre no es válido
    };
  }

  // Validador personalizado para apellidos (permite letras, números y algunos símbolos, obligatorio)
  validateSurname(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const surname = control.value?.trim();
      const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#-]+$/;
      if (!surname) {
        return { required: true }; // Campo obligatorio
      }
      return regex.test(surname) ? null : { invalidSurname: true }; // Error si no coincide con el patrón
    };
  }

  // Validador para verificar que el usuario tenga al menos 18 años
  validateDateOfBirth(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dateOfBirth = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - dateOfBirth.getFullYear();
      const monthDiff = today.getMonth() - dateOfBirth.getMonth();
      const dayDiff = today.getDate() - dateOfBirth.getDate();
      if (!control.value) {
        return { required: true }; // Campo obligatorio
      }
      // Comprueba si el usuario tiene menos de 18 años
      if (
        age < 18 ||
        (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
      ) {
        return { underage: true }; // Error si es menor de edad
      }
      return null; // Válido si tiene 18 años o más
    };
  }

  // Validador asincrónico para número de teléfono (formato y unicidad)
  async validatePhone(): Promise<ValidatorFn> {
    return async (
      control: AbstractControl,
    ): Promise<{ [key: string]: any } | null> => {
      const phone = control.value?.trim();
      const regex = /^[67][0-9]{7}$/; // Comienza con 6 o 7 y tiene 8 dígitos
      if (!phone) {
        return { required: true }; // Campo obligatorio
      }
      if (!regex.test(phone)) {
        return { invalidPhone: true }; // Error de formato
      }
      const users = await this.userService.getUsuarios().toPromise();
      if (users) {
        const phoneExists = users.some((user) => user.telefono === phone);
        return phoneExists ? { phoneExists: true } : null; // Error si ya existe
      } else {
        return { userFetchError: true }; // Error al obtener usuarios
      }
    };
  }

  // Validador asincrónico para correo electrónico (formato y unicidad)
  async validateEmail(): Promise<ValidatorFn> {
    return async (
      control: AbstractControl,
    ): Promise<{ [key: string]: any } | null> => {
      const email = control.value?.trim();
      const regex = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/; // Solo acepta estos dominios
      if (!email) {
        return { required: true }; // Campo obligatorio
      }
      if (!regex.test(email)) {
        return { invalidEmail: true }; // Error de formato
      }
      const users = await this.userService.getUsuarios().toPromise();
      if (users) {
        const emailExists = users.some((user) => user.correo === email);
        return emailExists ? { emailExists: true } : null; // Error si ya existe
      } else {
        return { userFetchError: true }; // Error al obtener usuarios
      }
    };
  }

  // Validador para contraseña segura (mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial)
  validatePassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      const errors: string[] = [];
      if (!password) {
        errors.push('El campo de contraseña no puede estar vacío');
      }
      if (password.length < 8) {
        errors.push('Debe tener al menos 8 caracteres');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Debe contener al menos una letra mayúscula');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Debe contener al menos una letra minúscula');
      }
      if (!/\d/.test(password)) {
        errors.push('Debe contener al menos un número');
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Debe contener al menos un carácter especial');
      }
      return errors.length > 0 ? { passwordErrors: errors } : null; // Retorna los errores si hay
    };
  }

  // Validador asincrónico para Cédula de Identidad (longitud válida y unicidad)
  async validateCI(): Promise<ValidatorFn> {
    return async (
      control: AbstractControl,
    ): Promise<{ [key: string]: any } | null> => {
      const ci = control.value?.trim();
      if (!ci) {
        return { required: true }; // Campo obligatorio
      }
      if (ci.length < 7 || ci.length > 8) {
        return { invalidCI: true }; // Longitud inválida
      }
      const users = await this.userService.getUsuarios().toPromise();
      if (users) {
        const ciExists = users.some((user) => user.ci === ci);
        return ciExists ? { ciExists: true } : null; // Error si ya existe
      } else {
        return { userFetchError: true }; // Error al obtener usuarios
      }
    };
  }
}
