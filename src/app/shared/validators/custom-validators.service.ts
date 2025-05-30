// src/app/shared/validators/custom-validators.service.ts
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ServiceService } from '../../services/service.service'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor(private userService: ServiceService) {}

  // Validator for soloTexto (only text)
  soloTexto(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null; // If the control is empty, return null (valid)
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Regex for only letters and spaces
      return regex.test(control.value) ? null : { soloTexto: true }; // Return error if invalid
    };
  }

  // Validator for direccionValida (valid address)
  direccionValida(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null; // If the control is empty, return null (valid)
      const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#-]+$/; // Regex for valid address characters
      return regex.test(control.value) ? null : { direccionInvalida: true }; // Return error if invalid
    };
  }

  // Validator for name
  validateName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const name = control.value?.trim();
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Regex for only letters and spaces
      if (!name) {
        return { required: true }; // Return error if empty
      }
      return regex.test(name) ? null : { invalidName: true }; // Return error if invalid
    };
  }

  // Validator for surname
  validateSurname(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const surname = control.value?.trim();
      const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#-]+$/; // Regex for valid surname characters
      if (!surname) {
        return { required: true }; // Return error if empty
      }
      return regex.test(surname) ? null : { invalidSurname: true }; // Return error if invalid
    };
  }

  // Validator for date of birth
  validateDateOfBirth(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dateOfBirth = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - dateOfBirth.getFullYear();
      const monthDiff = today.getMonth() - dateOfBirth.getMonth();
      const dayDiff = today.getDate() - dateOfBirth.getDate();
      if (!control.value) {
        return { required: true }; // Return error if empty
      }
      if (
        age < 18 ||
        (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
      ) {
        return { underage: true }; // Return error if underage
      }
      return null; // Return null if valid
    };
  }

  // Validator for phone number
  async validatePhone(): Promise<ValidatorFn> {
    return async (
      control: AbstractControl,
    ): Promise<{ [key: string]: any } | null> => {
      const phone = control.value?.trim();
      const regex = /^[67][0-9]{7}$/; // Regex for valid phone number
      if (!phone) {
        return { required: true }; // Return error if empty
      }
      if (!regex.test(phone)) {
        return { invalidPhone: true }; // Return error if invalid
      }
      const users = await this.userService.getUsuarios().toPromise();
      if (users) {
        const phoneExists = users.some((user) => user.telefono === phone);
        return phoneExists ? { phoneExists: true } : null; // Return error if phone exists
      } else {
        return { userFetchError: true }; // Handle the case where users is undefined
      }
    };
  }

  // Validator for email
  async validateEmail(): Promise<ValidatorFn> {
    return async (
      control: AbstractControl,
    ): Promise<{ [key: string]: any } | null> => {
      const email = control.value?.trim();
      const regex = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/; // Regex for valid email
      if (!email) {
        return { required: true }; // Return error if empty
      }
      if (!regex.test(email)) {
        return { invalidEmail: true }; // Return error if invalid
      }
      const users = await this.userService.getUsuarios().toPromise();
      if (users) {
        const emailExists = users.some((user) => user.correo === email);
        return emailExists ? { emailExists: true } : null; // Return error if email exists
      } else {
        return { userFetchError: true }; // Handle the case where users is undefined
      }
    };
  }

  // Validator for password
  validatePassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      const errors: string[] = [];
      if (!password) {
        errors.push('El campo de contraseña no puede estar vacío'); // Error if empty
      }
      if (password.length < 8) {
        errors.push('Debe tener al menos 8 caracteres'); // Error if too short
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Debe contener al menos una letra mayúscula'); // Error if no uppercase
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Debe contener al menos una letra minúscula'); // Error if no lowercase
      }
      if (!/\d/.test(password)) {
        errors.push('Debe contener al menos un número'); // Error if no number
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Debe contener al menos un carácter especial'); // Error if no special character
      }
      return errors.length > 0 ? { passwordErrors: errors } : null; // Return errors if any
    };
  }

  // Validator for ID card
  async validateCI(): Promise<ValidatorFn> {
    return async (
      control: AbstractControl,
    ): Promise<{ [key: string]: any } | null> => {
      const ci = control.value?.trim();
      if (!ci) {
        return { required: true }; // Return error if empty
      }
      if (ci.length < 7 || ci.length > 8) {
        return { invalidCI: true }; // Return error if invalid length
      }
      const users = await this.userService.getUsuarios().toPromise();
      if (users) {
        const ciExists = users.some((user) => user.ci === ci);
        return ciExists ? { ciExists: true } : null; // Return error if CI exists
      } else {
        return { userFetchError: true }; // Handle the case where users is undefined
      }
    };
  }
}
