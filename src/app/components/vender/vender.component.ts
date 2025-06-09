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
import { ErrorComponent } from '../Mensajes/error/error.component';
import { OkComponent } from '../Mensajes/ok/ok.component';

@Component({
  selector: 'app-vender',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorComponent,
    OkComponent,
  ],
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
  porMetro: { [productoId: number]: boolean } = {};
  metrosLineales: { [key: number]: number } = {};

  // Filtros por dimensiones
  unidadAncho: string = '';
  valorAncho: number | null = null;

  unidadEspesor: string = '';
  valorEspesor: number | null = null;

  unidadLargo: string = '';
  valorLargo: number | null = null;

  mensajeExito: string = '';
  mensajeError: string = '';

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

    // Filtro por especie (texto)
    if (this.categoriaBusqueda.trim()) {
      const filtro = this.categoriaBusqueda.toLowerCase();
      filtrados = filtrados.filter((p) =>
        p.especie.toLowerCase().includes(filtro),
      );
    }

    // Filtros por selección
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

    if (this.categoriaFiltrada) {
      filtrados = filtrados.filter(
        (p) => p.categoria?.id === this.categoriaFiltrada?.id,
      );
    }

    // Filtro por ancho dinámico
    if (
      this.valorAncho !== null &&
      this.valorAncho !== undefined &&
      this.unidadAncho &&
      this.valorAncho > 0
    ) {
      const valorBuscadoEnPulgadas = this.convertirA_Pulgadas(
        this.valorAncho,
        this.unidadAncho,
      );

      const valorTexto = this.valorAncho.toString();

      filtrados = filtrados.filter((p) => {
        if (p.ancho === null || p.ancho === undefined || p.ancho === 0) {
          return false;
        }

        if (this.unidadAncho === 'plg') {
          // Filtrado para pulgadas (con margen de ±0.1)
          const margen = 0.1;
          const diferencia = Math.abs(p.ancho - valorBuscadoEnPulgadas);
          return (
            diferencia <= margen || p.ancho.toString().startsWith(valorTexto)
          );
        } else {
          // Filtrado dinámico para centímetros y metros
          const anchoEnUnidad = this.convertirDesdePulgadas(
            p.ancho,
            this.unidadAncho,
          );
          return anchoEnUnidad.toString().startsWith(valorTexto);
        }
      });
    }

    // Filtro por espesor dinámico
    if (
      this.valorEspesor !== null &&
      this.valorEspesor !== undefined &&
      this.unidadEspesor &&
      this.valorEspesor > 0
    ) {
      const valorBuscadoEnPulgadas = this.convertirA_Pulgadas(
        this.valorEspesor,
        this.unidadEspesor,
      );

      const valorTexto = this.valorEspesor.toString();

      filtrados = filtrados.filter((p) => {
        if (p.espesor === null || p.espesor === undefined || p.espesor === 0) {
          return false;
        }

        if (this.unidadEspesor === 'plg') {
          // Filtrado para pulgadas (con margen de ±0.1)
          const margen = 0.1;
          const diferencia = Math.abs(p.espesor - valorBuscadoEnPulgadas);
          return (
            diferencia <= margen || p.espesor.toString().startsWith(valorTexto)
          );
        } else {
          // Filtrado dinámico para centímetros y metros
          const espesorEnUnidad = this.convertirDesdePulgadas(
            p.espesor,
            this.unidadEspesor,
          );
          return espesorEnUnidad.toString().startsWith(valorTexto);
        }
      });
    }

    // Filtro por largo dinámico
    if (
      this.valorLargo !== null &&
      this.valorLargo !== undefined &&
      this.unidadLargo &&
      this.valorLargo > 0
    ) {
      const valorBuscadoEnPies = this.convertirA_Pies(
        this.valorLargo,
        this.unidadLargo,
      );

      const valorTexto = this.valorLargo.toString();

      filtrados = filtrados.filter((p) => {
        if (p.largo === null || p.largo === undefined || p.largo === 0) {
          return false;
        }

        if (this.unidadLargo === 'pies') {
          // Filtrado para pies (con margen de ±0.1)
          const margen = 0.1;
          const diferencia = Math.abs(p.largo - valorBuscadoEnPies);
          return (
            diferencia <= margen || p.largo.toString().startsWith(valorTexto)
          );
        } else {
          // Filtrado dinámico para centímetros y metros
          const largoEnUnidad = this.convertirDesdePies(
            p.largo,
            this.unidadLargo,
          );
          return largoEnUnidad.toString().startsWith(valorTexto);
        }
      });
    }

    this.productos = filtrados;
  }
  // Funciones de conversión para ancho y espesor (pulgadas)
  convertirA_Pulgadas(valor: number, unidad: string): number {
    switch (unidad) {
      case 'cm':
        return valor / 2.54;
      case 'm':
        return valor / 0.0254;
      case 'plg':
      default:
        return valor;
    }
  }

  convertirDesdePulgadas(valor: number, unidad: string): number {
    switch (unidad) {
      case 'cm':
        return valor * 2.54;
      case 'm':
        return valor * 0.0254;
      case 'plg':
      default:
        return valor;
    }
  }

  // Funciones de conversión para largo (pies)
  convertirA_Pies(valor: number, unidad: string): number {
    switch (unidad) {
      case 'cm':
        return valor / 30.48;
      case 'm':
        return valor / 0.3048;
      case 'pies':
      default:
        return valor;
    }
  }

  convertirDesdePies(valor: number, unidad: string): number {
    switch (unidad) {
      case 'cm':
        return valor * 30.48;
      case 'm':
        return valor * 0.3048;
      case 'pies':
      default:
        return valor;
    }
  }

  agregarAlCarrito(producto: ProductoMadera, cantidad: number): void {
    if (!producto || !cantidad || cantidad <= 0 || cantidad > producto.cantidad)
      return;

    if (this.cantidadUltimaAgregada[producto.id] === cantidad) return;

    const precio_unitario = producto.precio_venta;
    const categoria = producto.categoria?.nombre.toLowerCase();

    const usarMetro = this.porMetro[producto.id] === true;

    let subtotal = this.calcularSubtotal(
      producto,
      cantidad,
      precio_unitario,
      usarMetro,
    );

    const detalleExistente = this.detalleVentas.find(
      (d) => d.producto.id === producto.id,
    );

    if (detalleExistente) {
      detalleExistente.cantidad_vendida = Math.min(cantidad, producto.cantidad);
      detalleExistente.subtotal = this.calcularSubtotal(
        producto,
        detalleExistente.cantidad_vendida,
        detalleExistente.precio_unitario,
        usarMetro,
      );
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
    detalle.cantidad_vendida = Math.max(
      1,
      Math.min(detalle.cantidad_vendida, detalle.producto.cantidad),
    );
    const usarMetro = this.porMetro[detalle.producto.id] === true;

    detalle.subtotal = this.calcularSubtotal(
      detalle.producto,
      detalle.cantidad_vendida,
      detalle.precio_unitario,
      usarMetro,
    );

    this.actualizarTotalVenta();
  }

  actualizarCantidadDesdeProducto(producto: ProductoMadera): void {
    const cantidad = this.cantidadPorProducto[producto.id];
    if (!producto || cantidad < 1) return;

    const detalle = this.detalleVentas.find(
      (d) => d.producto.id === producto.id,
    );
    if (!detalle) return;

    detalle.cantidad_vendida = Math.min(cantidad, producto.cantidad);
    const usarMetro = this.porMetro[producto.id] === true;

    detalle.subtotal = this.calcularSubtotal(
      producto,
      detalle.cantidad_vendida,
      detalle.precio_unitario,
      usarMetro,
    );

    this.cantidadUltimaAgregada[producto.id] = detalle.cantidad_vendida;
    this.actualizarTotalVenta();
  }

  actualizarCantidadDesdeCarrito(detalle: DetalleVentaMadera): void {
    let cantidad = Math.max(
      1,
      Math.min(detalle.cantidad_vendida, detalle.producto.cantidad),
    );
    detalle.cantidad_vendida = cantidad;

    const usarMetro = this.porMetro[detalle.producto.id] === true;

    detalle.subtotal = this.calcularSubtotal(
      detalle.producto,
      cantidad,
      detalle.precio_unitario,
      usarMetro,
    );

    this.cantidadPorProducto[detalle.producto.id] = cantidad;
    this.cantidadUltimaAgregada[detalle.producto.id] = cantidad;

    this.actualizarTotalVenta();
  }

  private calcularSubtotal(
    producto: ProductoMadera,
    cantidad: number,
    precio_unitario: number,
    usarMetro: boolean = false,
    usarPersonalizado: boolean = false,
  ): number {
    if (
      !producto ||
      !producto.categoria?.nombre ||
      cantidad <= 0 ||
      precio_unitario <= 0
    ) {
      return 0;
    }

    const categoria = producto.categoria.nombre.toLowerCase();

    // Conversión a metros
    const largoFt = producto.largo;
    const anchoIn = producto.ancho;
    const espesorIn = producto.espesor;

    const largoM = largoFt * 0.3048;
    const anchoM = anchoIn * 0.0254;
    const espesorM = espesorIn * 0.0254;

    const volumenPiesCubicos = (anchoIn * espesorIn * largoFt) / 12;

    switch (categoria) {
      case 'tabla':
        if (usarMetro) {
          const tablasNecesarias = cantidad / largoM;
          const precioPorTabla = precio_unitario * volumenPiesCubicos;
          return Math.round(precioPorTabla * tablasNecesarias * 100) / 100;
        } else {
          return (
            Math.round(precio_unitario * volumenPiesCubicos * cantidad * 100) /
            100
          );
        }
      case 'tijera':
        if (usarMetro) {
          const tablasNecesarias = cantidad / largoM;
          const precioPorTabla = precio_unitario * volumenPiesCubicos;
          return Math.round(precioPorTabla * tablasNecesarias * 100) / 100;
        } else {
          return (
            Math.round(precio_unitario * volumenPiesCubicos * cantidad * 100) /
            100
          );
        }

      case 'listón':
      case 'liston':
      case 'ripa':
        return Math.round(precio_unitario * largoFt * cantidad * 100) / 100;

      case 'mueble':
        return Math.round(precio_unitario * cantidad * 100) / 100;

      case 'metro lineal':
        const volumenML = (anchoIn * largoFt) / 12;
        const precioUnidadML = precio_unitario * volumenML;
        return Math.round(precioUnidadML * cantidad * 100) / 100;

      default:
        alert(`Categoría no válida para cálculo: ${producto.categoria.nombre}`);
        return 0;
    }
  }

  calcularUnidadesPorMetro(producto: ProductoMadera, metros: number): number {
    if (!producto || producto.largo <= 0 || metros <= 0) {
      return 0;
    }

    const largoEnMetros = producto.largo * 0.3048;
    return Math.ceil(metros / largoEnMetros);
  }

  registrarVenta(): void {
    if (
      !this.usuarioSeleccionado ||
      !this.sucursal ||
      this.detalleVentas.length === 0
    ) {
      this.mensajeError = 'Faltan datos para registrar la venta.';
      return;
    }
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
        this.mensajeError = 'Error al registrar la venta.';
      },
    );
  }

  registrarDetallesVenta(): void {
    if (this.detalleVentas.length === 0) {
      this.mensajeError = 'No hay detalles de venta para registrar.';
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
        this.mensajeExito = 'Venta y detalles registrados correctamente.';
        this.reiniciarFormulario();
        this.limpiarCantidades();
      },
      (error) => {
        console.error('Error al registrar detalles de venta:', error);
        const errorMsg = error.error
          ? JSON.stringify(error.error)
          : error.message || 'Error desconocido';
        this.mensajeError = `Error al registrar los detalles de venta: ${errorMsg}`;
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
  limpiarFiltros(): void {
    // Limpiar los filtros
    this.categoriaBusqueda = '';
    this.productoSeleccionado = null;
    this.sucursalFiltrada = null;
    this.categoriaFiltrada = null;
    this.unidadAncho = '';
    this.valorAncho = null;
    this.unidadEspesor = '';
    this.valorEspesor = null;
    this.unidadLargo = '';
    this.valorLargo = null;
    // Reiniciar la lista de productos a los originales
    this.productos = [...this.productosOriginales];
  }
  limpiarTodo(): void {
    this.limpiarCantidades();
    this.limpiarFiltros();
  }
  manejarOk() {
    this.mensajeExito = '';
    this.router.navigate(['app-panel-control/registrar-factura-recibo']);
  }
  manejarError() {
    this.mensajeError = '';
  }
}
