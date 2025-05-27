import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  correo: string = '';
  password: string = '';
  errorMsg: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;

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
      this.errorMsg = 'Por favor complete todos los campos';
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
          id: response.id, // Suponiendo que viene en la respuesta
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

        this.router.navigate(['/app-panel-control']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        this.errorMsg = 'Correo o contraseña incorrectos';
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
}
