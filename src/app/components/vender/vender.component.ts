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
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

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

  nombreUsuario: string = '';
  sucursalAsignada: string = '';

  constructor(
    private service: ServiceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarioAutenticado(); // <-- Agregado
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
  obtenerUsuarioAutenticado(): void {
    if (isPlatformBrowser(this.platformId)) {
      const usuarioString = localStorage.getItem('usuarioLogueado');

      if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        this.nombreUsuario = usuario.nombre;
        this.sucursalAsignada = usuario.sucursalNombre; // <- usar el nombre correctamente

        console.log('Sucursal asignada guardada:', this.sucursalAsignada);

        this.service.getUsuarios().subscribe((usuarios) => {
          this.usuarios = usuarios;
          this.usuarioSeleccionado =
            this.usuarios.find((u) => u.nombre === this.nombreUsuario) || null;
        });

        this.service.getSucursales().subscribe((sucursales) => {
          this.sucursales = sucursales;

          console.log('Sucursales disponibles:', this.sucursales);

          const sucursalPorDefecto = this.sucursales.find((s) => {
            return (
              s.nombre === this.sucursalAsignada ||
              String(s.id) === String(usuario.sucursalId) // <-- comparar con ID
            );
          });

          if (sucursalPorDefecto) {
            this.sucursalFiltrada = sucursalPorDefecto;
            this.sucursal = sucursalPorDefecto;
            console.log('Sucursal filtrada asignada:', this.sucursalFiltrada);
          } else {
            console.warn(
              'No se encontró una sucursal que coincida con la asignada:',
              this.sucursalAsignada,
            );
          }

          this.filtrar(); // Aplicar filtro
        });
      }
    }
  }

  obtenerSucursales(): void {
    this.service.getSucursales().subscribe((data) => {
      this.sucursales = data;

      if (this.sucursalAsignada) {
        const sucursalPorDefecto = this.sucursales.find(
          (suc) =>
            suc.nombre === this.sucursalAsignada ||
            suc.id === Number(this.sucursalAsignada),
        );

        if (sucursalPorDefecto) {
          this.sucursalFiltrada = sucursalPorDefecto;
          this.sucursal = sucursalPorDefecto;
        }
      }
      this.filtrar(); // Aplicar filtro después de obtener las sucursales
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

    if (this.cantidadUltimaAgregada[producto.id] === cantidad) return;

    const precio_unitario = producto.precio_venta;
    const categoria = producto.categoria?.nombre.toLowerCase();

    let subtotal = 0;

    if (categoria === 'tabla') {
      const volumen = (producto.ancho * producto.espesor * producto.largo) / 12;
      subtotal = Math.round(volumen * precio_unitario * cantidad * 100) / 100;
    } else if (['listón', 'liston', 'ripa', 'mueble'].includes(categoria)) {
      subtotal = Math.round(precio_unitario * cantidad * 100) / 100;
    } else {
      alert(`Categoría no válida para cálculo: ${producto.categoria?.nombre}`);
      return;
    }

    const detalleExistente = this.detalleVentas.find(
      (d) => d.producto.id === producto.id,
    );

    if (detalleExistente) {
      detalleExistente.cantidad_vendida = cantidad;
      if (detalleExistente.cantidad_vendida > producto.cantidad) {
        detalleExistente.cantidad_vendida = producto.cantidad;
      }

      if (categoria === 'tabla') {
        const volumen =
          (producto.ancho * producto.espesor * producto.largo) / 12;
        detalleExistente.subtotal =
          Math.round(
            volumen *
              detalleExistente.precio_unitario *
              detalleExistente.cantidad_vendida *
              100,
          ) / 100;
      } else {
        detalleExistente.subtotal =
          Math.round(
            detalleExistente.precio_unitario *
              detalleExistente.cantidad_vendida *
              100,
          ) / 100;
      }
    } else {
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

    this.cantidadUltimaAgregada[producto.id] = cantidad;
    this.cantidadPorProducto[producto.id] = cantidad;
    this.actualizarTotalVenta();
  }

  quitarDelCarrito(productoId: number): void {
    this.detalleVentas = this.detalleVentas.filter(
      (detalle) => detalle.producto.id !== productoId,
    );

    // Limpiar la cantidad del producto eliminado
    delete this.cantidadPorProducto[productoId];
    delete this.cantidadUltimaAgregada[productoId];

    this.actualizarTotalVenta();
  }

  actualizarTotalVenta(): void {
    this.totalVenta =
      Math.round(
        this.detalleVentas.reduce((acc, detalle) => acc + detalle.subtotal, 0) *
          100,
      ) / 100;
  }

  actualizarSubtotal(detalle: DetalleVentaMadera): void {
    if (detalle.cantidad_vendida < 1) {
      detalle.cantidad_vendida = 1;
    }
    if (detalle.cantidad_vendida > detalle.producto.cantidad) {
      detalle.cantidad_vendida = detalle.producto.cantidad;
    }

    const categoria = detalle.producto.categoria?.nombre.toLowerCase();

    if (categoria === 'tabla') {
      const volumen =
        (detalle.producto.ancho *
          detalle.producto.espesor *
          detalle.producto.largo) /
        12;
      detalle.subtotal =
        Math.round(
          volumen * detalle.precio_unitario * detalle.cantidad_vendida * 100,
        ) / 100;
    } else if (['listón', 'liston', 'ripa', 'mueble'].includes(categoria)) {
      detalle.subtotal =
        Math.round(detalle.precio_unitario * detalle.cantidad_vendida * 100) /
        100;
    } else {
      alert(
        `Categoría no válida para cálculo: ${detalle.producto.categoria?.nombre}`,
      );
    }

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

      const categoria = producto.categoria?.nombre.toLowerCase();

      if (categoria === 'tabla') {
        const volumen =
          (producto.ancho * producto.espesor * producto.largo) / 12;
        detalle.subtotal =
          Math.round(
            volumen * detalle.precio_unitario * detalle.cantidad_vendida * 100,
          ) / 100;
      } else if (['listón', 'liston', 'ripa', 'mueble'].includes(categoria)) {
        detalle.subtotal =
          Math.round(detalle.precio_unitario * detalle.cantidad_vendida * 100) /
          100;
      } else {
        alert(
          `Categoría no válida para cálculo: ${producto.categoria?.nombre}`,
        );
      }

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

    const categoria = detalle.producto.categoria?.nombre.toLowerCase();

    if (categoria === 'tabla') {
      const volumen =
        (detalle.producto.ancho *
          detalle.producto.espesor *
          detalle.producto.largo) /
        12;
      detalle.subtotal =
        Math.round(volumen * detalle.precio_unitario * cantidad * 100) / 100;
    } else if (['listón', 'liston', 'ripa', 'mueble'].includes(categoria)) {
      detalle.subtotal =
        Math.round(detalle.precio_unitario * cantidad * 100) / 100;
    } else {
      alert(
        `Categoría no válida para cálculo: ${detalle.producto.categoria?.nombre}`,
      );
    }

    this.cantidadPorProducto[detalle.producto.id] = cantidad;
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
    if (this.detalleVentas.length === 0) {
      alert('No hay detalles de venta para registrar.');
      return;
    }

    const observables = this.detalleVentas.map((detalle) => {
      const nuevoDetalle = {
        venta: this.venta.id,
        producto: detalle.producto.id,
        cantidad_vendida: detalle.cantidad_vendida,
        precio_unitario: detalle.precio_unitario,
      };
      console.log('Nuevo detalle a registrar:', nuevoDetalle);
      return this.service.createDetalleVentaMadera(nuevoDetalle);
    });

    forkJoin(observables).subscribe(
      (detallesCreados) => {
        // Actualizar cantidades en productos tras confirmación de todos los detalles
        detallesCreados.forEach((detalleCreado, index) => {
          const detalle = this.detalleVentas[index];
          const productoId = detalle.producto.id;
          const cantidadVendida = detalle.cantidad_vendida;
          const productoEnLista = this.productos.find(
            (p) => p.id === productoId,
          );
          if (productoEnLista) {
            productoEnLista.cantidad -= cantidadVendida;
            if (productoEnLista.cantidad < 0) {
              productoEnLista.cantidad = 0;
            }
          }
        });

        alert('Venta y detalles registrados correctamente.');
        this.reiniciarFormulario();
        this.limpiarCantidades();

        // Navegar a la ruta solicitada
        this.router.navigate(['app-panel-control/registrar-factura-recibo']);
      },
      (error) => {
        console.error('Error al registrar detalles de venta:', error);
        const errorMsg = error.error
          ? JSON.stringify(error.error)
          : error.message || 'Error desconocido';
        alert(`Error al registrar los detalles de venta: ${errorMsg}`);
      },
    );
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
