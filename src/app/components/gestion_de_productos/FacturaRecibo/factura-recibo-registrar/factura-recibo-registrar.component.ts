import { Component, OnInit } from '@angular/core';
import {
  DetalleVentaMadera,
  FacturaRecibo,
  Venta,
} from '../../../../models/models';
import { ServiceService } from '../../../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura-recibo-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factura-recibo-registrar.component.html',
  styleUrl: './factura-recibo-registrar.component.css',
})
export class FacturaReciboRegistrarComponent implements OnInit {
  ventas: Venta[] = [];
  ventasMostradas: Venta[] = [];
  ventaReciente: Venta | null = null;
  busquedaVentas: string = '';
  modoFormulario: 'lista' | 'factura' | 'recibo' = 'lista';
  ventaSeleccionada: Venta | null = null;
  tipoDocumentoSeleccionado: 'factura' | 'recibo' | null = null;
  filtroVenta: 'ultima' | 'todo' = 'todo';
  nombre_cliente: string = '';
  ci_nit: string = '';
  fechaHoy: Date = new Date();
  aCuenta: number = 0;
  detallesVenta: DetalleVentaMadera[] = [];

  constructor(
    private service: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
    this.filtroVenta = 'todo';
    this.filtrarVentas();
  }

  cargarVentas(): void {
    this.service.getVentas().subscribe((data) => {
      this.ventas = data;
      this.filtrarVentaReciente();
      this.filtrarVentas();
    });
  }

  filtrarVentaReciente(): void {
    if (this.ventas.length === 0) {
      this.ventaReciente = null;
      return;
    }
    this.ventaReciente = this.ventas.reduce((prev, current) =>
      new Date(prev.fecha) > new Date(current.fecha) ? prev : current,
    );
  }

  filtrarVentas(): void {
    const texto = this.busquedaVentas.toLowerCase();
    if (this.filtroVenta === 'ultima') {
      if (
        this.ventaReciente &&
        (`${this.ventaReciente.vendedor.nombre} ${this.ventaReciente.vendedor.apellido}`
          .toLowerCase()
          .includes(texto) ||
          this.ventaReciente.id.toString().includes(texto))
      ) {
        this.ventasMostradas = [this.ventaReciente];
      } else {
        this.ventasMostradas = [];
      }
    } else {
      this.ventasMostradas = this.ventas
        .filter(
          (venta) =>
            `${venta.vendedor.nombre} ${venta.vendedor.apellido}`
              .toLowerCase()
              .includes(texto) || venta.id.toString().includes(texto),
        )
        .sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
        );
    }
  }

  generarFactura(venta: Venta): void {
    this.ventaSeleccionada = venta;
    this.tipoDocumentoSeleccionado = 'factura';
    this.modoFormulario = 'factura';
    this.nombre_cliente = '';
    this.ci_nit = '';
    this.cargarDetallesVenta(venta.id);
  }

  generarRecibo(venta: Venta): void {
    this.ventaSeleccionada = venta;
    this.tipoDocumentoSeleccionado = 'recibo';
    this.modoFormulario = 'recibo';
    this.nombre_cliente = '';
    this.ci_nit = '';
    this.cargarDetallesVenta(venta.id);
  }

  cancelarFormulario(): void {
    this.modoFormulario = 'lista';
    this.ventaSeleccionada = null;
    this.tipoDocumentoSeleccionado = null;
    this.nombre_cliente = '';
    this.ci_nit = '';
    this.detallesVenta = [];
    this.aCuenta = 0;
  }

  cargarDetallesVenta(ventaId: number): void {
    this.service.getDetalleVentaMadera().subscribe((detalles) => {
      this.detallesVenta = detalles.filter(
        (detalle) => detalle.venta.id === ventaId,
      );
    });
  }

  guardarDocumento(): void {
    if (!this.ventaSeleccionada || !this.tipoDocumentoSeleccionado) return;

    if (!this.nombre_cliente.trim() || !this.ci_nit.trim()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const nuevoDoc: FacturaRecibo = {
      id: 0,
      venta: { id: this.ventaSeleccionada.id } as Venta, // solo el id
      tipo: this.tipoDocumentoSeleccionado,
      nombre_cliente: this.nombre_cliente,
      ci_nit: this.ci_nit,
      fecha_emision: new Date(),
      total: this.ventaSeleccionada.total,
    };

    this.service.createFacturaRecibo(nuevoDoc).subscribe({
      next: (resp) => {
        alert('Documento creado con éxito');
        this.cancelarFormulario();
      },
      error: (err) => {
        console.error('Error al crear el documento:', err);
        alert('Ocurrió un error al registrar el documento');
      },
    });
  }
}
