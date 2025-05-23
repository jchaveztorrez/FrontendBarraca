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

  constructor(private ventaService: ServiceService) {}

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas(): void {
    this.ventaService.getVentas().subscribe((datos) => {
      this.ventas = datos;
      this.mostradas = datos;
    });
  }

  filtrar(): void {
    const texto = this.busqueda.toLowerCase();
    this.mostradas = this.ventas.filter((v) =>
      v.vendedor.nombre.toLowerCase().includes(texto),
    );
  }
}
