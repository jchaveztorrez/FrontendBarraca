import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../../services/service.service';
import { CustomValidatorsService } from '../../../../shared/validators/custom-validators.service';
import { OkComponent } from '../../../Mensajes/ok/ok.component';
import { ErrorComponent } from '../../../Mensajes/error/error.component';

@Component({
  selector: 'app-registrar-permiso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OkComponent, ErrorComponent],
  templateUrl: './registrar-permiso.component.html',
  styleUrl: './registrar-permiso.component.css',
})
export class RegistrarPermisoComponent {
  form!: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';
  constructor(
    private fb: FormBuilder,
    private permisoService: ServiceService,
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
          Validators.maxLength(20),
          this.customValidators.soloTexto(),
        ],
      ],
      estado: [true],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.permisoService.createPermiso(this.form.value).subscribe({
        next: () => {
          this.mensajeExito = 'Permiso registrado con éxito';
        },
        error: (error) => {
          this.mensajeError = 'Ocurrió un error al registrar el Permiso';
          console.error('Error al registrar Permiso:', error);
        },
      });
    } else {
      this.form.markAllAsTouched(); // <- esto es correcto y necesario
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-permiso']);
  }

  limpiarFormulario(): void {
    this.form.reset({
      id: null,
      nombre: null,
      estado: true,
    });
  }
  manejarOk() {
    this.mensajeExito = '';
    // Moved the navigation here, after the modal is closed
    this.router.navigate(['app-panel-control/listar-permiso']);
  }

  manejarError() {
    this.mensajeError = '';
  }
}
