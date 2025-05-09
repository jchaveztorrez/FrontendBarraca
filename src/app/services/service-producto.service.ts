import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DetalleVentaMadera,
  FacturaRecibo,
  ProductoMadera,
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
  createVenta(Venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(`${this.apiUrl}venta/`, Venta);
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
  createDetalleVentaMadera(
    DetalleVentaMadera: DetalleVentaMadera,
  ): Observable<DetalleVentaMadera> {
    return this.http.post<DetalleVentaMadera>(
      `${this.apiUrl}detalleventamadera/`,
      DetalleVentaMadera,
    );
  }
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
