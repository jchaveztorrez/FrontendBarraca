import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetalleVentaMadera, Venta } from '../../models/models';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent implements OnInit {
  ventas: Venta[] = [];
  ventasFiltradas: Venta[] = [];
  totalVentas: number = 0;
  filtroVentas: string = 'dia';
  fechaInicio: string = '';
  fechaFin: string = '';
  fechaGeneracion: Date = new Date();

  constructor(private service: ServiceService) {}

  mostradas: DetalleVentaMadera[] = [];
  detalleVentas: DetalleVentaMadera[] = [];

  vendedorFiltro: string = '';
  sucursalFiltro: string = '';
  categoriaFiltro: string = '';
  especieFiltro: string = '';

  vendedores: string[] = [];
  sucursales: string[] = [];
  categorias: string[] = [];
  especies: string[] = [];
  vendedorSucursalMap: { [nombreCompleto: string]: string } = {};

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas(): void {
    this.service.getVentas().subscribe((ventas) => {
      this.ventas = ventas;

      // Una vez cargadas las ventas, cargamos los detalles
      this.service.getDetalleVentaMadera().subscribe((detalles) => {
        this.detalleVentas = detalles;

        // Generar el reporte una vez que ambos están cargados
        this.generarReporteVentas();
      });
    });
  }

  obtenerDetalleVentas(): void {
    this.service.getDetalleVentaMadera().subscribe((datos) => {
      this.detalleVentas = datos;
      this.mostradas = datos;
    });
  }

  generarReporteVentas(): void {
    this.ventasFiltradas = this.ventas.filter((venta) => {
      const fecha = new Date(venta.fecha);
      if (this.fechaInicio && this.fechaFin) {
        const inicio = new Date(this.fechaInicio);
        const fin = new Date(this.fechaFin);
        fin.setHours(23, 59, 59, 999);
        return fecha >= inicio && fecha <= fin;
      }
      return true;
    });

    const ventaIds = this.ventasFiltradas.map((v) => v.id);

    // Limpiar mapa
    this.vendedorSucursalMap = {};

    // Filtrar detalles y construir mapa vendedor -> sucursal
    this.mostradas = this.detalleVentas.filter((detalle) => {
      const venta = detalle.venta;
      const nombreVendedor = `${venta.vendedor.nombre} ${venta.vendedor.apellido}`;
      const nombreSucursal = venta.sucursal.nombre;

      this.vendedorSucursalMap[nombreVendedor] = nombreSucursal;

      // Filtro por vendedor y actualizar sucursal si aplica
      if (this.vendedorFiltro && nombreVendedor !== this.vendedorFiltro) {
        return false;
      }

      // Si se seleccionó un vendedor, forzar que sucursalFiltro se actualice
      if (this.vendedorFiltro) {
        this.sucursalFiltro = this.vendedorSucursalMap[this.vendedorFiltro];
      }

      // Filtro por sucursal y actualizar lista de vendedores válidos
      if (this.sucursalFiltro && nombreSucursal !== this.sucursalFiltro) {
        return false;
      }

      if (
        this.categoriaFiltro &&
        detalle.producto.categoria.nombre !== this.categoriaFiltro
      ) {
        return false;
      }

      if (
        this.especieFiltro &&
        detalle.producto.especie !== this.especieFiltro
      ) {
        return false;
      }

      return ventaIds.includes(venta.id);
    });

    // Actualizar listas únicas (considerando filtros aplicados)
    const vendedoresMostrados = this.mostradas.map(
      (d) => `${d.venta.vendedor.nombre} ${d.venta.vendedor.apellido}`,
    );
    this.vendedores = Array.from(new Set(vendedoresMostrados));

    const sucursalesMostradas = this.mostradas.map(
      (d) => d.venta.sucursal.nombre,
    );
    this.sucursales = Array.from(new Set(sucursalesMostradas));

    this.categorias = Array.from(
      new Set(this.mostradas.map((d) => d.producto.categoria.nombre)),
    );

    this.especies = Array.from(
      new Set(this.mostradas.map((d) => d.producto.especie)),
    );

    // Calcular total
    this.totalVentas = this.mostradas.reduce((suma, detalle) => {
      return suma + (Number(detalle.subtotal) || 0);
    }, 0);

    this.fechaGeneracion = new Date();
  }

  private generarPDF(elementId: string, action: 'download' | 'print'): void {
    const data = document.getElementById(elementId);
    if (data) {
      html2canvas(data).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const logoUrl =
          'https://res.cloudinary.com/dtqv5ejlr/image/upload/v1749490019/logoBarraca1_x4slj1.png';

        const ahora = new Date();
        const fechaHora = `${ahora.getDate()}/${ahora.getMonth() + 1}/${ahora.getFullYear()} ${ahora.getHours()}:${ahora.getMinutes().toString().padStart(2, '0')}`;

        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = logoUrl;

        img.onload = () => {
          const logoWidth = 30;
          const logoHeight = 30;
          const marginRight = 15;
          const marginTop = 15;

          const logoX =
            pdf.internal.pageSize.getWidth() - logoWidth - marginRight;
          const logoY = marginTop;

          pdf.addImage(img, 'PNG', logoX, logoY, logoWidth, logoHeight);

          pdf.setFontSize(16);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Reporte de Ventas', 105, 20, { align: 'center' });

          pdf.setDrawColor(0, 0, 0);
          pdf.line(
            20,
            25,
            pdf.internal.pageSize.getWidth() - marginRight - logoWidth - 5,
            25,
          );

          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'normal');
          pdf.text('Barraca: Torrez', 20, 35);
          pdf.text(`Fecha: ${fechaHora}`, 20, 45);

          const contentStartY = 55;

          const imgProps = (pdf as any).getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(imgData, 'PNG', 10, contentStartY, pdfWidth, pdfHeight);

          if (action === 'download') {
            pdf.save('reporte_ventas.pdf');
          } else if (action === 'print') {
            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.top = '-9999px';
            iframe.src = url;
            document.body.appendChild(iframe);
            iframe.contentWindow?.print();
          }
        };
      });
    }
  }

  descargarPDF(elementId: string) {
    this.generarPDF(elementId, 'download');
  }

  imprimirPDF(elementId: string) {
    this.generarPDF(elementId, 'print');
  }

  limpiarFiltros(): void {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.vendedorFiltro = '';
    this.sucursalFiltro = '';
    this.categoriaFiltro = '';
    this.especieFiltro = '';
    this.generarReporteVentas();
  }
}
