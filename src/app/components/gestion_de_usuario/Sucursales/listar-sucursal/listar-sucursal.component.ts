import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../../../../models/models';
import { ServiceService } from '../../../../services/service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-sucursal',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-sucursal.component.html',
  styleUrl: './listar-sucursal.component.css',
})
export class ListarSucursalComponent implements OnInit {
  sucursales: Sucursal[] = [];
  sucursalesFiltradas: Sucursal[] = [];
  sucursalesMostradas: Sucursal[] = [];

  busqueda = '';
  filtroEstado: string = 'activos'; // por defecto solo activos

  limite = 10;

  constructor(
    private sucursalService: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursales = data;
      this.filtrar();
    });
  }

  actualizarSucursalesMostradas(): void {
    this.sucursalesMostradas = this.sucursalesFiltradas.slice(0, this.limite);
  }

  onScroll(event: Event): void {
    const div = event.target as HTMLElement;
    const alFinal = div.scrollTop + div.clientHeight >= div.scrollHeight - 5;
    if (alFinal) {
      this.limite += 10;
      this.actualizarSucursalesMostradas();
    }
  }

  filtrar(): void {
    const texto = this.busqueda.trim();
    const esMayus = texto === texto.toUpperCase();

    this.sucursalesFiltradas = this.sucursales
      .filter(({ nombre = '', direccion = '', estado }) => {
        const combinado = `${nombre} ${direccion}`;
        const coincideTexto = esMayus
          ? combinado.includes(texto)
          : combinado.toLowerCase().includes(texto.toLowerCase());

        const coincideEstado =
          (this.filtroEstado === 'activos' && estado) ||
          (this.filtroEstado === 'inactivos' && !estado) ||
          this.filtroEstado === 'todos';

        return coincideTexto && coincideEstado;
      })
      .sort((a, b) => Number(b.estado) - Number(a.estado));

    this.limite = 10;
    this.actualizarSucursalesMostradas();
  }

  cambiarEstado(sucursal: Sucursal): void {
    const actualizado = { ...sucursal, estado: !sucursal.estado };
    this.sucursalService.updateSucursal(actualizado).subscribe({
      next: () => {
        sucursal.estado = actualizado.estado;
        this.filtrar();
      },
      error: (err) => console.error('Error al cambiar el estado:', err),
    });
  }

  irAEditar(id: number): void {
    this.router.navigate(['app-panel-control/editar-sucursal', id]);
  }

  irARegistrar(): void {
    this.router.navigate(['app-panel-control/registrar-sucursal']);
  }
}
