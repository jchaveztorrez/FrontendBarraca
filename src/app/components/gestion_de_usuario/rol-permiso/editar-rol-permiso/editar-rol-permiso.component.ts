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
import { Rol, Permiso } from '../../../../models/models';
import { ServiceService } from '../../../../services/service.service';

@Component({
  selector: 'app-editar-rol-permiso',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-rol-permiso.component.html',
  styleUrl: './editar-rol-permiso.component.css',
})
export class EditarRolPermisoComponent implements OnInit {
  form: FormGroup;
  roles: Rol[] = [];
  permisos: Permiso[] = [];
  id!: number;

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      id: [null],
      rol: ['', Validators.required], // debe enviarse el ID
      permiso: ['', Validators.required], // debe enviarse el ID
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadRoles();
    this.loadPermisos();
    this.loadRelacion();
  }

  loadRoles() {
    this.service.getRoles().subscribe((data) => (this.roles = data));
  }

  loadPermisos() {
    this.service.getPermisos().subscribe((data) => (this.permisos = data));
  }

  loadRelacion() {
    this.service.getRolPermisoID(this.id).subscribe((data) => {
      this.form.patchValue({
        id: data.id,
        rol: data.rol.id,
        permiso: data.permiso.id,
      });
    });
  }

  actualizar() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.service.updateRolPermiso(formData).subscribe({
        next: () => {
          alert('Rol-Permiso actualizado correctamente');
          this.router.navigate(['app-panel-control/listar-rol-permiso']);
        },
        error: () => alert('Error al actualizar el Rol-Permiso'),
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-rol-permiso']);
  }

  limpiarFormulario(): void {
    this.loadRelacion();
  }
}
