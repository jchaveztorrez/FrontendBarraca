import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-panel-control',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css'],
})
export class PanelControlComponent implements OnInit {
  activeSection: string | null = null;
  isMobileView = false;
  isSidebarVisibleOnSmallScreens = true;

  // ⏱ Variable para manejar el temporizador de inactividad
  timeoutInactivity: any;

  // Tiempo de inactividad permitido (2 minutos)
  inactiveTime = 60 * 60 * 1000;
  isSidebarOpen = false;
  windowWidth: number = 0;

  userRole: string = '';
  userName: string = '';
  userPermissions: string[] = [];

  nombre_usuario: string = '';
  apellido: string | null = '';
  imagenUrl: string | null = '';
  usuario_id: number = 0;

  idParaEditar: number = 0;

  permisos: string[] = [];
  roles: string[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');

    this.userRole = usuario.roles || '';
    this.userName = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim();
    this.userPermissions = usuario.permisos || [];
    this.imagenUrl = usuario.imagen_url;

    this.checkScreenSize();
    this.resetInactivityTimer();
  }

  puedeVer(permiso: string): boolean {
    return this.userPermissions.includes(permiso);
  }

  // 📏 Revisa el tamaño de la pantalla para ajustar la vista
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  // 🧠 Determina si estamos en vista móvil y ajusta visibilidad del sidebar
  @HostListener('window:resize')
  checkScreenSize() {
    this.windowWidth = window.innerWidth;
    // En desktop (>= 768px), el sidebar está abierto por defecto
    if (this.windowWidth >= 768) {
      this.isSidebarOpen = true;
    } else {
      this.isSidebarOpen = false;
    }
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  // Método para cerrar el sidebar en móvil cuando se hace clic fuera
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (this.windowWidth >= 768) return;

    const target = event.target as HTMLElement;
    const clickedInsideSidebar = target.closest('.sidebar');
    const clickedInsideToggleButton = target.closest('.toggle-button');

    if (
      !clickedInsideSidebar &&
      !clickedInsideToggleButton &&
      this.isSidebarOpen
    ) {
      this.isSidebarOpen = false;
    }
  }
  // 🔄 Alterna visibilidad de secciones
  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }

  // ✅ Verifica si una sección está activa
  isActive(section: string) {
    return this.activeSection === section;
  }

  // 📱 Cierra el sidebar en móviles después de una acción
  closeSidebarOnMobile() {
    if (this.isMobileView) {
      this.isSidebarVisibleOnSmallScreens = false;
    }
  }

  // 👂 Escucha eventos del usuario para detectar actividad
  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:click')
  handleUserActivity() {
    this.resetInactivityTimer();
  }

  // 🔄 Reinicia el temporizador de inactividad
  resetInactivityTimer() {
    if (this.timeoutInactivity) {
      clearTimeout(this.timeoutInactivity);
    }

    this.timeoutInactivity = setTimeout(() => {
      this.handleSessionTimeout();
    }, this.inactiveTime);
  }

  // 🚪 Cierra sesión por inactividad
  handleSessionTimeout() {
    alert('Sesión cerrada por inactividad');
    localStorage.clear();
    this.router.navigate(['/index']);
  }
  verPerfil(): void {
    this.router.navigate(['app-panel-control/perfil']);
  }
  private getUsuarioLocalStorage() {
    if (typeof window !== 'undefined') {
      // Verifica si localStorage está disponible
      try {
        const usuario = localStorage.getItem('usuario');
        return usuario ? JSON.parse(usuario) : null;
      } catch (error) {
        console.error('Error al recuperar usuario de localStorage', error);
        return null;
      }
    }
    return null; // Devuelve null si localStorage no está disponible
  }

  // Método para manejar el evento de selección
  onSelectChange(action: string) {
    if (action === 'cerrarSesion') {
      this.confirmarCerrarSesion(); // Maneja el cierre de sesión
    }
  }

  confirmarCerrarSesion() {
    console.log('Intentando cerrar sesión...');
    const confirmar = window.confirm(
      '¿Está seguro de que desea cerrar sesión?',
    );
    if (confirmar) {
      this.logout(); // Si el usuario acepta, se cierra sesión
    } else {
      console.log('Cierre de sesión cancelado.');
    }
  }

  // 🔐 Cierra la sesión y redirige
  logout() {
    // Limpia todo el localStorage
    localStorage.clear();
    // Redirige al usuario a la página de inicio
    this.router.navigate(['/index']);
  }
}
