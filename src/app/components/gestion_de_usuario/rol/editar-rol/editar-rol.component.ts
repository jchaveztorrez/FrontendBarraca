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
  selector: 'app-editar-rol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-rol.component.html',
  styleUrl: './editar-rol.component.css',
})
export class EditarRolComponent implements OnInit {
  form!: FormGroup;
  rolOriginal: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rolService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rolService.getRolID(id).subscribe((data) => {
      this.rolOriginal = data;
      this.form.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.rolService.updateRol(this.form.value).subscribe(() => {
        this.router.navigate(['app-panel-control/listar-rol']);
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-rol']);
  }

  restablecerFormulario(): void {
    if (this.rolOriginal) {
      this.form.patchValue(this.rolOriginal);
    }
  }
}
