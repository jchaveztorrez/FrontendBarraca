import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { from } from 'rxjs';

import { Categoria, ProductoMadera, Sucursal } from '../../../../models/models';
import { Router } from '@angular/router';

import { ServiceService } from '../../../../services/service.service';
import { CommonModule } from '@angular/common';
import { CustomValidatorsService } from '../../../../shared/validators/custom-validators.service';
import { ErrorComponent } from '../../../Mensajes/error/error.component';
import { OkComponent } from '../../../Mensajes/ok/ok.component';

@Component({
  selector: 'app-producto-madera-registrar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorComponent,
    OkComponent,
  ],
  templateUrl: './producto-madera-registrar.component.html',
  styleUrl: './producto-madera-registrar.component.css',
})
export class ProductoMaderaRegistrarComponent {
  form: FormGroup;

  productomadera: ProductoMadera[] = [];
  sucursal: Sucursal[] = [];
  categoria: Categoria[] = [];

  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,

    private servisio: ServiceService,
    private router: Router,
    private customValidators: CustomValidatorsService,
  ) {
    this.form = this.fb.group({
      especie: [
        '',
        [
          Validators.required,
          this.customValidators.limpiarEspaciosValidator(),
          this.customValidators.formatoEspecie(),
        ],
        [this.customValidators.validateProductoMaderaDuplicado()],
      ],
      ancho: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000),
          this.customValidators.NoNegativo(),
          this.customValidators.soloNumeros(),
        ],
      ],
      espesor: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000),
          this.customValidators.NoNegativo(),
          this.customValidators.soloNumeros(),
        ],
      ],
      largo: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000),
          this.customValidators.NoNegativo(),
          this.customValidators.soloNumeros(),
        ],
      ],
      cantidad: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000),
          this.customValidators.NoNegativo(),
          this.customValidators.soloNumeros(),
        ],
      ],
      precio_compra: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000),
          this.customValidators.NoNegativo(),
          this.customValidators.soloNumeros(),
        ],
      ],
      precio_barraca: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000),
          this.customValidators.NoNegativo(),
          this.customValidators.soloNumeros(),
        ],
      ],
      precio_venta: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000),
          this.customValidators.NoNegativo(),
          this.customValidators.soloNumeros(),
        ],
      ],
      sucursal: ['', Validators.required], // Puedes enviar solo el ID
      categoria: ['', Validators.required], // Puedes enviar solo el ID
    });
  }
  ngOnInit(): void {
    this.loadProductoMadera();
    this.loadSucursal();
    this.loadCategoria();
  }
  loadProductoMadera() {
    this.servisio.getProductoMaderas().subscribe((data) => {
      this.productomadera = data;
    });
  }

  loadSucursal() {
    this.servisio.getSucursales().subscribe((data) => {
      this.sucursal = data; // Aquí deberías tener un array de objetos Sucursal
    });
  }
  loadCategoria() {
    this.servisio.getCategorias().subscribe((data) => {
      this.categoria = data; // Aquí deberías tener un array de objetos categoria
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.servisio.createProductoMadera(this.form.value).subscribe({
        next: () => {
          this.mensajeExito = 'Producto de madera registrado correctamente';
        },
        error: () => {
          this.mensajeError =
            'Ocurrió un error al registrar el producto de madera';
          this.mensajeError =
            'Ya existe un producto con esa especie, dimensiones y sucursal';
        },
      });
    }
  }

  volver() {
    this.router.navigate(['app-panel-control/listar-producto-madera']);
  }
  limpiar() {
    this.form.reset();
  }
  manejarOk() {
    this.mensajeExito = '';
    this.router.navigate(['app-panel-control/listar-producto-madera']);
  }

  manejarError() {
    this.mensajeError = '';
  }
}
