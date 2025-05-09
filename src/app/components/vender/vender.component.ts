import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductoMadera } from '../../models/productos';
import { ServiceProductoService } from '../../services/service-producto.service';
import { ServiceService } from '../../services/service.service';
import { Sucursal } from '../../models/models';

@Component({
  selector: 'app-vender',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vender.component.html',
  styleUrl: './vender.component.css',
})
export class VenderComponent {
  productos: ProductoMadera[] = [];
  filtrados: ProductoMadera[] = [];
  cantidades: { [id: number]: number } = {};
  busqueda = '';
  nombreSeleccionado = '';
  sucursalSeleccionada = '';
  sucursales: Sucursal[] = [];

  constructor(
    private servicio: ServiceProductoService,
    private sucursalService: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.servicio.getProductoMaderas().subscribe((data) => {
      this.productos = data;
      this.filtrar();
      // Cargar cantidades desde localStorage
      let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
      carrito.forEach((producto: any) => {
        this.cantidades[producto.id] = producto.cantidad;
      });
    });

    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursales = data;
    });
  }

  filtrar(): void {
    let texto = this.busqueda.trim().toLowerCase();

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

  actualizarSucursal(value: string) {
    this.sucursalSeleccionada = value;
    this.filtrar();
  }

  agregarAlCarrito(producto: ProductoMadera): void {
    const cantidad = this.cantidades[producto.id] || 1;
    console.log('Agregado:', producto, 'Cantidad:', cantidad);

    // Guardar en el carrito (localStorage)
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const productoExistente = carrito.find(
      (item: any) => item.id === producto.id,
    );

    if (productoExistente) {
      productoExistente.cantidad = cantidad; // Cambiar la cantidad en lugar de sumarla
    } else {
      carrito.push({ ...producto, cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la cantidad ingresada en localStorage
    this.cantidades[producto.id] = cantidad;
  }

  irACarrito(): void {
    this.router.navigate(['app-panel-control/carrito']);
  }
  estaEnCarrito(id: number): boolean {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    return carrito.some((item: any) => item.id === id);
  }
}
