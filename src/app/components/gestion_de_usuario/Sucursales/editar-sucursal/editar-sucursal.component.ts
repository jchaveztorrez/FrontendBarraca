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
  selector: 'app-editar-sucursal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-sucursal.component.html',
  styleUrl: './editar-sucursal.component.css',
})
export class EditarSucursalComponent implements OnInit {
  form!: FormGroup;
  sucursalOriginal: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sucursalService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      estado: [true, Validators.required],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sucursalService.getSucursalID(id).subscribe((data) => {
      this.sucursalOriginal = data;
      this.form.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.sucursalService.updateSucursal(this.form.value).subscribe(() => {
        this.router.navigate(['app-panel-control/listar-sucursal']);
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-sucursal']);
  }

  restablecerFormulario(): void {
    if (this.sucursalOriginal) {
      this.form.patchValue(this.sucursalOriginal);
    }
  }
}
