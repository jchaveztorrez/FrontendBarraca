import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../../services/service.service';
import { OkComponent } from '../../../Mensajes/ok/ok.component';
import { ErrorComponent } from '../../../Mensajes/error/error.component';
import { CustomValidatorsService } from '../../../../shared/validators/custom-validators.service';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OkComponent, ErrorComponent],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css',
})
export class EditarCategoriaComponent implements OnInit {
  form!: FormGroup;
  categoriaOriginal: any;

  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: ServiceService,
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
      descripcion: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.customValidators.soloTexto(),
        ],
      ],
      estado: [true, Validators.required],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoriaService.getCategoriaById(id).subscribe((data) => {
      this.categoriaOriginal = data;
      this.form.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.form.value.id;
      this.categoriaService.actualizarCategoria(id, this.form.value).subscribe({
        next: () => {
          this.mensajeExito = 'Categoría actualizada correctamente';
        },
        error: (error) => {
          this.mensajeError =
            'Error al actualizar la categoría:' + error.message;
        },
      });
    } else {
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-categoria']);
  }
  restablecerFormulario(): void {
    if (this.categoriaOriginal) {
      this.form.patchValue(this.categoriaOriginal);
    }
  }
  manejarOk() {
    this.mensajeExito = '';
    this.router.navigate(['app-panel-control/listar-categoria']);
  }
  manejarError() {
    this.mensajeError = '';
  }
}
