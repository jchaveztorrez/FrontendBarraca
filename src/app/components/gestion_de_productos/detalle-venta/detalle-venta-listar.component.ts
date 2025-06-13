import { Component, OnInit } from '@angular/core';
import { DetalleVentaMadera } from '../../../models/models';
import { ServiceService } from '../../../services/service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-venta-listar',
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-venta-listar.component.html',
  styleUrl: './detalle-venta-listar.component.css',
})
export class DetalleVentaListarComponent implements OnInit {
  detalleVentas: DetalleVentaMadera[] = [];
  mostradas: DetalleVentaMadera[] = [];
  busqueda: string = '';

  numeroVentaBusqueda: string = '';
  productoSeleccionado: string = '';
  especiesDisponibles: string[] = [];

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.obtenerDetalleVentas();
  }

  obtenerDetalleVentas(): void {
    this.service.getDetalleVentaMadera().subscribe((datos) => {
      this.detalleVentas = datos;
      this.mostradas = datos;

      // Generar lista de especies únicas para el select
      const especiesSet = new Set(datos.map((d) => d.producto.especie));
      this.especiesDisponibles = Array.from(especiesSet);
    });
  }

  filtrar(): void {
    const texto = this.busqueda.toLowerCase();
    const numeroVenta = this.numeroVentaBusqueda.trim();
    const especieFiltro = this.productoSeleccionado;

    this.mostradas = this.detalleVentas.filter((detalle) => {
      const coincideEspecie = detalle.producto.especie
        .toLowerCase()
        .includes(texto);
      const coincideNumeroVenta = numeroVenta
        ? detalle.venta.id.toString().includes(numeroVenta)
        : true;
      const coincideProducto = especieFiltro
        ? detalle.producto.especie === especieFiltro
        : true;

      return coincideEspecie && coincideNumeroVenta && coincideProducto;
    });
  }
}
