import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ServiceProductoService } from '../../services/service-producto.service';
import { ServiceService } from '../../services/service.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  carrito: any[] = [];
  productos: any[] = [];
  cantidades: { [key: number]: number } = {}; // Para almacenar las cantidades de los productos
  sucursales: any[] = []; // Para almacenar las sucursales

  constructor(
    private router: Router,
    private servicio: ServiceProductoService,
    private sucursalService: ServiceService, // Agregado el servicio para obtener sucursales
    @Inject(PLATFORM_ID) private platformId: Object, // Inyectamos el ID de la plataforma
  ) {}

  ngOnInit(): void {
    // Verificar si se está ejecutando en el navegador (lado del cliente)
    if (isPlatformBrowser(this.platformId)) {
      this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    }

    // Cargar los productos
    this.servicio.getProductoMaderas().subscribe((data) => {
      this.productos = data;
      this.filtrar(); // Llamar al método filtrar si es necesario

      // Cargar las cantidades desde localStorage
      if (isPlatformBrowser(this.platformId)) {
        let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        carrito.forEach((producto: any) => {
          this.cantidades[producto.id] = producto.cantidad;
        });
      }
    });

    // Cargar las sucursales
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursales = data;
    });
  }

  irAProductos(): void {
    this.router.navigate(['app-panel-control/vender']);
  }

  eliminarDelCarrito(productoId: number): void {
    // Eliminar producto del carrito
    this.carrito = this.carrito.filter((item) => item.id !== productoId);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  actualizarCantidad(producto: any): void {
    if (isPlatformBrowser(this.platformId)) {
      let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
      const productoExistente = carrito.find(
        (item: any) => item.id === producto.id,
      );

      if (productoExistente) {
        productoExistente.cantidad = producto.cantidad; // Actualiza la cantidad
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
    }
  }

  calcularTotal(): number {
    return this.carrito.reduce(
      (total, producto) => total + producto.precio_venta * producto.cantidad,
      0,
    );
  }

  // Asegúrate de que este método `filtrar()` esté implementado si es necesario.
  filtrar(): void {
    // Implementa el filtro de productos si es necesario
  }
}
