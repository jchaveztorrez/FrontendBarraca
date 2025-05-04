import { Component, OnInit } from '@angular/core';
import { RolPermiso } from '../../../../models/models';
import { ServiceService } from '../../../../services/service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-rol-permiso',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-rol-permiso.component.html',
  styleUrl: './listar-rol-permiso.component.css',
})
export class ListarRolPermisoComponent implements OnInit {
  usuarioRolSucursales: RolPermiso[] = [];
  filtrados: RolPermiso[] = [];
  mostrados: RolPermiso[] = [];
  busqueda = '';
  limite = 10;
  constructor(
    private servicio: ServiceService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.servicio.getRolPermiso().subscribe((data) => {
      this.usuarioRolSucursales = data;
      this.filtrar();
    });
  }
  actualizarMostrados(): void {
    this.mostrados = this.filtrados.slice(0, this.limite);
  }
  onScroll(event: Event): void {
    const div = event.target as HTMLElement;
    const alFinal = div.scrollTop + div.clientHeight >= div.scrollHeight - 5;
    if (alFinal) {
      this.limite += 10;
      this.actualizarMostrados();
    }
  }
  filtrar(): void {
    const texto = this.busqueda.trim().toLowerCase();
    this.filtrados = this.usuarioRolSucursales.filter((urs) =>
      urs.rol.nombre.toLowerCase().includes(texto),
    );
    this.limite = 10;
    this.actualizarMostrados();
  }
  irAEditar(id: number): void {
    this.router.navigate(['app-panel-control/editar-rol-permiso', id]);
  }
  irARegistrar(): void {
    this.router.navigate(['app-panel-control/registrar-rol-permiso']);
  }
}
