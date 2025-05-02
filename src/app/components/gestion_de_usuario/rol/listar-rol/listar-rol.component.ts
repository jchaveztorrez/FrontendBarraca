import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-rol',
  imports: [CommonModule],
  templateUrl: './listar-rol.component.html',
  styleUrl: './listar-rol.component.css',
})
export class ListarRolComponent {
  roles = [
    { nombre: 'Administrador', descripcion: 'Acceso total al sistema' },
    { nombre: 'Supervisor', descripcion: 'Acceso limitado a reportes' },
  ];

  constructor(private router: Router) {}

  registrarRol(): void {
    this.router.navigate(['app-panel-control/registrar-rol']);
  }

  editarRol(rol: any): void {
    this.router.navigate(['app-panel-control/editar-rol', 1]);
  }
}
