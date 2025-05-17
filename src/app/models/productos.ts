/* E:\BarracaSantaCruz\FrontendBarraca\src\app\models\productos.ts */

export interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  estado: boolean;
}
export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  telefono: string;
  correo: string;
  password: string;
  ci: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  estado: boolean;
  imagen_url: string;
}
export interface ProductoMadera {
  id: number;
  especie: string;
  ancho: number;
  espesor: number;
  largo: number;
  cantidad: number;
  volumen: number;
  precio_compra: number;
  precio_barraca: number;
  precio_venta: number;
  sucursal: Sucursal; // Asocia con la sucursal
  fecha_registro: string;
  fecha_modificacion: string;
  estado: boolean;
}

export interface Venta {
  id: number;
  fecha: string;
  vendedor: Usuario; // No "cliente"
  sucursal: Sucursal;
  detalles: DetalleVentaMadera[]; // relación related_name
}

export interface DetalleVentaMadera {
  id: number;
  venta: Venta;
  producto: ProductoMadera;
  cantidad_vendida: number;
  precio_unitario: number;
  subtotal: number;
}

export interface FacturaRecibo {
  id: number;
  tipo: 'factura' | 'recibo';
  nombre_cliente: string;
  ci_nit: string;
  fecha_emision: string;
  total: number;
  venta: Venta;
}
