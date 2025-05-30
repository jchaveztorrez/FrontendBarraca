// registrar-sucursal.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../../services/service.service';
import { CustomValidatorsService } from '../../../../shared/validators/custom-validators.service';
import { OkComponent } from '../../../Mensajes/ok/ok.component';
import { ErrorComponent } from '../../../Mensajes/error/error.component';

@Component({
  selector: 'app-registrar-sucursal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OkComponent, ErrorComponent],
  templateUrl: './registrar-sucursal.component.html',
  styleUrl: './registrar-sucursal.component.css',
})
export class RegistrarSucursalComponent {
  form!: FormGroup;
  errorModal: string = '';
  okModal: string = '';

  constructor(
    private fb: FormBuilder,
    private sucursalService: ServiceService,
    private router: Router,
    private customValidators: CustomValidatorsService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.customValidators.soloTexto(),
        ],
      ],
      direccion: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          this.customValidators.direccionValida(),
        ],
      ],
      estado: [true],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.sucursalService.createSucursal(this.form.value).subscribe({
        next: () => {
          this.okModal = 'Sucursal registrada con éxito';
          // Removed the immediate navigation here
        },
        error: () => {
          this.errorModal = 'Error al registrar la sucursal';
        },
      });
    } else {
      this.markAllAsTouched();
    }
  }

  markAllAsTouched(): void {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-sucursal']);
  }

  limpiarFormulario(): void {
    this.form.reset({
      id: null,
      nombre: null,
      direccion: null,
      estado: true,
    });
  }

  manejarOk() {
    this.okModal = '';
    // Moved the navigation here, after the modal is closed
    this.router.navigate(['app-panel-control/listar-sucursal']);
  }

  manejarError() {
    this.errorModal = '';
  }
}
