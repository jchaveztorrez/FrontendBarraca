import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Rol, Sucursal, Usuario } from '../../../../models/models';
import { ServiceService } from '../../../../services/service.service';
import { OkComponent } from '../../../Mensajes/ok/ok.component';
import { ErrorComponent } from '../../../Mensajes/error/error.component';

@Component({
  selector: 'app-editar-usuario-rol-sucursal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OkComponent,
    ErrorComponent,
  ],
  templateUrl: './editar-usuario-rol-sucursal.component.html',
  styleUrl: './editar-usuario-rol-sucursal.component.css',
})
export class EditarUsuarioRolSucursalComponent implements OnInit {
  form: FormGroup;
  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  sucursales: Sucursal[] = [];

  id!: number; // ID para obtener la relación a editar

  mensajeExito: string = '';
  mensajeError: string = '';
  originalData: any = {};

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      id: [null],
      usuario: ['', Validators.required], // <--- debe ser un ID (número o string)
      rol: ['', Validators.required],
      sucursal: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadUsuarios();
    this.loadRoles();
    this.loadSucursales();
    this.loadRelacion(); // Cargar datos actuales
  }

  loadUsuarios() {
    this.service.getUsuarios().subscribe((data) => (this.usuarios = data));
  }

  loadRoles() {
    this.service.getRoles().subscribe((data) => (this.roles = data));
  }

  loadSucursales() {
    this.service.getSucursales().subscribe((data) => (this.sucursales = data));
  }

  loadRelacion() {
    this.service.getUsuarioRolSucursalID(this.id).subscribe((data) => {
      this.form.patchValue({
        id: data.id,
        usuario: data.usuario.id,
        rol: data.rol.id,
        sucursal: data.sucursal.id,
      });

      // Guardamos los valores originales
      this.originalData = {
        usuario: data.usuario.id,
        rol: data.rol.id,
        sucursal: data.sucursal.id,
      };
    });
  }

  actualizar() {
    if (this.form.valid) {
      const formData = this.form.value;

      // 1. Verificar si no cambió nada
      const noCambio =
        formData.usuario === this.originalData.usuario &&
        formData.rol === this.originalData.rol &&
        formData.sucursal === this.originalData.sucursal;

      if (noCambio) {
        // No cambió nada, actualizar normalmente
        this.enviarActualizacion(formData);
      } else {
        // 2. Verificar si ya existe otro registro con los mismos datos
        this.service.getUsuarioRolSucursal().subscribe((registros) => {
          const existe = registros.some((r: any) => {
            return (
              r.id !== formData.id &&
              r.usuario.id === formData.usuario &&
              r.rol.id === formData.rol &&
              r.sucursal.id === formData.sucursal
            );
          });

          if (existe) {
            this.mensajeError =
              'Ya existe un registro con este Usuario, Rol y Sucursal.';
          } else {
            this.enviarActualizacion(formData);
          }
        });
      }
    }
  }
  enviarActualizacion(formData: any) {
    this.service.updateUsuarioRolSucursal(formData).subscribe({
      next: () => {
        this.mensajeExito = 'Usuario Rol Sucursal actualizado correctamente';
      },
      error: () => {
        this.mensajeError =
          'Error al actualizar el Usuario Rol Sucursal. Intente nuevamente.';
      },
    });
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-usuario-rol-sucursal']);
  }

  limpiarFormulario(): void {
    this.loadRelacion(); // restablece el formulario a su estado original
  }
  manejarOk() {
    this.mensajeExito = '';
    this.router.navigate(['app-panel-control/listar-usuario-rol-sucursal']);
  }

  manejarError() {
    this.mensajeError = '';
  }
}
