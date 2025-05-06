export interface UsuarioForestal {
  id: number;
  nombre: string;
  ci: string;
  comunidad: string;
  telefono: string;
}

export interface Transporte {
  id: number;
  placa: string;
  nombre_conductor: string;
  ci_conductor: string;
  licencia: string;
}

export interface Romaneo {
  id: number;
  fecha: Date;
  usuario_forestal: UsuarioForestal;
  transporte: Transporte;
  observacion: string; // Opcional
}

export interface Inventario {
  id: number;
  especie: string;
  ancho: number;
  espesor: number;
  largo: number;
  cantidad_total: number;
  volumen_total: number; // corregido: estaba con "V" mayúscula
  precio_compra: number;
  precio_venta: number;
}

export interface DetalleRomaneo {
  id: number;
  romaneo: Romaneo;
  especie: string;
  ancho: number;
  espesor: number;
  largo: number;
  cantidad: number;
  volumen: number;
  precio_compra: number;
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

export interface Venta {
  id: number;
  fecha: Date;
  cliente: string;
  observacion: string;
  usuario: Usuario;
}

export interface DetalleVenta {
  id: number;
  venta: Venta;
  inventario: Inventario;
  cantidad: number;
  volumen: number;
  precio_venta_unitario: number;
  subtotal: number;
}
