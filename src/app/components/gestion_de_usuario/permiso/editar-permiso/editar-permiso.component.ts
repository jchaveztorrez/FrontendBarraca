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
  selector: 'app-editar-permiso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-permiso.component.html',
  styleUrl: './editar-permiso.component.css',
})
export class EditarPermisoComponent implements OnInit {
  form!: FormGroup;
  permisoOriginal: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private permisoService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      estado: [true, Validators.required],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.permisoService.getPermisoID(id).subscribe((data) => {
      this.permisoOriginal = data;
      this.form.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.permisoService.updatePermiso(this.form.value).subscribe(() => {
        this.router.navigate(['app-panel-control/listar-permiso']);
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-permiso']);
  }

  restablecerFormulario(): void {
    if (this.permisoOriginal) {
      this.form.patchValue(this.permisoOriginal);
    }
  }
}
