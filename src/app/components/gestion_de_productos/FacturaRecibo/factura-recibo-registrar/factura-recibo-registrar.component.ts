import { Component, OnInit } from '@angular/core';
import {
  DetalleVentaMadera,
  FacturaRecibo,
  Venta,
} from '../../../../models/models';
import { ServiceService } from '../../../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-factura-recibo-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factura-recibo-registrar.component.html',
  styleUrls: ['./factura-recibo-registrar.component.css'],
})
export class FacturaReciboRegistrarComponent implements OnInit {
  ventas: Venta[] = [];
  ventasMostradas: Venta[] = [];
  ventaReciente: Venta | null = null;
  busquedaVentas: string = '';
  modoFormulario: 'lista' | 'factura' | 'recibo' = 'lista';
  ventaSeleccionada: Venta | null = null;
  tipoDocumentoSeleccionado: 'factura' | 'recibo' | null = null;
  filtroVenta: 'ultima' | 'todo' = 'todo';

  fechaHoy: Date = new Date();
  aCuenta: number = 0;
  detallesVenta: DetalleVentaMadera[] = [];
  recibos: FacturaRecibo[] = [];
  recibosMostrados: FacturaRecibo[] = [];
  busquedaRecibos: string = '';
  facturasRecibos: FacturaRecibo[] = [];
  coincidenciasCliente: number = 0;

  nombre_cliente: string = '';
  ci_nit: string = '';

  reciboSeleccionado: FacturaRecibo | null = null;

  constructor(
    private service: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.cargarRecibos();

    this.route.queryParams.subscribe((params) => {
      const idVenta = +params['ventaId'];
      const idRecibo = +params['reciboId']; // Nuevo
      const nombre = params['nombre_cliente'];
      const nit = params['ci_nit'];

      if (nombre) this.nombre_cliente = nombre;
      if (nit) this.ci_nit = nit;

      if (idRecibo) {
        this.obtenerReciboPorId(idRecibo);
      }

      if (idVenta) {
        this.filtrarVentaPorId(idVenta);
      }
      if (this.reciboSeleccionado) {
        this.nombre_cliente = this.reciboSeleccionado.nombre_cliente;
        this.ci_nit = this.reciboSeleccionado.ci_nit;
      }
    });

    this.cargarVentas();
    this.filtroVenta = 'todo';
    this.filtrarVentas();
  }

  obtenerReciboPorId(id: number): void {
    this.service.getFacturaRecibo().subscribe((recibos) => {
      this.reciboSeleccionado = recibos.find((r) => r.id === id) || null;

      if (this.reciboSeleccionado) {
        // Asignamos los valores de 'nombre_cliente' y 'ci_nit' a los inputs
        this.nombre_cliente = this.reciboSeleccionado.nombre_cliente;
        this.ci_nit = this.reciboSeleccionado.ci_nit;
      }
    });
  }

  cargarRecibos(): void {
    this.service.getFacturaRecibo().subscribe((data) => {
      this.recibos = data;
      this.recibosMostrados = data;
    });
  }
  cargarRecibo(id: number) {
    this.service.getFacturaReciboID(id).subscribe((recibo) => {
      this.reciboSeleccionado = recibo;
      this.nombre_cliente = recibo.nombre_cliente;
      this.ci_nit = recibo.ci_nit;
    });
  }

  cargarVentas(): void {
    this.service.getVentas().subscribe((data) => {
      this.ventas = data;
      this.filtrarVentas();
    });
  }
  filtrarVentaPorId(idVenta: number): void {
    this.service.getVentas().subscribe((ventas) => {
      this.ventas = ventas;
      const ventaEncontrada = this.ventas.find((v) => v.id === idVenta);
      if (ventaEncontrada) {
        this.generarFactura(ventaEncontrada); // o this.generarRecibo(ventaEncontrada)
      }
    });
  }

