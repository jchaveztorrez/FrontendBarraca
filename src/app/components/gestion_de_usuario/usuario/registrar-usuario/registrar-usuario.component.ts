import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService } from '../../../../services/service.service';
@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css',
})
export class RegistrarUsuarioComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      telefono: [null],
      ci: [null],
      fecha_nacimiento: [null],
      password: [null, Validators.required],
      imagen_url: ['https://via.placeholder.com/40'], // valor por defecto si deseas
      estado: [true],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.usuarioService.createUsuario(this.form.value).subscribe(() => {
        this.router.navigate(['app-panel-control/listar-usuario']);
      });
    }
  }

  volver(): void {
    this.router.navigate(['app-panel-control/listar-usuario']);
  }

  limpiarFormulario(): void {
    this.form.reset({
      estado: true,
      imagen_url: 'https://via.placeholder.com/40',
    });
  }
}
