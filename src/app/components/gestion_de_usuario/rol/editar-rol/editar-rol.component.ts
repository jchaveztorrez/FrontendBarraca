import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-rol',
  imports: [CommonModule],
  templateUrl: './editar-rol.component.html',
  styleUrl: './editar-rol.component.css',
})
export class EditarRolComponent {
  constructor(private router: Router) {}
  Actualizar(): void {
    this.router.navigate(['/app-panel-control/listar-rol']);
  }

  Cancelar(): void {
    this.router.navigate(['/app-panel-control/listar-rol']);
  }
}
