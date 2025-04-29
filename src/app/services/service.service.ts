import { Injectable } from '@angular/core';
import {
  Sucursal,
  Rol,
  Permiso,
  Usuario,
  UsuarioRolSucursal,
  RolPermiso,
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
    return this.http.get<Sucursal[]>(`${this.apiUrl}sucursal`);
  }
  getSucursalID(id: number): Observable<Sucursal> {
    return this.http.get<Sucursal>(`${this.apiUrl}sucursal/${id}`);
  }

  createSucursal(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.post<Sucursal>(`${this.apiUrl}sucursal/`, sucursal);
  }

  updateSucursal(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.put<Sucursal>(
      `${this.apiUrl}sucursal/${sucursal.id}/`, // Asegúrate de que termine con /
      sucursal,
    );
  }
  deleteSucursal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}sucursal/${id}/`);
  }
  /* realacion la interacion con Rol para (get, post y otros) */
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrl}rol`);
  }
  getRolID(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}rol/${id}`);
  }
  createRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.apiUrl}rol`, rol);
  }
  updateRol(rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}rol/${rol.id}`, rol);
  }
  deleteRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}rol/${id}`);
  }
  /* realacion la interacion con Permiso para (get, post y otros) */
  getPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(`${this.apiUrl}permiso`);
  }
  getPermisoID(id: number): Observable<Permiso> {
    return this.http.get<Permiso>(`${this.apiUrl}permiso/${id}`);
  }
  createPermiso(permiso: Permiso): Observable<Permiso> {
    return this.http.post<Permiso>(`${this.apiUrl}permiso`, permiso);
  }
  updatePermiso(permiso: Permiso): Observable<Permiso> {
    return this.http.put<Permiso>(
      `${this.apiUrl}permiso/${permiso.id}`,
      permiso,
    );
  }
  deletePermiso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}permiso/${id}`);
  }
  /* realacion la interacion con Usuario para (get, post y otros) */
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}usuario`);
  }
  getUsuarioID(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}usuario/${id}`);
  }
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}usuario`, usuario);
  }
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.apiUrl}usuario/${usuario.id}`,
      usuario,
    );
  }
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}usuario/${id}`);
  }
  /* realacion la interacion con UsuarioRolSucursal para (get, post y otros) */
  getUsuarioRolSucursal(): Observable<UsuarioRolSucursal[]> {
    return this.http.get<UsuarioRolSucursal[]>(
      `${this.apiUrl}usuario-rol-sucursal`,
    );
  }
  getUsuarioRolSucursalID(id: number): Observable<UsuarioRolSucursal> {
    return this.http.get<UsuarioRolSucursal>(
      `${this.apiUrl}usuario-rol-sucursal/${id}`,
    );
  }
  createUsuarioRolSucursal(
    usuarioRolSucursal: UsuarioRolSucursal,
  ): Observable<UsuarioRolSucursal> {
    return this.http.post<UsuarioRolSucursal>(
      `${this.apiUrl}usuario-rol-sucursal`,
      usuarioRolSucursal,
    );
  }
  updateUsuarioRolSucursal(
    usuarioRolSucursal: UsuarioRolSucursal,
  ): Observable<UsuarioRolSucursal> {
    return this.http.put<UsuarioRolSucursal>(
      `${this.apiUrl}usuario-rol-sucursal/${usuarioRolSucursal.id}`,
      usuarioRolSucursal,
    );
  }
  deleteUsuarioRolSucursal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}usuario-rol-sucursal/${id}`);
  }
  /* realacion la interacion con RolPermiso para (get, post y otros) */
  getRolPermiso(): Observable<RolPermiso[]> {
    return this.http.get<RolPermiso[]>(`${this.apiUrl}rol-permiso`);
  }
  getRolPermisoID(id: number): Observable<RolPermiso> {
    return this.http.get<RolPermiso>(`${this.apiUrl}rol-permiso/${id}`);
  }
  createRolPermiso(rolPermiso: RolPermiso): Observable<RolPermiso> {
    return this.http.post<RolPermiso>(`${this.apiUrl}rol-permiso`, rolPermiso);
  }
  updateRolPermiso(rolPermiso: RolPermiso): Observable<RolPermiso> {
    return this.http.put<RolPermiso>(
      `${this.apiUrl}rol-permiso/${rolPermiso.id}`,
      rolPermiso,
    );
  }
  deleteRolPermiso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}rol-permiso/${id}`);
  }
}
