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

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.obtenerDetalleVentas();
  }

  obtenerDetalleVentas(): void {
    this.service.getDetalleVentaMadera().subscribe((datos) => {
      this.detalleVentas = datos;
      this.mostradas = datos;
    });
  }

  filtrar(): void {
    const texto = this.busqueda.toLowerCase();
    this.mostradas = this.detalleVentas.filter((detalle) =>
      detalle.producto.especie.toLowerCase().includes(texto),
    );
  }
}
