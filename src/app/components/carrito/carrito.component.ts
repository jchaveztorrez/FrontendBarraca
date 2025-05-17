import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { isPlatformBrowser } from '@angular/common';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  carrito: any[] = [];
  nombreCliente: string = '';
  ciNit: string = '';
  tipoComprobante: string = 'factura';
  sucursalSeleccionada: number | null = null;
  sucursal: any[] = [];
  usuarioVendedorId: number = 1; // Deberías obtener esto dinámicamente
  constructor(
    private router: Router,
    private services: ServiceService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.loadSucursal();
    this.cargarCarrito();
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarCarrito();
    }
  }
  loadSucursal() {
    this.services.getSucursales().subscribe((data) => {
      this.sucursal = data;
    });
  }
  cargarCarrito() {
    if (isPlatformBrowser(this.platformId)) {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        this.carrito = JSON.parse(carritoGuardado);
      }
    } else {
      this.carrito = [];
    }
  }

  actualizarCantidad(producto: any) {
    if (producto.cantidad < 1) {
      producto.cantidad = 1;
    }
    this.guardarCarrito();
  }

  eliminarDelCarrito(id: number) {
    this.carrito = this.carrito.filter((p) => p.id !== id);
    this.guardarCarrito();
  }

  vaciarCarrito() {
    this.carrito = [];
    localStorage.removeItem('carrito');
  }

  irAProductos() {
    this.router.navigate(['app-panel-control/vender']);
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  calcularTotal(): number {
    return this.carrito.reduce(
      (total, p) => total + p.precio_venta * p.cantidad,
      0,
    );
  }
  vender() {
    // Validate input fields
    if (
      !this.nombreCliente.trim() ||
      !this.ciNit.trim() ||
      !this.tipoComprobante ||
      !this.sucursalSeleccionada
    ) {
      alert(
        'Por favor, complete todos los campos del cliente y seleccione una sucursal.',
      );
      return;
    }

    if (this.carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    // Prepare the sale details
    const detalles = this.carrito.map((producto) => ({
      producto: producto.id,
      cantidad_vendida: producto.cantidad,
      precio_unitario: producto.precio_venta,
    }));

    const ventaData = {
      factura: {
        tipo: this.tipoComprobante,
        nombre_cliente: this.nombreCliente,
        ci_nit: this.ciNit,
        total: this.calcularTotal(),
      },
      venta: {
        vendedor: this.usuarioVendedorId, // This should be dynamically set based on the logged-in user
        sucursal: this.sucursalSeleccionada,
      },
      detalles: detalles,
    };

    console.log('Enviando venta:', ventaData);

    // Send the sale data to the backend
    this.http
      .post('http://localhost:8000/api/registrar_venta/', ventaData)
      .subscribe({
        next: (res) => {
          alert('Venta registrada exitosamente.');
          this.vaciarCarrito(); // Clear the cart after successful sale
          this.router.navigate(['/productos']); // Redirect to products page
        },
        error: (err) => {
          console.error('Error al registrar la venta:', err);
          alert('Ocurrió un error al registrar la venta.');
        },
      });
  }
}
