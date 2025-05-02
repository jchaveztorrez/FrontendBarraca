import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-permiso',
  imports: [CommonModule],
  templateUrl: './listar-permiso.component.html',
  styleUrl: './listar-permiso.component.css',
})
export class ListarPermisoComponent {
  permisos = [
    { nombre: 'Permiso A', descripcion: 'Descripción del permiso A' },
    { nombre: 'Permiso B', descripcion: 'Descripción del permiso B' },
  ];

  constructor(private router: Router) {}

  registrarPermiso(): void {
    this.router.navigate(['app-panel-control/registrar-permiso']);
  }

  editarPermiso(permiso: any): void {
    this.router.navigate(['app-panel-control/editar-permiso', 1]); // Usa el ID real si lo tienes
  }
}
