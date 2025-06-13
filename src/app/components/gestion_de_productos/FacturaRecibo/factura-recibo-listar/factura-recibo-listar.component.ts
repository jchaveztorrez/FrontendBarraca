import { Component } from '@angular/core';
import { FacturaRecibo, Venta } from '../../../../models/models';
import { ServiceService } from '../../../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura-recibo-listar',
  imports: [CommonModule, FormsModule],
  templateUrl: './factura-recibo-listar.component.html',
  styleUrl: './factura-recibo-listar.component.css',
})
export class FacturaReciboListarComponent {
  recibos: FacturaRecibo[] = [];
  recibosMostrados: FacturaRecibo[] = [];
  busquedaRecibos: string = '';

  filtroNombreCliente: string = '';
  filtroCiNit: string = '';
  filtroFecha: string = '';

  constructor(
    private service: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarRecibos();
  }

  cargarRecibos(): void {
    this.service.getFacturaRecibo().subscribe((data) => {
      this.recibos = data;
      this.recibosMostrados = data;
    });
  }

  filtrarRecibos(): void {
    const nombre = this.filtroNombreCliente.toLowerCase();
    const ciNit = this.filtroCiNit.toLowerCase();
    const fecha = this.filtroFecha;

    this.recibosMostrados = this.recibos.filter((r) => {
      const coincideNombre = r.nombre_cliente.toLowerCase().includes(nombre);
      const coincideCiNit = r.ci_nit.toLowerCase().includes(ciNit);

      const coincideFecha = fecha
        ? new Date(r.fecha_emision).toISOString().slice(0, 10) === fecha
        : true;

      return coincideNombre && coincideCiNit && coincideFecha;
    });
  }

  irARegistrar(): void {
    this.router.navigate(['app-panel-control/registrar-factura-recibo']);
  }

  irARegistrarConDatos(
    idRecibo: number,
    idVenta: number,
    nombre_cliente: string,
    ci_nit: string,
  ) {
    this.router.navigate(['app-panel-control/registrar-factura-recibo'], {
      queryParams: {
        reciboId: idRecibo,
        ventaId: idVenta,
        nombre_cliente: nombre_cliente,
        ci_nit: ci_nit,
      },
    });
  }
}
