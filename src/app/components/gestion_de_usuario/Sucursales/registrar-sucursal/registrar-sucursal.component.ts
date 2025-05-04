import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../../services/service.service';

@Component({
  selector: 'app-registrar-sucursal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-sucursal.component.html',
  styleUrl: './registrar-sucursal.component.css',
})
export class RegistrarSucursalComponent {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private sucursalService: ServiceService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      direccion: [null, Validators.required],
      estado: [true, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.sucursalService.createSucursal(this.form.value).subscribe(() => {
        this.router.navigate(['app-panel-control/listar-sucursal']);
      });
    }
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
}
