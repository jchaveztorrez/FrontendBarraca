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
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css',
})
export class EditarUsuarioComponent implements OnInit {
  form!: FormGroup;
  usuarioOriginal: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      telefono: [null],
      ci: [null],
      fecha_nacimiento: [null],
      imagen_url: ['https://via.placeholder.com/40'],
      estado: [true],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getUsuarioID(id).subscribe((data) => {
      this.usuarioOriginal = data;
      this.form.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.usuarioService.updateUsuario(this.form.value).subscribe(() => {
        this.router.navigate(['app-panel-control/listar-usuario']);
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-usuario']);
  }

  restablecerFormulario(): void {
    if (this.usuarioOriginal) {
      this.form.patchValue(this.usuarioOriginal);
    }
  }
}
