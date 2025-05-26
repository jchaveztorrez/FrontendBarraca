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
    public router: Router, // ¡CAMBIO! antes era private
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
        console.log('Login exitoso:', response);

        // Guardar token
        localStorage.setItem('access_token', response.access_token);

        // Guardar información del usuario
        const usuario = {
          nombre: response.nombre,
          apellido: response.apellido,
          imagen_url: response.imagen_url,
          usuario_id: response.usuario_id,
          roles: response.roles,
          permisos: response.permisos,
          sucursal: response.sucursal.nombre,
        };
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

        // Redirigir
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
  lateralImages: string[] = [
    'https://todoferreteria.com.mx/wp-content/uploads/2022/08/older-woodworker-e1659975826505.jpg',
    'https://media.istockphoto.com/id/1458711335/es/foto/carpintero-de-muebles-de-madera-masculino-trabajo-en-taller-de-madera-diy-trabajador-de.jpg?s=612x612&w=0&k=20&c=_NX_F9nFNsjpBbnz6xEMGBGVXRPTkBm6pqG2MSBXGqM=',
    'https://media.istockphoto.com/id/1358271889/es/foto/discutiendo-lo-que-es-mejor.jpg?s=612x612&w=0&k=20&c=I91WsZqX7E2M4TqGhbQan5g88KMpZEZvqTtN4ig2Ju4=',
  ];
}
