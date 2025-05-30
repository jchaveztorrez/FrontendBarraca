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
  selector: 'app-editar-sucursal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OkComponent, ErrorComponent],
  templateUrl: './editar-sucursal.component.html',
  styleUrl: './editar-sucursal.component.css',
})
export class EditarSucursalComponent implements OnInit {
  form!: FormGroup;
  sucursalOriginal: any;
  errorModal: string = '';
  okModal: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sucursalService: ServiceService,
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
      estado: [true, Validators.required],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sucursalService.getSucursalID(id).subscribe((data) => {
      this.sucursalOriginal = data;
      this.form.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.sucursalService.updateSucursal(this.form.value).subscribe({
        next: () => {
          this.okModal = 'Sucursal editada con éxito';
        },
        error: () => {
          this.errorModal = 'Error al editar la sucursal';
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

  restablecerFormulario(): void {
    if (this.sucursalOriginal) {
      this.form.patchValue(this.sucursalOriginal);
    }
  }

  manejarOk() {
    this.okModal = '';
    this.router.navigate(['app-panel-control/listar-sucursal']);
  }

  manejarError() {
    this.errorModal = '';
  }
}
