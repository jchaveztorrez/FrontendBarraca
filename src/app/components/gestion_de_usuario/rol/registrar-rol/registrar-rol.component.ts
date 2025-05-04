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

@Component({
  selector: 'app-registrar-rol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-rol.component.html',
  styleUrl: './registrar-rol.component.css',
})
export class RegistrarRolComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rolService: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.rolService.createRol(this.form.value).subscribe(() => {
        this.router.navigate(['app-panel-control/listar-rol']);
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-rol']);
  }

  limpiarFormulario(): void {
    this.form.reset({
      id: null,
      nombre: null,
    });
  }
}
