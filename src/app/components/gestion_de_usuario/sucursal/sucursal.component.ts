import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sucursal } from '../../../models/models';
import { ServiceService } from '../../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sucursal',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css'],
})
export class SucursalComponent implements OnInit {
  sucursales: Sucursal[] = [];
  selectedSucursal: Sucursal | null = null;
  newSucursal: Sucursal = { id: 0, nombre: '', direccion: '', estado: true }; // Inicializa el objeto

  constructor(
    private service: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.listarSucursales();
  }

  listarSucursales(): void {
    this.service.getSucursales().subscribe(
      (data) => {
        this.sucursales = data;
      },
      (error) => {
        console.error('Error fetching sucursales', error);
      },
    );
  }

  registrarSucursal(): void {
    this.service.createSucursal(this.newSucursal).subscribe(
      (data) => {
        this.sucursales.push(data);
        this.newSucursal = { id: 0, nombre: '', direccion: '', estado: true }; // Limpiar el formulario
      },
      (error) => {
        console.error('Error creating sucursal', error);
      },
    );
  }

  editarSucursal(sucursal: Sucursal): void {
    this.selectedSucursal = sucursal;
    this.newSucursal = { ...sucursal }; // Copia los datos de la sucursal seleccionada al nuevo objeto
  }

  actualizarSucursal(): void {
    this.service.updateSucursal(this.newSucursal).subscribe(
      (data) => {
        const index = this.sucursales.findIndex((s) => s.id === data.id);
        if (index !== -1) {
          this.sucursales[index] = data;
        }
        this.selectedSucursal = null; // Limpiar la selección
        this.newSucursal = { id: 0, nombre: '', direccion: '', estado: true }; // Limpiar el formulario
      },
      (error) => {
        console.error('Error updating sucursal', error);
      },
    );
  }

  eliminarSucursal(id: number): void {
    this.service.deleteSucursal(id).subscribe(
      () => {
        this.sucursales = this.sucursales.filter((s) => s.id !== id);
      },
      (error) => {
        console.error('Error deleting sucursal', error);
      },
    );
  }
}
