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
import { OkComponent } from '../../../Mensajes/ok/ok.component';
import { ErrorComponent } from '../../../Mensajes/error/error.component';

@Component({
  selector: 'app-registrar-rol-permiso',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OkComponent,
    ErrorComponent,
  ],
  templateUrl: './registrar-rol-permiso.component.html',
  styleUrl: './registrar-rol-permiso.component.css',
})
export class RegistrarRolPermisoComponent {
  form: FormGroup;
  roles: Rol[] = [];
  permisos: Permiso[] = [];

  mensajeExito: string = '';
  mensajeError: string = '';
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
      this.roles = data.filter((r) => r.estado); // Solo roles activos
    });
  }

  loadPermisos(): void {
    this.service.getPermisos().subscribe((data) => {
      this.permisos = data.filter((p) => p.estado); // Solo permisos activos
    });
  }

  registrar(): void {
    if (this.form.valid) {
      const rolId = this.form.value.rol;
      const permisoId = this.form.value.permiso;
      // Verificar si ya existe la relación rol-permiso
      this.service.getRolPermiso().subscribe((data) => {
        const existe = data.some(
          (rp) => rp.rol.id === rolId && rp.permiso.id === permisoId,
        );

        if (existe) {
          this.mensajeError = 'Rol-Permiso ya registrado.';
        } else {
          // Si no existe, se crea la relación
          this.service.createRolPermiso(this.form.value).subscribe({
            next: () => {
              this.mensajeExito = 'Rol-Permiso registrado correctamente.';
            },
            error: () => {
              this.mensajeError = 'Error al registrar el Rol-Permiso.';
            },
          });
        }
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
  manejarOk() {
    this.mensajeExito = '';
    this.router.navigate(['app-panel-control/listar-rol-permiso']);
  }

  manejarError() {
    this.mensajeError = '';
  }
}
