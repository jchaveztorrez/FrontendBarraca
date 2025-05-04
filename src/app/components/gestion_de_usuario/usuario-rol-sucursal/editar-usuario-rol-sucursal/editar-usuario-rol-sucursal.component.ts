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

@Component({
  selector: 'app-editar-usuario-rol-sucursal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-usuario-rol-sucursal.component.html',
  styleUrl: './editar-usuario-rol-sucursal.component.css',
})
export class EditarUsuarioRolSucursalComponent implements OnInit {
  form: FormGroup;
  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  sucursales: Sucursal[] = [];

  id!: number; // ID para obtener la relación a editar

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
        usuario: data.usuario.id, // Solo el ID
        rol: data.rol.id, // Solo el ID
        sucursal: data.sucursal.id, // Solo el ID
      });
    });
  }

  actualizar() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.service.updateUsuarioRolSucursal(formData).subscribe({
        next: () => {
          alert('Actualizado correctamente');
          this.router.navigate([
            'app-panel-control/listar-usuario-rol-sucursal',
          ]);
        },
        error: () => alert('Error al actualizar'),
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-usuario-rol-sucursal']);
  }

  limpiarFormulario(): void {
    this.loadRelacion(); // restablece el formulario a su estado original
  }
}
