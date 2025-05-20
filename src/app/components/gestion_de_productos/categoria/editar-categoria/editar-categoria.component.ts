import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../../services/service.service';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css',
})
export class EditarCategoriaComponent implements OnInit {
  form!: FormGroup;
  categoriaOriginal: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      estado: [true, Validators.required],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoriaService.getCategoriaById(id).subscribe((data) => {
      this.categoriaOriginal = data;
      this.form.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.form.value.id;
      this.categoriaService
        .actualizarCategoria(id, this.form.value)
        .subscribe(() => {
          this.router.navigate(['app-panel-control/listar-categoria']);
        });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-categoria']);
  }

  restablecerFormulario(): void {
    if (this.categoriaOriginal) {
      this.form.patchValue(this.categoriaOriginal);
    }
  }
}
