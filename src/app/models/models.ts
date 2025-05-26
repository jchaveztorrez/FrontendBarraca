/*  E:\BarracaSantaCruz\FrontendBarraca\src\app\models\models.ts*/
/*  */
export interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  estado: boolean;
}
export interface Rol {
  id: number;
  nombre: string;
  estado: boolean;
}
export interface Permiso {
  id: number;
  nombre: string;
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
export interface UsuarioRolSucursal {
  id: number;
  rol: Rol;
  sucursal: Sucursal;
  usuario: Usuario;
}
export interface RolPermiso {
  id: number;
  rol: Rol;
  permiso: Permiso;
}
//categoria
export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
}
/// ProductoMadera
export interface ProductoMadera {
  id: number;
  especie: string;
  categoria: Categoria;
  ancho: number;
  espesor: number;
  largo: number;
  cantidad: number;
  volumen: number;
  precio_compra: number;
  precio_barraca: number;
  precio_venta: number;
  sucursal: Sucursal;
  fecha_registro: Date;
  fecha_modificacion: Date;
  estado: boolean;
}

// Venta

export interface Venta {
  id: number;
  total: number;
  fecha: Date;
  vendedor: Usuario;
  sucursal: Sucursal;
}
// Detalle de Venta Madera
export interface DetalleVentaMadera {
  id: number;
  venta: Venta;
  producto: ProductoMadera;
  cantidad_vendida: number;
  precio_unitario: number;
  subtotal: number;
}

// Factura o Recibo
export interface FacturaRecibo {
  id: number;
  venta: Venta;
  tipo: 'factura' | 'recibo';
  nombre_cliente: string;
  ci_nit: string;
  fecha_emision: Date;
  total: number;
}
