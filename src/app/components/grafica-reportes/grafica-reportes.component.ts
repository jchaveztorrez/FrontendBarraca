import { Component, OnInit } from '@angular/core';
import {
  Venta,
  ProductoMadera,
  DetalleVentaMadera,
  FacturaRecibo,
  Sucursal,
  Usuario,
} from '../../models/models';
import { map } from 'rxjs/operators';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-grafica-reportes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxChartsModule],
  templateUrl: './grafica-reportes.component.html',
  styleUrl: './grafica-reportes.component.css',
})
export class GraficaReportesComponent implements OnInit {
  ventas: Venta[] = [];
  productos: ProductoMadera[] = [];
  detalles: DetalleVentaMadera[] = [];
  facturas: FacturaRecibo[] = [];
  sucursales: Sucursal[] = [];
  usuarios: Usuario[] = [];

  ventasPorSucursal: { name: string; value: number }[] = [];
  ventasPorFecha: {
    name: string;
    series: { name: string; value: number }[];
  }[] = [];
  productosMasVendidos: { name: string; value: number }[] = [];
  ingresosPorProducto: { name: string; value: number }[] = [];
  stockPorSucursal: any[] = [];
  rentabilidadProducto: { name: string; value: number }[] = [];
  facturacionPorTipo: { name: string; value: number }[] = [];
  ventasPorVendedor: { name: string; value: number }[] = [];
  volumenPorProducto: { name: string; value: number }[] = [];
  productosSinMovimiento: ProductoMadera[] = [];

