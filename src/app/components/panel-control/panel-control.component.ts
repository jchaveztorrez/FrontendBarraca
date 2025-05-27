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

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.resetInactivityTimer();
  }

  // 📏 Revisa el tamaño de la pantalla para ajustar la vista
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  // 📋 Cierra el sidebar si se hace clic fuera de él (modo móvil)
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (!this.isMobileView || !this.isSidebarVisibleOnSmallScreens) return;

    const target = event.target as HTMLElement;
    const clickedInsideAside = target.closest('aside');
    const clickedInsideNav = target.closest('nav');

    if (!clickedInsideAside && !clickedInsideNav) {
      this.isSidebarVisibleOnSmallScreens = false;
    }
  }

  // 🧠 Determina si estamos en vista móvil y ajusta visibilidad del sidebar
  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      this.isMobileView = width <= 768;
      this.isSidebarVisibleOnSmallScreens = !this.isMobileView;
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

  // 🧭 Alterna el sidebar
  toggleSidebar() {
    this.isSidebarVisibleOnSmallScreens = !this.isSidebarVisibleOnSmallScreens;
  }

  // 🔐 Cierra la sesión y redirige
  logout() {
    localStorage.clear();
    this.router.navigate(['/index']);
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
}
