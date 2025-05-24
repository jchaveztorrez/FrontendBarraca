/*  E:\BarracaSantaCruz\FrontendBarraca\src\app\services\service.service.ts*/
import { Injectable } from '@angular/core';
import {
  Sucursal,
  Rol,
  Permiso,
  Usuario,
  UsuarioRolSucursal,
  RolPermiso,
  DetalleVentaMadera,
  FacturaRecibo,
  ProductoMadera,
  Venta,
  Categoria,
} from '../models/models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  /* realizamos laconexion con el serviciode backen URL */
  private apiUrl = 'http://localhost:8000/api/';
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  /* realacion la interacion con Sucurlsal para (get, post y otros) */
  getSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(`${this.apiUrl}sucursal/`);
  }
  getSucursalID(id: number): Observable<Sucursal> {
    return this.http.get<Sucursal>(`${this.apiUrl}sucursal/${id}/`);
  }

  createSucursal(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.post<Sucursal>(`${this.apiUrl}sucursal/`, sucursal);
  }

  updateSucursal(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.put<Sucursal>(
      `${this.apiUrl}sucursal/${sucursal.id}/`,
      sucursal,
    );
  }

  /* realacion la interacion con Rol para (get, post y otros) */
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrl}rol/`);
  }
  getRolID(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}rol/${id}/`);
  }
  createRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.apiUrl}rol/`, rol);
  }
  updateRol(rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}rol/${rol.id}/`, rol);
  }

  /* realacion la interacion con Permiso para (get, post y otros) */
  getPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(`${this.apiUrl}permiso/`);
  }
  getPermisoID(id: number): Observable<Permiso> {
    return this.http.get<Permiso>(`${this.apiUrl}permiso/${id}/`);
  }
  createPermiso(permiso: Permiso): Observable<Permiso> {
    return this.http.post<Permiso>(`${this.apiUrl}permiso/`, permiso);
  }
  updatePermiso(permiso: Permiso): Observable<Permiso> {
    return this.http.put<Permiso>(
      `${this.apiUrl}permiso/${permiso.id}/`,
      permiso,
    );
  }

  /* realacion la interacion con Usuario para (get, post y otros) */
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}usuario/`);
  }
  getUsuarioID(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}usuario/${id}/`);
  }
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}usuario/`, usuario);
  }
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.apiUrl}usuario/${usuario.id}/`,
      usuario,
    );
  }

  /* realacion la interacion con UsuarioRolSucursal para (get, post y otros) */
  getUsuarioRolSucursal(): Observable<UsuarioRolSucursal[]> {
    return this.http.get<UsuarioRolSucursal[]>(
      `${this.apiUrl}usuariorolsucursal/`,
    );
  }
  getUsuarioRolSucursalID(id: number): Observable<UsuarioRolSucursal> {
    return this.http.get<UsuarioRolSucursal>(
      `${this.apiUrl}usuariorolsucursal/${id}/`,
    );
  }
  createUsuarioRolSucursal(
    usuarioRolSucursal: UsuarioRolSucursal,
  ): Observable<UsuarioRolSucursal> {
    return this.http.post<UsuarioRolSucursal>(
      `${this.apiUrl}usuariorolsucursal/`,
      usuarioRolSucursal,
    );
  }
  updateUsuarioRolSucursal(
    usuarioRolSucursal: UsuarioRolSucursal,
  ): Observable<UsuarioRolSucursal> {
    return this.http.put<UsuarioRolSucursal>(
      `${this.apiUrl}usuariorolsucursal/${usuarioRolSucursal.id}/`,
      usuarioRolSucursal,
    );
  }
  deleteUsuarioRolSucursal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}usuariorolsucursal/${id}/`);
  }

  /* realacion la interacion con RolPermiso para (get, post y otros) */
  getRolPermiso(): Observable<RolPermiso[]> {
    return this.http.get<RolPermiso[]>(`${this.apiUrl}rolpermiso/`);
  }
  getRolPermisoID(id: number): Observable<RolPermiso> {
    return this.http.get<RolPermiso>(`${this.apiUrl}rolpermiso/${id}/`);
  }
  createRolPermiso(rolPermiso: RolPermiso): Observable<RolPermiso> {
    return this.http.post<RolPermiso>(`${this.apiUrl}rolpermiso/`, rolPermiso);
  }
  updateRolPermiso(rolPermiso: RolPermiso): Observable<RolPermiso> {
    return this.http.put<RolPermiso>(
      `${this.apiUrl}rolpermiso/${rolPermiso.id}/`,
      rolPermiso,
    );
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}categorias/`);
  }
  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}categorias/${id}/`);
  }
  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}categorias/`, categoria);
  }
  actualizarCategoria(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(
      `${this.apiUrl}categorias/${id}/`,
      categoria,
    );
  }
  actualizarEstadoCategoria(
    id: number,
    estado_categoria: boolean,
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}categorias/${id}/`, {
      estado_categoria: estado_categoria ? 'true' : 'false',
    });
  }

  /* seccion de servicio de productos y detalle de la venta */
  /* servicios de productos */
  getProductoMaderas(): Observable<ProductoMadera[]> {
    return this.http.get<ProductoMadera[]>(`${this.apiUrl}productoMadera/`);
  }
  getProductoMaderaID(id: number): Observable<ProductoMadera> {
    return this.http.get<ProductoMadera>(`${this.apiUrl}productoMadera/${id}/`);
  }
  createProductoMadera(
    ProductoMadera: ProductoMadera,
  ): Observable<ProductoMadera> {
    return this.http.post<ProductoMadera>(
      `${this.apiUrl}productoMadera/`,
      ProductoMadera,
    );
  }
  updateProductoMadera(
    ProductoMadera: ProductoMadera,
  ): Observable<ProductoMadera> {
    return this.http.put<ProductoMadera>(
      `${this.apiUrl}productoMadera/${ProductoMadera.id}/`,
      ProductoMadera,
    );
  }
  /* servicio de ventas */
  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiUrl}venta/`);
  }
  getVentaID(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}venta/${id}/`);
  }

  createVenta(data: {
    vendedor_id: number;
    sucursal_id: number;
    total: number;
  }): Observable<Venta> {
    return this.http.post<Venta>(`${this.apiUrl}venta/`, data);
  }

  updateVenta(Venta: Venta): Observable<Venta> {
    return this.http.put<Venta>(`${this.apiUrl}venta/${Venta.id}/`, Venta);
  }

  /* servicio de DetalleVentaMadera*/
  getDetalleVentaMadera(): Observable<DetalleVentaMadera[]> {
    return this.http.get<DetalleVentaMadera[]>(
      `${this.apiUrl}detalleventamadera/`,
    );
  }
  getDetalleVentaMaderaID(id: number): Observable<DetalleVentaMadera> {
    return this.http.get<DetalleVentaMadera>(
      `${this.apiUrl}detalleventamadera/${id}/`,
    );
  }

  createDetalleVentaMadera(data: {
    venta: number;
    producto: number;
    cantidad_vendida: number;
    precio_unitario: number;
  }): Observable<DetalleVentaMadera> {
    return this.http.post<DetalleVentaMadera>(
      `${this.apiUrl}detalleventamadera/`,
      data,
    );
  }
  /* servicio de DetalleVentaMadera*/
  updateDetalleVentaMadera(
    DetalleVentaMadera: DetalleVentaMadera,
  ): Observable<DetalleVentaMadera> {
    return this.http.put<DetalleVentaMadera>(
      `${this.apiUrl}detalleventamadera/${DetalleVentaMadera.id}/`,
      DetalleVentaMadera,
    );
  }

  /* servicio de FacturaRecibo*/
  getFacturaRecibo(): Observable<FacturaRecibo[]> {
    return this.http.get<FacturaRecibo[]>(`${this.apiUrl}facturarecibo/`);
  }
  getFacturaReciboID(id: number): Observable<FacturaRecibo> {
    return this.http.get<FacturaRecibo>(`${this.apiUrl}facturarecibo/${id}/`);
  }
  createFacturaRecibo(FacturaRecibo: FacturaRecibo): Observable<FacturaRecibo> {
    return this.http.post<FacturaRecibo>(
      `${this.apiUrl}facturarecibo/`,
      FacturaRecibo,
    );
  }
  updateFacturaRecibo(FacturaRecibo: FacturaRecibo): Observable<FacturaRecibo> {
    return this.http.put<FacturaRecibo>(
      `${this.apiUrl}facturarecibo/${FacturaRecibo.id}/`,
      FacturaRecibo,
    );
  }
}
