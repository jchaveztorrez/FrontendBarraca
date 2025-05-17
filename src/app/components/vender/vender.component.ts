import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductoMadera } from '../../models/productos';

import { ServiceService } from '../../services/service.service';
import { Sucursal, Usuario } from '../../models/models';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vender',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css'],
})
export class VenderComponent {
  productos: ProductoMadera[] = [];
  filtrados: ProductoMadera[] = [];
  cantidades: { [id: number]: number } = {};
  busqueda = '';
  nombreSeleccionado = '';
  sucursalSeleccionada = '';
  sucursales: Sucursal[] = [];
  usuarios: Usuario[] = []; // Lista de usuarios
  carrito: any[] = [];
  nombreCliente: string = '';
  ciNit: string = '';
  tipoComprobante: string = 'factura';
  usuarioVendedorId: number | null = null; // ID del usuario vendedor seleccionado

  constructor(
    private servicio: ServiceService,
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    this.loadProductos();
    this.loadSucursales();
    this.loadUsuarios(); // Cargar usuarios
    this.loadCarrito();
  }
  loadProductos(): void {
    this.servicio.getProductoMaderas().subscribe((data) => {
      this.productos = data;
      this.filtrar();
    });
  }
  loadSucursales(): void {
    this.servicio.getSucursales().subscribe((data) => {
      this.sucursales = data;
    });
  }
  loadUsuarios(): void {
    this.servicio.getUsuarios().subscribe((data) => {
      this.usuarios = data; // Cargar la lista de usuarios
    });
  }
  loadCarrito(): void {
    if (isPlatformBrowser(this.platformId)) {
      const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
      this.carrito = carrito;
      carrito.forEach((producto: any) => {
        this.cantidades[producto.id] = producto.cantidad;
      });
    }
  }

  get especiesUnicas(): string[] {
    return [...new Set(this.productos.map((p) => p.especie))];
  }

  filtrar(): void {
    const texto = this.busqueda.trim().toLowerCase();
    this.filtrados = this.productos.filter((prod) => {
      const coincideTexto = prod.especie.toLowerCase().includes(texto);
      const coincideSucursal =
        !this.sucursalSeleccionada ||
        prod.sucursal.nombre.toLowerCase() ===
          this.sucursalSeleccionada.toLowerCase();
      const coincideNombreProducto =
        !this.nombreSeleccionado ||
        prod.especie.toLowerCase() === this.nombreSeleccionado.toLowerCase();
      return coincideTexto && coincideSucursal && coincideNombreProducto;
    });
  }

  agregarAlCarrito(producto: ProductoMadera): void {
    const cantidad = this.cantidades[producto.id] || 1;
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const productoExistente = carrito.find(
      (item: any) => item.id === producto.id,
    );

    if (productoExistente) {
      productoExistente.cantidad = cantidad; // Actualizar cantidad
    } else {
      carrito.push({ ...producto, cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.cantidades[producto.id] = cantidad;
    this.carrito = carrito; // Sincronizar el carrito
  }

  quitarDelCarrito(productoId: number): void {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const updatedCarrito = carrito.filter(
      (item: any) => item.id !== productoId,
    );
    localStorage.setItem('carrito', JSON.stringify(updatedCarrito));
    delete this.cantidades[productoId];
    this.carrito = updatedCarrito; // Sincroniza el carrito actualizado
  }

  vaciarCarrito(): void {
    localStorage.removeItem('carrito');
    this.cantidades = {};
    this.carrito = [];
  }

  calcularTotal(): number {
    return this.carrito.reduce(
      (total, p) => total + p.precio_venta * p.cantidad,
      0,
    );
  }

  actualizarCantidad(producto: any): void {
    if (producto.cantidad < 1) {
      producto.cantidad = 1;
    }
    this.guardarCarrito();
  }

  guardarCarrito(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  estaEnCarrito(productoId: number): boolean {
    return this.carrito.some((item) => item.id === productoId);
  }

  cantidadTotal(): number {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }

  irAProductos(): void {
    this.router.navigate(['app-panel-control/vender']);
  }

  vender(): void {
    // Validaciones
    if (
      !this.nombreCliente.trim() ||
      !this.ciNit.trim() ||
      !this.tipoComprobante ||
      !this.sucursalSeleccionada ||
      this.usuarioVendedorId === null
    ) {
      alert(
        'Por favor, complete todos los campos del cliente, seleccione una sucursal y un vendedor.',
      );
      return;
    }
    if (this.carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    const detalles = this.carrito.map((producto) => ({
      producto: producto.id,
      cantidad_vendida: producto.cantidad,
      precio_unitario: producto.precio_venta,
      subtotal: producto.precio_venta * producto.cantidad,
    }));

    const ventaData = {
      factura: {
        tipo: this.tipoComprobante,
        nombre_cliente: this.nombreCliente,
        ci_nit: this.ciNit,
        total: this.calcularTotal(),
      },
      venta: {
        vendedor: this.usuarioVendedorId,
        sucursal: this.sucursalSeleccionada,
        fecha: new Date().toISOString(),
      },
      detalles: detalles,
    };

    this.http
      .post('http://localhost:8000/api/registrar_venta/', ventaData)
      .subscribe({
        next: () => {
          alert('Venta registrada exitosamente.');
          this.vaciarCarrito();
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          console.error('Error al registrar la venta:', err);
          alert('Ocurrió un error al registrar la venta.');
        },
      });
  }
}
