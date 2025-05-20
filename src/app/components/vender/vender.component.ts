import { Component, OnInit } from '@angular/core';
import {
  Usuario,
  DetalleVentaMadera,
  ProductoMadera,
  Sucursal,
  Venta,
  Categoria,
} from '../../models/models';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vender',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css'],
})
export class VenderComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;

  sucursales: Sucursal[] = [];
  sucursal: Sucursal | null = null;

  categoria: Categoria[] = [];
  categoriaFiltrada: Categoria | null = null;

  productos: ProductoMadera[] = [];
  productosOriginales: ProductoMadera[] = [];

  producto: ProductoMadera | null = null;
  productoSeleccionado: ProductoMadera | null = null;

  sucursalFiltrada: Sucursal | null = null;

  cantidadPorProducto: { [key: number]: number } = {};
  cantidadUltimaAgregada: { [key: number]: number } = {};
  cantidad: number = 1;

  detalleVentas: DetalleVentaMadera[] = [];
  totalVenta: number = 0;

  venta: Venta = {} as Venta;
  ventaId: number = 0;

  busqueda: string = '';
  categoriaBusqueda: string = '';

  constructor(
    private service: ServiceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerProductos();
    this.obtenerSucursales();
    this.obtenerCategorias();
  }

  obtenerUsuarios(): void {
    this.service.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  obtenerProductos(): void {
    this.service.getProductoMaderas().subscribe((data) => {
      this.productosOriginales = data;
      this.productos = [...data]; // Copia para mostrar
    });
  }

  obtenerSucursales(): void {
    this.service.getSucursales().subscribe((data) => {
      this.sucursales = data;
    });
  }
  obtenerCategorias(): void {
    this.service.getCategorias().subscribe((data) => {
      this.categoria = data;
    });
  }

  filtrar(): void {
    let filtrados = [...this.productosOriginales];

    // Filtro por texto (especie)
    if (this.categoriaBusqueda.trim()) {
      const filtro = this.categoriaBusqueda.toLowerCase();
      filtrados = filtrados.filter((p) =>
        p.especie.toLowerCase().includes(filtro),
      );
    }

    // Filtro por producto seleccionado
    if (this.productoSeleccionado) {
      filtrados = filtrados.filter(
        (p) => p.id === this.productoSeleccionado?.id,
      );
    }

    // Filtro por sucursal
    if (this.sucursalFiltrada) {
      filtrados = filtrados.filter(
        (p) => p.sucursal?.id === this.sucursalFiltrada?.id,
      );
    }

    // Filtro por categoría
    if (this.categoriaFiltrada) {
      filtrados = filtrados.filter(
        (p) => p.categoria?.id === this.categoriaFiltrada?.id,
      );
    }

    this.productos = filtrados;
  }

  agregarAlCarrito(producto: ProductoMadera, cantidad: number): void {
    if (!producto || !cantidad || cantidad <= 0 || cantidad > producto.cantidad)
      return;

    // Comprobar si la cantidad es igual a la última cantidad agregada para este producto
    if (this.cantidadUltimaAgregada[producto.id] === cantidad) {
      // No hacer nada si la cantidad no cambió
      return;
    }

    const precio_unitario = producto.precio_venta;
    const subtotal = precio_unitario * cantidad;

    const detalleExistente = this.detalleVentas.find(
      (d) => d.producto.id === producto.id,
    );

    if (detalleExistente) {
      // Actualizar la cantidad al nuevo valor (no sumar)
      detalleExistente.cantidad_vendida = cantidad;

      // Validar que no supere la cantidad disponible
      if (detalleExistente.cantidad_vendida > producto.cantidad) {
        detalleExistente.cantidad_vendida = producto.cantidad;
      }

      detalleExistente.subtotal =
        detalleExistente.cantidad_vendida * detalleExistente.precio_unitario;
    } else {
      // Crear nuevo detalle si no existe
      const detalle: DetalleVentaMadera = {
        id: 0,
        venta: {} as Venta,
        producto,
        cantidad_vendida: cantidad,
        precio_unitario,
        subtotal,
      };
      this.detalleVentas.push(detalle);
    }

    // Guardar la cantidad actual como la última agregada para este producto
    this.cantidadUltimaAgregada[producto.id] = cantidad;

    // Sincronizar el campo de cantidadPorProducto con la cantidad del carrito
    this.cantidadPorProducto[producto.id] = cantidad;

    this.actualizarTotalVenta();
  }

  quitarDelCarrito(productoId: number): void {
    this.detalleVentas = this.detalleVentas.filter(
      (detalle) => detalle.producto.id !== productoId,
    );
    this.actualizarTotalVenta();
  }

  actualizarTotalVenta(): void {
    this.totalVenta = this.detalleVentas.reduce(
      (acc, detalle) =>
        acc + detalle.precio_unitario * detalle.cantidad_vendida,
      0,
    );
  }
  actualizarSubtotal(detalle: DetalleVentaMadera): void {
    if (detalle.cantidad_vendida < 1) {
      detalle.cantidad_vendida = 1;
    }

    if (detalle.cantidad_vendida > detalle.producto.cantidad) {
      detalle.cantidad_vendida = detalle.producto.cantidad;
    }

    detalle.subtotal = detalle.cantidad_vendida * detalle.precio_unitario;
    this.actualizarTotalVenta();
  }
  actualizarCantidadDesdeProducto(producto: ProductoMadera): void {
    const cantidad = this.cantidadPorProducto[producto.id];
    if (!producto || cantidad < 1) return;

    const detalle = this.detalleVentas.find(
      (d) => d.producto.id === producto.id,
    );

    if (detalle) {
      detalle.cantidad_vendida = cantidad;

      if (detalle.cantidad_vendida > producto.cantidad) {
        detalle.cantidad_vendida = producto.cantidad;
        this.cantidadPorProducto[producto.id] = producto.cantidad;
      }

      detalle.subtotal = detalle.cantidad_vendida * detalle.precio_unitario;

      // Actualizar la última cantidad agregada para evitar añadir más si no cambia
      this.cantidadUltimaAgregada[producto.id] = detalle.cantidad_vendida;

      this.actualizarTotalVenta();
    }
  }

  actualizarCantidadDesdeCarrito(detalle: DetalleVentaMadera): void {
    let cantidad = detalle.cantidad_vendida;

    if (cantidad < 1) {
      cantidad = 1;
      detalle.cantidad_vendida = 1;
    }

    if (cantidad > detalle.producto.cantidad) {
      cantidad = detalle.producto.cantidad;
      detalle.cantidad_vendida = cantidad;
    }

    detalle.subtotal = cantidad * detalle.precio_unitario;

    // Actualizar en la lista de productos
    this.cantidadPorProducto[detalle.producto.id] = cantidad;

    // Actualizar la última cantidad agregada para mantener sincronización
    this.cantidadUltimaAgregada[detalle.producto.id] = cantidad;

    this.actualizarTotalVenta();
  }

  registrarVenta(): void {
    if (
      !this.usuarioSeleccionado ||
      !this.sucursal ||
      this.detalleVentas.length === 0
    ) {
      alert('Faltan datos para registrar la venta.');
      return;
    }

    // Creamos la venta con los datos requeridos por el backend

    const nuevaVenta = {
      vendedor_id: this.usuarioSeleccionado.id,
      sucursal_id: this.sucursal.id,
      total: this.totalVenta,
    };

    this.service.createVenta(nuevaVenta).subscribe(
      (ventaGuardada) => {
        this.venta = ventaGuardada;
        this.ventaId = ventaGuardada.id;
        this.registrarDetallesVenta();
      },
      (error) => {
        console.error('Error al registrar la venta:', error);
        alert('Error al registrar la venta.');
      },
    );
  }

  registrarDetallesVenta(): void {
    this.detalleVentas.forEach((detalle) => {
      const nuevoDetalle = {
        venta: this.venta.id,
        producto: detalle.producto.id,
        cantidad_vendida: detalle.cantidad_vendida,
        precio_unitario: detalle.precio_unitario,
      };

      this.service.createDetalleVentaMadera(nuevoDetalle).subscribe(
        (detalleCreado) => {
          console.log('Detalle registrado:', detalleCreado);

          const productoId = detalle.producto.id;
          const cantidadVendida = detalle.cantidad_vendida;

          // ✅ Solo actualizamos en productos visibles (para no duplicar descuento)
          const productoEnLista = this.productos.find(
            (p) => p.id === productoId,
          );
          if (productoEnLista) {
            productoEnLista.cantidad -= cantidadVendida;

            // Evitamos cantidades negativas
            if (productoEnLista.cantidad < 0) {
              productoEnLista.cantidad = 0;
            }
          }
        },
        (error) => {
          console.error('Error al registrar detalle de venta:', error);
        },
      );
    });

    alert('Venta registrada con éxito');
    this.reiniciarFormulario();
    this.limpiarCantidades();
  }

  reiniciarFormulario(): void {
    this.usuarioSeleccionado = null;
    this.sucursal = null;
    this.detalleVentas = [];
    this.totalVenta = 0;
    this.ventaId = 0;
  }
  limpiarCantidades(): void {
    // Limpiar los campos de cantidad por producto
    this.cantidadPorProducto = {};
    this.cantidadUltimaAgregada = {};

    // Limpiar los productos del carrito
    this.detalleVentas = [];

    // Reiniciar el total de la venta
    this.totalVenta = 0;
  }
}
