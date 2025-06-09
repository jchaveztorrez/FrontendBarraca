import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../../services/service.service';
import { Categoria, Sucursal } from '../../../../models/models';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../Mensajes/error/error.component';
import { OkComponent } from '../../../Mensajes/ok/ok.component';
import { CustomValidatorsService } from '../../../../shared/validators/custom-validators.service';

@Component({
  selector: 'app-producto-madera-editar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorComponent,
    OkComponent,
  ],
  templateUrl: './producto-madera-editar.component.html',
  styleUrl: './producto-madera-editar.component.css',
})
export class ProductoMaderaEditarComponent {
  form: FormGroup;
  sucursal: Sucursal[] = [];
  categoria: Categoria[] = [];
  id!: number;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private servisio: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private customValidators: CustomValidatorsService,
  ) {
    this.form = this.fb.group({
      id: [''], // se necesita para update
      especie: [
        '',
        [
          Validators.required,
          this.customValidators.limpiarEspaciosValidator(),
          this.customValidators.formatoEspecie(),
        ],
      ],
      ancho: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          this.customValidators.soloPositivosNumericos(),
        ],
      ],
      espesor: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          this.customValidators.soloPositivosNumericos(),
        ],
      ],
      largo: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          this.customValidators.soloPositivosNumericos(),
        ],
      ],
      cantidad: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          this.customValidators.soloPositivosNumericos(),
        ],
      ],
      precio_compra: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          this.customValidators.soloPositivosNumericos(),
        ],
      ],
      precio_barraca: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          this.customValidators.soloPositivosNumericos(),
        ],
      ],
      precio_venta: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          this.customValidators.soloPositivosNumericos(),
        ],
      ],
      sucursal: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarProducto();
    this.loadSucursal();
    this.loadRelacion();
    this.loadCategoria();
  }

  cargarProducto(): void {
    this.servisio.getProductoMaderaID(this.id).subscribe((data) => {
      this.form.patchValue(data);
    });
  }

  loadSucursal() {
    this.servisio.getSucursales().subscribe((data) => (this.sucursal = data));
  }
  loadCategoria() {
    this.servisio.getCategorias().subscribe((data) => (this.categoria = data));
  }
  loadRelacion() {
    this.servisio.getProductoMaderaID(this.id).subscribe((data) => {
      this.form.patchValue({
        id: data.id,
        sucursal: data.sucursal.id, // Asegúrate de que estamos asignando el ID de la sucursal correctamente
        categoria: data.categoria.id, // Asegúrate de que estamos asignando el ID de la categoría correctamente
      });
    });
  }

  editar() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData); // Verifica que los datos se están enviando correctamente
      this.servisio.updateProductoMadera(formData).subscribe({
        next: () => {
          this.mensajeExito = 'Producto de madera actualizado correctamente';
        },
        error: (err) => {
          console.error(err); // Imprime el error para depuración
          this.mensajeError = 'Error al actualizar el producto de madera';
        },
      });
    }
  }

  volver() {
    this.router.navigate(['app-panel-control/listar-producto-madera']);
  }
  limpiarFormulario(): void {
    this.loadRelacion(); // restablece el formulario a su estado original
  }
  manejarOk() {
    this.mensajeExito = '';
    this.router.navigate(['app-panel-control/listar-producto-madera']);
  }

  manejarError() {
    this.mensajeError = '';
  }
}
