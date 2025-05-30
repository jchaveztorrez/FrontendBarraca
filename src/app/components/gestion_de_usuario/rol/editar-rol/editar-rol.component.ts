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
  selector: 'app-editar-rol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OkComponent, ErrorComponent],
  templateUrl: './editar-rol.component.html',
  styleUrl: './editar-rol.component.css',
})
export class EditarRolComponent implements OnInit {
  form!: FormGroup;
  rolOriginal: any;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rolService: ServiceService,
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
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rolService.getRolID(id).subscribe((data) => {
      this.rolOriginal = data;
      this.form.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.rolService.updateRol(this.form.value).subscribe({
        next: () => {
          this.mensajeExito = 'Rol editado con éxito';
        },
        error: (error) => {
          this.mensajeError = 'Ocurrió un error al editar el rol';
          console.error('Error al editar rol:', error);
        },
      });
    } else {
      this.form.markAllAsTouched(); // <- esto es correcto y necesario
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-rol']);
  }

  restablecerFormulario(): void {
    if (this.rolOriginal) {
      this.form.patchValue(this.rolOriginal);
    }
  }
  manejarOk() {
    this.mensajeExito = '';
    // Moved the navigation here, after the modal is closed
    this.router.navigate(['app-panel-control/listar-rol']);
  }

  manejarError() {
    this.mensajeError = '';
  }
}
