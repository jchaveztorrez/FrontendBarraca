import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { OkComponent } from '../Mensajes/ok/ok.component';
import { ErrorComponent } from '../Mensajes/error/error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, OkComponent, ErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  correo: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    public router: Router,
    private service: ServiceService,
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isFormValid(): boolean {
    return this.correo.trim() !== '' && this.password.trim() !== '';
  }
  onSubmit(): void {
    if (!this.isFormValid()) {
      this.mensajeError =
        'Por favor, complete todos los campos antes de continuar.';
      return;
    }
    this.iniciarSesion();
  }

  iniciarSesion(): void {
    this.isLoading = true;
    this.service.login(this.correo, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);
        const usuario = {
          id: response.id,
          nombre: response.nombre,
          apellido: response.apellido,
          imagen_url: response.imagen_url,
          usuario_id: response.usuario_id,
          roles: response.roles,
          permisos: response.permisos,
          sucursalId: response.sucursal.id,
          sucursalNombre: response.sucursal.nombre,
        };
      
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        this.router.navigate(['/app-panel-control']); // << Mover aquí directamente
        // opcional: quitar el modal de éxito
      },      
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        this.mensajeError =
          'Correo electrónico o contraseña incorrectos. Por favor, inténtelo nuevamente.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/index']); // Cambia la ruta según tu configuración
  }
  manejarOk() {
    this.mensajeExito = '';
    this.router.navigate(['/app-panel-control']);
  }

  manejarError() {
    this.mensajeError = '';
  }
}
