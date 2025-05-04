import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rol, Permiso } from '../../../../models/models';
import { ServiceService } from '../../../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-rol-permiso',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar-rol-permiso.component.html',
  styleUrl: './registrar-rol-permiso.component.css',
})
export class RegistrarRolPermisoComponent {
  form: FormGroup;
  roles: Rol[] = [];
  permisos: Permiso[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      rol: ['', Validators.required], // Será rol_id (número)
      permiso: ['', Validators.required], // Será permiso_id (número)
    });
  }

  ngOnInit(): void {
    this.loadRoles();
    this.loadPermisos();
  }

  loadRoles(): void {
    this.service.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  loadPermisos(): void {
    this.service.getPermisos().subscribe((data) => {
      this.permisos = data;
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.service.createRolPermiso(this.form.value).subscribe({
        next: () => {
          alert('Rol-Permiso registrado correctamente');
          this.router.navigate(['app-panel-control/listar-rol-permiso']);
        },
        error: () => {
          alert('Error al registrar el Rol-Permiso');
        },
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-rol-permiso']);
  }

  limpiarFormulario(): void {
    this.form.reset({
      rol: null,
      permiso: null,
    });
  }
}
