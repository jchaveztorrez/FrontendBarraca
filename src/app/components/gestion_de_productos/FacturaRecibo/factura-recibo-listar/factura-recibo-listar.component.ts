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
    const texto = this.busquedaRecibos.toLowerCase();
    this.recibosMostrados = this.recibos.filter(
      (r) =>
        r.id.toString().includes(texto) ||
        r.nombre_cliente.toLowerCase().includes(texto),
    );
  }

  irARegistrar(): void {
    this.router.navigate(['app-panel-control/registrar-factura-recibo']);
  }
}
