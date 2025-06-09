import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService } from '../../../../services/service.service';
import { OkComponent } from '../../../Mensajes/ok/ok.component';
import { ErrorComponent } from '../../../Mensajes/error/error.component';
import { CustomValidatorsService } from '../../../../shared/validators/custom-validators.service';

@Component({
  selector: 'app-registrar-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OkComponent, ErrorComponent],
  templateUrl: './registrar-categoria.component.html',
  styleUrl: './registrar-categoria.component.css',
})
export class RegistrarCategoriaComponent {
  form!: FormGroup;

  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private categoriaService: ServiceService,
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
          this.customValidators.formatoEspecie(),
          this.customValidators.limpiarEspaciosValidator(),
        ],
      ],
      descripcion: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          this.customValidators.soloTexto(),
        ],
      ],
      estado: [true],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.categoriaService.crearCategoria(this.form.value).subscribe({
        next: () => {
          this.mensajeExito = 'Categoria registrado con éxito';
        },
        error: (error) => {
          (this.mensajeError = 'Ocurrió un error al registrar el Categoria'),
            error.message;
        },
      });
    } else {
      this.form.markAllAsTouched(); // <- esto es correcto y necesario
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-categoria']);
  }

  limpiarFormulario(): void {
    this.form.reset({
      id: null,
      nombre: null,
      descripcion: null,
      estado: true,
    });
  }
  manejarOk() {
    this.mensajeExito = '';
    this.router.navigate(['app-panel-control/listar-categoria']);
  }

  manejarError() {
    this.mensajeError = '';
  }
}
