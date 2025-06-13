import { Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../../../services/service.service';
import { ProductoMadera } from '../../../../models/models';

@Component({
  selector: 'app-producto-madera-listar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './producto-madera-listar.component.html',
  styleUrl: './producto-madera-listar.component.css',
})
export class ProductoMaderaListarComponent {
  producto: ProductoMadera[] = [];
  filtrados: ProductoMadera[] = [];
  mostrados: ProductoMadera[] = [];
  busqueda = '';
  limite = 20;

  sucursales: string[] = [];
  categorias: string[] = [];
  sucursalSeleccionada: string = '';
  categoriaSeleccionada: string = '';
  constructor(
    private servicio: ServiceService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.servicio.getProductoMaderas().subscribe((data) => {
      this.producto = data;

      // Extraer sucursales y categorías únicas
      this.sucursales = [...new Set(data.map((p) => p.sucursal.nombre))];
      this.categorias = [...new Set(data.map((p) => p.categoria.nombre))];

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

    this.filtrados = this.producto.filter((prod) => {
      const coincideTexto = prod.especie.toLowerCase().includes(texto);
      const coincideSucursal =
        !this.sucursalSeleccionada ||
        prod.sucursal.nombre === this.sucursalSeleccionada;
      const coincideCategoria =
        !this.categoriaSeleccionada ||
        prod.categoria.nombre === this.categoriaSeleccionada;
      return coincideTexto && coincideSucursal && coincideCategoria;
    });

    this.limite = 10;
    this.actualizarMostrados();
  }
  irAEditar(id: number): void {
    this.router.navigate(['app-panel-control/editar-producto-madera', id]);
  }
  irARegistrar(): void {
    this.router.navigate(['app-panel-control/registrar-producto-madera']);
  }
}