  view: [number, number] = [700, 400];

  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#5AA454',
      '#A10A28',
      '#C7B42C',
      '#AAAAAA',
      '#FF5733',
      '#33FF57',
      '#3357FF',
      '#FF33A1',
      '#FFC300',
      '#DAF7A6',
    ],
  };
  productosMasVendidosPorSucursal: {
    name: string;
    series: { name: string; value: number }[];
  }[] = [];

  ventasMensualesPorSucursal: {
    name: string;
    series: { name: string; value: number }[];
  }[] = [];
  // Calcular total general
  totalVentas = this.ventas.reduce((acc, v) => acc + v.total, 0);
  detalleVentas: DetalleVentaMadera[] = [];
  mostradas: DetalleVentaMadera[] = [];
  mostradasV: Venta[] = [];
  constructor(private svc: ServiceService) {}

  ngOnInit() {
    this.loadData();
    this.obtenerDetalleVentas();
    this.obtenerVentas();
  }
  obtenerDetalleVentas(): void {
    this.svc.getDetalleVentaMadera().subscribe((datos) => {
      this.detalleVentas = datos;
      this.mostradas = datos;
    });
  }
  obtenerVentas(): void {
    this.svc.getVentas().subscribe((datos) => {
      this.ventas = datos;
      this.mostradasV = datos;
    });
  }
  private loadData() {
    this.svc.getSucursales().subscribe((s) => (this.sucursales = s));
    this.svc.getUsuarios().subscribe((u) => (this.usuarios = u));

    this.svc
      .getVentas()
      .pipe(map((v) => (this.ventas = v)))
      .subscribe(() => this.processVentas());

    this.svc
      .getProductoMaderas()
      .pipe(map((p) => (this.productos = p)))
      .subscribe(() => this.processStock());

    this.svc
      .getDetalleVentaMadera()
      .pipe(map((d) => (this.detalles = d)))
      .subscribe(() => this.processDetalles());

    this.svc
      .getFacturaRecibo()
      .pipe(map((f) => (this.facturas = f)))
      .subscribe(() => this.processFacturas());
  }

  private processVentas() {
    const mapSuc = new Map<number, number>();
    const mapFecha = new Map<string, number>();
    const mapVnd = new Map<number, number>();
    const mapSucursalMes = new Map<string, Map<string, number>>();

    this.ventas.forEach((v) => {
      const idSuc = v.sucursal.id;
      const idVend = v.vendedor.id;
      const fecha = new Date(v.fecha);
      const mes = fecha.toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });

      const sucursal = v.sucursal.nombre;

      // Mapas por Sucursal y Mes
      if (!mapSucursalMes.has(sucursal)) {
        mapSucursalMes.set(sucursal, new Map());
      }
      const mesMap = mapSucursalMes.get(sucursal)!;
      mesMap.set(mes, (mesMap.get(mes) || 0) + v.total);

      // Totales generales
      mapSuc.set(idSuc, (mapSuc.get(idSuc) || 0) + v.total);
      mapFecha.set(mes, (mapFecha.get(mes) || 0) + v.total);
      mapVnd.set(idVend, (mapVnd.get(idVend) || 0) + v.total);
    });

    // Obtener todos los meses únicos
    const allMesesSet = new Set<string>();
    mapSucursalMes.forEach((mesMap) => {
      mesMap.forEach((_, mes) => allMesesSet.add(mes));
    });

    // Ordenar cronológicamente
    const allMesesOrdenados = Array.from(allMesesSet).sort((a, b) => {
      const [mesA, anioA] = a.split(' ');
      const [mesB, anioB] = b.split(' ');
      const dateA = new Date(`${mesA} 1, ${anioA}`);
      const dateB = new Date(`${mesB} 1, ${anioB}`);
      return dateA.getTime() - dateB.getTime();
    });

    // Tomar los 2 últimos meses
    const ultimosDosMeses = allMesesOrdenados.slice(-2);

    // Convertir Map a formato ngx-charts
    this.ventasPorSucursal = Array.from(mapSuc.entries()).map(([id, val]) => {
      const suc = this.sucursales.find((s) => s.id === id);
      return { name: suc?.nombre || `#${id}`, value: val };
    });
    // Calcular total general
    const totalVentas = this.ventas.reduce((acc, v) => acc + v.total, 0);

    this.ventasPorSucursal.push({
      name: 'Total General',
      value: totalVentas,
    });

    this.ventasPorFecha = [
      {
        name: 'Ventas',
        series: Array.from(mapFecha.entries())
          .filter(([mes]) => ultimosDosMeses.includes(mes))
          .map(([mes, total]) => ({ name: mes, value: total })),
      },
    ];
    // Agregar al final de ventasPorFecha (como un nuevo punto o una serie separada)
    this.ventasPorFecha.push({
      name: 'Total',
      series: [
        {
          name: 'Total',
          value: totalVentas,
        },
      ],
    });

    this.ventasPorVendedor = Array.from(mapVnd.entries()).map(([id, val]) => {
      const vendedor = this.usuarios.find((u) => u.id === id);
      return { name: vendedor?.nombre || `#${id}`, value: val };
    });

    this.ventasMensualesPorSucursal = Array.from(mapSucursalMes.entries()).map(
      ([sucursal, mesMap]) => ({
        name: sucursal,
        series: ultimosDosMeses.map((mes) => ({
          name: mes,
          value: mesMap.get(mes) || 0,
        })),
      }),
    );
  }

  private processDetalles() {
    const mapCant = new Map<number, number>();
    const mapIngreso = new Map<number, number>();
    const mapVol = new Map<number, number>();
    const rentabilidadMap = new Map<string, number>();
    // Agrupar cantidad vendida por sucursal y producto
    const mapSucursalProd = new Map<string, Map<string, number>>();

    this.detalles.forEach((d) => {
      const idProd = d.producto.id;
      const especie = d.producto.especie;
      const ingreso = d.subtotal;
      const cantidad = d.cantidad_vendida;
      const volumen = d.producto.volumen * cantidad;
      const ganancia =
        (d.precio_unitario - d.producto.precio_compra) * cantidad;
      const sucursal = d.venta.sucursal.nombre;
      const producto = d.producto.especie;

      if (!mapSucursalProd.has(sucursal)) {
        mapSucursalProd.set(sucursal, new Map());
      }
      const prodMap = mapSucursalProd.get(sucursal)!;
      prodMap.set(producto, (prodMap.get(producto) || 0) + cantidad);

      mapCant.set(idProd, (mapCant.get(idProd) || 0) + cantidad);
      mapIngreso.set(idProd, (mapIngreso.get(idProd) || 0) + ingreso);
      mapVol.set(idProd, (mapVol.get(idProd) || 0) + volumen);
      rentabilidadMap.set(
        especie,
        (rentabilidadMap.get(especie) || 0) + ganancia,
      );
    });

    this.productosMasVendidos = Array.from(mapCant.entries()).map(
      ([id, val]) => ({
        name: this.productos.find((p) => p.id === id)?.especie || `#${id}`,
        value: val,
      }),
    );

    this.ingresosPorProducto = Array.from(mapIngreso.entries()).map(
      ([id, val]) => ({
        name: this.productos.find((p) => p.id === id)?.especie || `#${id}`,
        value: val,
      }),
    );

    this.volumenPorProducto = Array.from(mapVol.entries()).map(([id, val]) => ({
      name: this.productos.find((p) => p.id === id)?.especie || `#${id}`,
      value: val,
    }));

    this.rentabilidadProducto = Array.from(rentabilidadMap.entries()).map(
      ([name, value]) => ({
        name,
        value,
      }),
    );
    // Convertir a formato ngx-charts
    this.productosMasVendidosPorSucursal = Array.from(
      mapSucursalProd.entries(),
    ).map(([sucursal, productosMap]) => ({
      name: sucursal,
      series: Array.from(productosMap.entries()).map(([prod, cant]) => ({
        name: `${prod} (Total: ${cant})`,
        value: cant,
      })),
    }));
    this.productosMasVendidos = Array.from(mapCant.entries()).map(
      ([id, val]) => {
        const especie =
          this.productos.find((p) => p.id === id)?.especie || `#${id}`;
        return {
          name: `${especie} (Total: ${val})`, // ✅ Añadimos el total vendido al nombre
          value: val,
        };
      },
    );

    const vendidos = new Set(this.detalles.map((d) => d.producto.id));
    this.productosSinMovimiento = this.productos.filter(
      (p) => !vendidos.has(p.id),
    );
  }

  private processStock() {
    const mapStock = new Map<string, { cantidad: number; volumen: number }>();

    this.productos.forEach((p) => {
      const key = p.sucursal.nombre;
      const entry = mapStock.get(key) || { cantidad: 0, volumen: 0 };
      entry.cantidad += p.cantidad;
      entry.volumen += p.volumen * p.cantidad;
      mapStock.set(key, entry);
    });

    this.stockPorSucursal = Array.from(mapStock.entries()).map(
      ([name, obj]) => ({
        name,
        series: [
          { name: 'Cantidad', value: obj.cantidad },
          { name: 'Volumen', value: obj.volumen },
        ],
      }),
    );
  }
  private processFacturas() {
    const totalFacturas = this.facturas.filter(
      (f) => f.tipo === 'factura',
    ).length;
    const totalRecibos = this.facturas.filter(
      (f) => f.tipo === 'recibo',
    ).length;

    this.facturacionPorTipo = [
      { name: 'Facturas', value: totalFacturas },
      { name: 'Recibos', value: totalRecibos },
    ];
  }
}
