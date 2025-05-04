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

@Component({
  selector: 'app-registrar-usuario-rol-sucursal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar-usuario-rol-sucursal.component.html',
  styleUrl: './registrar-usuario-rol-sucursal.component.css',
})
export class RegistrarUsuarioRolSucursalComponent {
  form: FormGroup;
  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  sucursales: Sucursal[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router,
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
      this.usuarios = data;
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
      this.service.createUsuarioRolSucursal(this.form.value).subscribe({
        next: () => {
          alert('Usuario Rol Sucursal registrado correctamente');
          this.router.navigate([
            'app-panel-control/listar-usuario-rol-sucursal',
          ]);
        },
        error: () => {
          alert('Error al registrar el Usuario Rol Sucursal');
        },
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
}
