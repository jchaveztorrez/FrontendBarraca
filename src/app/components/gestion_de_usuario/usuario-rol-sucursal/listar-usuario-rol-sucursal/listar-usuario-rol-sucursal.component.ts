import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../../../services/service.service';
import { UsuarioRolSucursal } from '../../../../models/models';

@Component({
  selector: 'app-listar-usuario-rol-sucursal',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-usuario-rol-sucursal.component.html',
  styleUrls: ['./listar-usuario-rol-sucursal.component.css'],
})
export class ListarUsuarioRolSucursalComponent implements OnInit {
  usuarioRolSucursales: UsuarioRolSucursal[] = [];
  filtrados: UsuarioRolSucursal[] = [];
  mostrados: UsuarioRolSucursal[] = [];

  busqueda = '';
  limite = 20;

  rolesDisponibles: string[] = [];
  sucursalesDisponibles: string[] = [];

  rolSeleccionado = '';
  sucursalSeleccionada = '';

  constructor(
    private servicio: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.servicio.getUsuarioRolSucursal().subscribe((data) => {
      this.usuarioRolSucursales = data;
      this.rolesDisponibles = [...new Set(data.map((urs) => urs.rol.nombre))];
      this.sucursalesDisponibles = [
        ...new Set(data.map((urs) => urs.sucursal.nombre)),
      ];
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
      urs.usuario.nombre.toLowerCase().includes(texto),
    );
    this.limite = 10;
    this.actualizarMostrados();

    this.filtrados = this.usuarioRolSucursales.filter(
      (urs) =>
        urs.usuario.nombre.toLowerCase().includes(texto) &&
        (this.rolSeleccionado === '' ||
          urs.rol.nombre === this.rolSeleccionado) &&
        (this.sucursalSeleccionada === '' ||
          urs.sucursal.nombre === this.sucursalSeleccionada),
    );
    this.limite = 10;
    this.actualizarMostrados();
  }

  irAEditar(id: number): void {
    this.router.navigate(['app-panel-control/editar-usuario-rol-sucursal', id]);
  }

  irARegistrar(): void {
    this.router.navigate(['app-panel-control/registrar-usuario-rol-sucursal']);
  }

  // Función para eliminar un registro
  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      this.servicio.deleteUsuarioRolSucursal(id).subscribe({
        next: () => {
          alert('Registro eliminado correctamente');
          this.usuarioRolSucursales = this.usuarioRolSucursales.filter(
            (urs) => urs.id !== id,
          );
          this.filtrar();
        },
        error: () => alert('Error al eliminar el registro'),
      });
    }
  }
}
