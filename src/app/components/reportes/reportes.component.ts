import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Venta } from '../../models/models';
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

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas(): void {
    this.service.getVentas().subscribe((datos) => {
      this.ventas = datos;
      this.generarReporteVentas();
    });
  }

  generarReporteVentas(): void {
    const hoy = new Date();
    this.ventasFiltradas = this.ventas.filter((venta) => {
      const fecha = new Date(venta.fecha);

      switch (this.filtroVentas) {
        case 'dia':
          return (
            fecha.getDate() === hoy.getDate() &&
            fecha.getMonth() === hoy.getMonth() &&
            fecha.getFullYear() === hoy.getFullYear()
          );
        case 'semana': {
          const primerDiaSemana = new Date(hoy);
          primerDiaSemana.setDate(hoy.getDate() - hoy.getDay());
          const ultimoDiaSemana = new Date(primerDiaSemana);
          ultimoDiaSemana.setDate(primerDiaSemana.getDate() + 6);
          return fecha >= primerDiaSemana && fecha <= ultimoDiaSemana;
        }
        case 'mes':
          return (
            fecha.getMonth() === hoy.getMonth() &&
            fecha.getFullYear() === hoy.getFullYear()
          );
        case 'anio':
          return fecha.getFullYear() === hoy.getFullYear();
        case 'rango':
          if (!this.fechaInicio || !this.fechaFin) return false;
          const inicio = new Date(this.fechaInicio);
          const fin = new Date(this.fechaFin);
          fin.setHours(23, 59, 59, 999); // incluir todo el día
          return fecha >= inicio && fecha <= fin;
        default:
          return true;
      }
    });

    // Sumar el total de las ventas filtradas
    this.totalVentas = this.ventasFiltradas.reduce((suma, venta) => {
      const totalVenta = Number(venta.total);
      return !isNaN(totalVenta) ? suma + totalVenta : suma;
    }, 0);

    // Establecer la fecha de generación del reporte
    this.fechaGeneracion = new Date(); // Fecha y hora actual
  }

  descargarPDF(elementId: string) {
    const data = document.getElementById(elementId);
    if (data) {
      html2canvas(data).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const logoUrl =
          'https://res.cloudinary.com/dtqv5ejlr/image/upload/v1749490019/logoBarraca1_x4slj1.png';

        // Obtener fecha y hora actual del sistema
        const ahora = new Date();
        const fechaHora = `${ahora.getDate()}/${ahora.getMonth() + 1}/${ahora.getFullYear()} ${ahora.getHours()}:${ahora.getMinutes().toString().padStart(2, '0')}`;

        // Cargar el logo
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = logoUrl;

        img.onload = () => {
          // Tamaño y posición del logo (ajustables)
          const logoWidth = 30; // Ancho en mm
          const logoHeight = 30; // Alto en mm
          const marginRight = 15; // Margen derecho en mm
          const marginTop = 15; // Margen superior en mm

          // Posicionar el logo en esquina superior derecha
          const logoX =
            pdf.internal.pageSize.getWidth() - logoWidth - marginRight;
          const logoY = marginTop;

          // Agregar logo
          pdf.addImage(img, 'PNG', logoX, logoY, logoWidth, logoHeight);

          // Configuración del encabezado
          pdf.setFontSize(16);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Reporte de Ventas', 105, 20, { align: 'center' });

          // Línea decorativa (ajustada para no chocar con el logo)
          pdf.setDrawColor(0, 0, 0);
          pdf.line(
            20,
            25,
            pdf.internal.pageSize.getWidth() - marginRight - logoWidth - 5,
            25,
          );

          // Información de Barraca y Fecha/Hora
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'normal');
          pdf.text('Barraca: Torrez', 20, 35);
          pdf.text(`Fecha: ${fechaHora}`, 20, 45);

          // Calcular posición del contenido (tabla)
          const contentStartY = 55; // Espacio después del encabezado

          // Agregar contenido de la tabla
          const imgProps = (pdf as any).getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // -20 para márgenes laterales
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(imgData, 'PNG', 10, contentStartY, pdfWidth, pdfHeight);

          pdf.save('reporte_ventas.pdf');
        };

        img.onerror = () => {
          console.error('Error al cargar el logo');
          // Generar PDF sin logo manteniendo el formato
          pdf.setFontSize(16);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Reporte de Ventas', 105, 20, { align: 'center' });
          pdf.line(20, 25, 190, 25);
          pdf.setFontSize(12);
          pdf.text('Barraca: Torrez', 20, 35);
          pdf.text(`Fecha: ${fechaHora}`, 20, 45);
          const imgProps = (pdf as any).getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 10, 55, pdfWidth, pdfHeight);
          pdf.save('reporte_ventas.pdf');
        };
      });
    }
  }
}
