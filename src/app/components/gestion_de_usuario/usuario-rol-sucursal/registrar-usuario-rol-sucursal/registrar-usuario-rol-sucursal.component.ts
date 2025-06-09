import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rol, Sucursal, Usuario } from '../../../../models/models';
import { ServiceService } from '../../../../services/service.service';
import { Router } from '@angular/router';
import { OkComponent } from '../../../Mensajes/ok/ok.component';
import { ErrorComponent } from '../../../Mensajes/error/error.component';
import { CustomValidatorsService } from '../../../../shared/validators/custom-validators.service';

@Component({
  selector: 'app-registrar-usuario-rol-sucursal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OkComponent,
    ErrorComponent,
  ],
  templateUrl: './registrar-usuario-rol-sucursal.component.html',
  styleUrl: './registrar-usuario-rol-sucursal.component.css',
})
export class RegistrarUsuarioRolSucursalComponent {
  form: FormGroup;
  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  sucursales: Sucursal[] = [];

  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router,
    private customValidators: CustomValidatorsService,
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      rol: ['', Validators.required],
      sucursal: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadRoles();
    this.loadSucursales();
  }

  loadUsuarios() {
    this.service.getUsuarios().subscribe((data) => {
      this.usuarios = data.filter((u) => u.estado); // solo usuarios activos
    });
  }

  loadRoles() {
    this.service.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  loadSucursales() {
    this.service.getSucursales().subscribe((data) => {
      this.sucursales = data;
    });
  }

  registrar(): void {
    if (this.form.valid) {
      const usuarioSeleccionado: Usuario = this.form.value.usuario;

      this.service.getUsuarioRolSucursal().subscribe((asignaciones) => {
        const existe = asignaciones.some(
          (asig: any) => asig.usuario.id === usuarioSeleccionado.id,
        );

        if (existe) {
          this.mensajeError =
            'Este usuario ya tiene asignado un rol y una sucursal.';
        } else {
          this.service.createUsuarioRolSucursal(this.form.value).subscribe({
            next: () => {
              this.mensajeExito =
                'Usuario Rol Sucursal registrado correctamente';
            },
            error: () => {
              this.mensajeError = 'Error al registrar el Usuario Rol Sucursal';
            },
          });
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-usuario-rol-sucursal']);
  }

  limpiarFormulario(): void {
    this.form.reset({
      usuario: null,
      rol: null,
      sucursal: null,
    });
  }
  manejarOk() {
    this.mensajeExito = '';
    this.router.navigate(['app-panel-control/listar-usuario-rol-sucursal']);
  }

  manejarError() {
    this.mensajeError = '';
  }
}