  filtrarVentaReciente(): void {
    if (this.ventas.length === 0) {
      this.ventaReciente = null;
      return;
    }

    this.ventaReciente = this.ventas.reduce((ultima, actual) =>
      new Date(actual.fecha) > new Date(ultima.fecha) ? actual : ultima,
    );
  }

  filtrarVentas(): void {
    const texto = this.busquedaVentas.toLowerCase();
    this.ventasMostradas = this.ventas.filter(
      (venta) =>
        `${venta.vendedor.nombre} ${venta.vendedor.apellido}`
          .toLowerCase()
          .includes(texto) || venta.id.toString().includes(texto),
    );

    // Caso 1: Mostrar solo la última venta
    if (this.filtroVenta === 'ultima') {
      if (
        this.ventaReciente &&
        (`${this.ventaReciente.vendedor.nombre} ${this.ventaReciente.vendedor.apellido}`
          .toLowerCase()
          .includes(texto) ||
          this.ventaReciente.id.toString().includes(texto))
      ) {
        this.ventasMostradas = [this.ventaReciente];
      } else {
        this.ventasMostradas = [];
      }
      return;
    }

    // Caso 2: Mostrar todas las ventas filtradas
    this.ventasMostradas = this.ventas
      .filter(
        (venta) =>
          `${venta.vendedor.nombre} ${venta.vendedor.apellido}`
            .toLowerCase()
            .includes(texto) || venta.id.toString().includes(texto),
      )
      .sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
      );
  }

  existeVentaEnLista(idVenta: number): boolean {
    return this.ventasMostradas.some((v) => v.id === idVenta);
  }

  existeReciboParaVenta(idVenta: number): boolean {
    return this.recibos.some((rec) => rec.venta.id === idVenta);
  }

  generarFactura(venta: Venta): void {
    this.ventaSeleccionada = venta;
    this.tipoDocumentoSeleccionado = 'factura';
    this.modoFormulario = 'factura';
    this.nombre_cliente = '';
    this.ci_nit = '';
    this.cargarDetallesVenta(venta.id);
  }

  generarRecibo(venta: Venta): void {
    this.ventaSeleccionada = venta;
    this.tipoDocumentoSeleccionado = 'recibo';
    this.modoFormulario = 'recibo';
    this.nombre_cliente = '';
    this.ci_nit = '';
    this.cargarDetallesVenta(venta.id);
  }

  cancelarFormulario(): void {
    this.modoFormulario = 'lista';
    this.ventaSeleccionada = null;
    this.tipoDocumentoSeleccionado = null;
    this.nombre_cliente = '';
    this.ci_nit = '';
    this.detallesVenta = [];
    this.aCuenta = 0;
  }

  cargarDetallesVenta(ventaId: number): void {
    this.service.getDetalleVentaMadera().subscribe((detalles) => {
      this.detallesVenta = detalles.filter(
        (detalle) => detalle.venta.id === ventaId,
      );
    });
  }

  guardarDocumento(): void {
    if (!this.ventaSeleccionada || !this.tipoDocumentoSeleccionado) return;

    if (!this.nombre_cliente.trim() || !this.ci_nit.trim()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const nuevoDoc: FacturaRecibo = {
      id: 0,
      venta: { id: this.ventaSeleccionada.id } as Venta, // solo el id
      tipo: this.tipoDocumentoSeleccionado,
      nombre_cliente: this.nombre_cliente,
      ci_nit: this.ci_nit,
      fecha_emision: new Date(),
      total: this.ventaSeleccionada.total,
    };

    this.service.createFacturaRecibo(nuevoDoc).subscribe({
      next: (resp) => {
        alert('Documento creado con éxito');
        this.cancelarFormulario();
      },
      error: (err) => {
        console.error('Error al crear el documento:', err);
        alert('Ocurrió un error al registrar el documento');
      },
    });
  }
  soloLetrasNumerosEspacios(event: KeyboardEvent): void {
    const charCode = event.key;

    const regex = /^[a-zA-Z0-9 ]$/;

    if (!regex.test(charCode)) {
      event.preventDefault(); // bloquea el carácter
    }
  }
  evitarPegadoInvalido(event: ClipboardEvent): void {
    const textoPegado = event.clipboardData?.getData('text') || '';
    const regex = /^[a-zA-Z0-9 ]*$/;

    if (!regex.test(textoPegado)) {
      event.preventDefault();
      alert('El texto pegado contiene caracteres no permitidos.');
    }
  }
  soloNumeros(event: KeyboardEvent): void {
    const charCode = event.key;

    // Permite solo dígitos del 0 al 9
    const regex = /^[0-9]$/;

    if (!regex.test(charCode)) {
      event.preventDefault(); // Bloquea cualquier otro carácter
    }
  }
  evitarPegadoInvalidoNumeros(event: ClipboardEvent): void {
    const textoPegado = event.clipboardData?.getData('text') || '';
    const regex = /^[0-9]*$/;

    if (!regex.test(textoPegado)) {
      event.preventDefault();
      alert('Solo se permiten números en este campo.');
    }
  }
  verificarCoincidenciasCliente(): void {
    const nombreTrim = this.nombre_cliente.trim().toLowerCase();
    const ciTrim = this.ci_nit.trim();

    if (!nombreTrim || !ciTrim) {
      this.coincidenciasCliente = 0;
      return;
    }

    this.coincidenciasCliente = this.recibos.filter(
      (recibo) =>
        recibo.nombre_cliente.trim().toLowerCase() === nombreTrim &&
        recibo.ci_nit.trim() === ciTrim,
    ).length;
  }

  obtenerTipoDocumento(venta: Venta): string {
    const tipo = this.tipoDocumentoParaVenta(venta.id);
    if (tipo === 'factura') {
      return 'Factura';
    } else if (tipo === 'recibo') {
      return 'Recibo';
    }
    return '';
  }

  tipoDocumentoParaVenta(id: number): string {
    const facturaRecibo = this.recibos.find((f) => f.venta.id === id);
    return facturaRecibo ? facturaRecibo.tipo : ''; // 'N/A' para las ventas sin tipo de documento
  }
  private generarPDF(imprimirDirecto: boolean): void {
    const elementId = 'contenidoParaPDF';
    const data = document.getElementById(elementId);

    if (!data) return;

    // Ocultar elementos con clase 'no-export' antes de capturar
    const noExportElements = document.querySelectorAll('.no-export');
    noExportElements.forEach(
      (el) => ((el as HTMLElement).style.display = 'none'),
    );

    const options = {
      scale: 2,
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: data.scrollWidth,
      windowHeight: data.scrollHeight,
    };

    html2canvas(data, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Tamaño del PDF en mm: 14 x 22 cm (140 x 220 mm)
      const pdfWidth = 140;
      const pdfHeight = 220;
      const margin = 10;
      const contentWidth = pdfWidth - margin * 2;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });

      // Calcular ancho y alto de la imagen
      const imgWidth = contentWidth; // ancho máximo con margen lateral
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Calcular margen horizontal para centrar la imagen
      const marginX = (pdfWidth - imgWidth) / 2;

      // Margen superior pequeño para que quede casi al tope (por ejemplo 5 mm)
      const marginTop = 5;

      // Agregar imagen centrada horizontalmente y pegada arriba
      pdf.addImage(imgData, 'PNG', marginX, marginTop, imgWidth, imgHeight);

      if (imprimirDirecto) {
        pdf.autoPrint();
        window.open(pdf.output('bloburl'), '_blank');
      } else {
        pdf.save('recibo.pdf');
      }

      // Restaurar visibilidad de elementos ocultos
      noExportElements.forEach(
        (el) => ((el as HTMLElement).style.display = ''),
      );
    });
  }

  // Métodos públicos para llamar
  imprimirDocumentoPDF(): void {
    this.generarPDF(false); // Descargar PDF
  }

  imprimirDocumentoPDFDireto(): void {
    this.generarPDF(true); // Imprimir PDF directo
  }
  manejarOk() {
    this.router.navigate(['app-panel-control/listar-factura-recibo']);
  }
}
