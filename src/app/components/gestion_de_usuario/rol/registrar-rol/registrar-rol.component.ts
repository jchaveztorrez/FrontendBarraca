import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-rol',
  imports: [CommonModule],
  templateUrl: './registrar-rol.component.html',
  styleUrl: './registrar-rol.component.css',
})
export class RegistrarRolComponent {
  constructor(private router: Router) {}

  registrar(): void {
    this.router.navigate(['/app-panel-control/listar-rol']);
  }

  cancelar(): void {
    this.router.navigate(['/app-panel-control/listar-rol']);
  }
}
