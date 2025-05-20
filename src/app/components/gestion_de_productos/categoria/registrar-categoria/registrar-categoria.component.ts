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

@Component({
  selector: 'app-registrar-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-categoria.component.html',
  styleUrl: './registrar-categoria.component.css',
})
export class RegistrarCategoriaComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriaService: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      estado: [true, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.categoriaService.crearCategoria(this.form.value).subscribe(() => {
        this.router.navigate(['app-panel-control/listar-categoria']);
      });
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
}
