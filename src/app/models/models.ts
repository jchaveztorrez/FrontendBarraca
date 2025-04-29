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
  usuario: Usuario;
  rol: Rol;
  sucursal: Sucursal;
}
export interface RolPermiso {
  id: number;
  rol: Rol;
  permiso: Permiso;
}
