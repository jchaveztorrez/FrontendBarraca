import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Venta } from '../../../models/models';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-venta-listar',
  imports: [CommonModule, FormsModule],
  templateUrl: './venta-listar.component.html',
  styleUrl: './venta-listar.component.css',
})
export class VentaListarComponent implements OnInit {
  ventas: Venta[] = [];
  mostradas: Venta[] = [];
  busqueda: string = '';

  fechaInicio: string = '';
  fechaFin: string = '';
  vendedorSeleccionado: number | '' = '';
  sucursalSeleccionada: number | '' = '';

  vendedores: any[] = [];
  sucursales: any[] = [];

  constructor(private ventaService: ServiceService) {}

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas(): void {
    this.ventaService.getVentas().subscribe((datos) => {
      this.ventas = datos;
      this.mostradas = datos;
      this.vendedores = [...new Set(datos.map((v) => v.vendedor))];
      this.sucursales = [...new Set(datos.map((v) => v.sucursal))];
    });
  }

  filtrar(): void {
    const texto = this.busqueda.toLowerCase();
    this.mostradas = this.ventas.filter((v) => {
      const coincideBusqueda = v.vendedor.nombre.toLowerCase().includes(texto);
      const coincideVendedor = this.vendedorSeleccionado
        ? v.vendedor.id === Number(this.vendedorSeleccionado)
        : true;

      const coincideSucursal = this.sucursalSeleccionada
        ? v.sucursal.id === Number(this.sucursalSeleccionada)
        : true;

      const fecha = new Date(v.fecha);
      const desde = this.fechaInicio ? new Date(this.fechaInicio) : null;
      const hasta = this.fechaFin ? new Date(this.fechaFin) : null;
      const dentroDelRango =
        (!desde || fecha >= desde) && (!hasta || fecha <= hasta);

      return (
        coincideBusqueda &&
        coincideVendedor &&
        coincideSucursal &&
        dentroDelRango
      );
    });
  }
}
