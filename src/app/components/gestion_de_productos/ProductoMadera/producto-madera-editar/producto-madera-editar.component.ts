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

@Component({
  selector: 'app-producto-madera-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './producto-madera-editar.component.html',
  styleUrl: './producto-madera-editar.component.css',
})
export class ProductoMaderaEditarComponent {
  form: FormGroup;
  sucursal: Sucursal[] = [];
  categoria: Categoria[] = [];
  id!: number;

  constructor(
    private fb: FormBuilder,
    private servisio: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      id: [''], // se necesita para update
      especie: ['', Validators.required],
      ancho: ['', Validators.required],
      espesor: ['', Validators.required],
      largo: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio_compra: ['', Validators.required],
      precio_barraca: ['', Validators.required],
      precio_venta: ['', Validators.required],
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
      });
    });
  }

  editar() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData); // Verifica que los datos se están enviando correctamente
      this.servisio.updateProductoMadera(formData).subscribe({
        next: () => {
          alert('Producto de madera actualizado correctamente');
          this.router.navigate(['app-panel-control/listar-producto-madera']);
        },
        error: (err) => {
          console.error(err); // Imprime el error para depuración
          alert('Error al actualizar el producto de madera');
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
}
