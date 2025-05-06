import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  DetalleRomaneo,
  DetalleVenta,
  Inventario,
  Romaneo,
  Transporte,
  UsuarioForestal,
  Venta,
} from '../models/productos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceProductoService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  /* servicios de productos */
  getUsuarioForestals(): Observable<UsuarioForestal[]> {
    return this.http.get<UsuarioForestal[]>(`${this.apiUrl}usuarioForestal/`);
  }
  getUsuarioForestalID(id: number): Observable<UsuarioForestal> {
    return this.http.get<UsuarioForestal>(
      `${this.apiUrl}usuarioForestal/${id}/`,
    );
  }
  createUsuarioForestal(
    UsuarioForestal: UsuarioForestal,
  ): Observable<UsuarioForestal> {
    return this.http.post<UsuarioForestal>(
      `${this.apiUrl}usuarioForestal/`,
      UsuarioForestal,
    );
  }
  updateUsuarioForestal(
    UsuarioForestal: UsuarioForestal,
  ): Observable<UsuarioForestal> {
    return this.http.put<UsuarioForestal>(
      `${this.apiUrl}usuarioForestal/${UsuarioForestal.id}/`,
      UsuarioForestal,
    );
  }
  getTransportees(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(`${this.apiUrl}transporte/`);
  }
  getTransporteID(id: number): Observable<Transporte> {
    return this.http.get<Transporte>(`${this.apiUrl}transporte/${id}/`);
  }
  createTransporte(Transporte: Transporte): Observable<Transporte> {
    return this.http.post<Transporte>(`${this.apiUrl}transporte/`, Transporte);
  }
  updateTransporte(Transporte: Transporte): Observable<Transporte> {
    return this.http.put<Transporte>(
      `${this.apiUrl}transporte/${Transporte.id}/`,
      Transporte,
    );
  }
  getRomaneoes(): Observable<Romaneo[]> {
    return this.http.get<Romaneo[]>(`${this.apiUrl}romaneo/`);
  }
  getRomaneoID(id: number): Observable<Romaneo> {
    return this.http.get<Romaneo>(`${this.apiUrl}romaneo/${id}/`);
  }

  createRomaneo(Romaneo: Romaneo): Observable<Romaneo> {
    return this.http.post<Romaneo>(`${this.apiUrl}romaneo/`, Romaneo);
  }
  updateRomaneo(Romaneo: Romaneo): Observable<Romaneo> {
    return this.http.put<Romaneo>(
      `${this.apiUrl}romaneo/${Romaneo.id}/`,
      Romaneo,
    );
  }
  getInventarioes(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(`${this.apiUrl}inventario/`);
  }
  getInventarioID(id: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.apiUrl}inventario/${id}/`);
  }
  createInventario(Inventario: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(`${this.apiUrl}inventario/`, Inventario);
  }
  updateInventario(Inventario: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(
      `${this.apiUrl}inventario/${Inventario.id}/`,
      Inventario,
    );
  }
  getDetalleRomaneoes(): Observable<DetalleRomaneo[]> {
    return this.http.get<DetalleRomaneo[]>(`${this.apiUrl}detalleRomaneo/`);
  }
  getDetalleRomaneoID(id: number): Observable<DetalleRomaneo> {
    return this.http.get<DetalleRomaneo>(`${this.apiUrl}detalleRomaneo/${id}/`);
  }
  createDetalleRomaneo(
    DetalleRomaneo: DetalleRomaneo,
  ): Observable<DetalleRomaneo> {
    return this.http.post<DetalleRomaneo>(
      `${this.apiUrl}detalleRomaneo/`,
      DetalleRomaneo,
    );
  }
  updateDetalleRomaneo(
    DetalleRomaneo: DetalleRomaneo,
  ): Observable<DetalleRomaneo> {
    return this.http.put<DetalleRomaneo>(
      `${this.apiUrl}detalleRomaneo/${DetalleRomaneo.id}/`,
      DetalleRomaneo,
    );
  }
  getVentaes(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiUrl}venta/`);
  }
  getVentaID(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}venta/${id}/`);
  }
  createVenta(Venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(`${this.apiUrl}venta/`, Venta);
  }

  updateVenta(Venta: Venta): Observable<Venta> {
    return this.http.put<Venta>(`${this.apiUrl}venta/${Venta.id}/`, Venta);
  }
  getDetalleVentaes(): Observable<DetalleVenta[]> {
    return this.http.get<DetalleVenta[]>(`${this.apiUrl}detalleVenta/`);
  }
  getDetalleVentaID(id: number): Observable<DetalleVenta> {
    return this.http.get<DetalleVenta>(`${this.apiUrl}detalleVenta/${id}/`);
  }
  createDetalleVenta(DetalleVenta: DetalleVenta): Observable<DetalleVenta> {
    return this.http.post<DetalleVenta>(
      `${this.apiUrl}detalleVenta/`,
      DetalleVenta,
    );
  }
  updateDetalleVenta(DetalleVenta: DetalleVenta): Observable<DetalleVenta> {
    return this.http.put<DetalleVenta>(
      `${this.apiUrl}detalleVenta/${DetalleVenta.id}/`,
      DetalleVenta,
    );
  }
}
