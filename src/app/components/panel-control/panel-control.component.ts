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
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}
  ngOnInit(): void {
    this.checkScreenSize();
  }
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }
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
  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      this.isMobileView = width <= 768;
      this.isSidebarVisibleOnSmallScreens = !this.isMobileView;
    }
  }
  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }
  isActive(section: string) {
    return this.activeSection === section;
  }
  toggleSidebar() {
    this.isSidebarVisibleOnSmallScreens = !this.isSidebarVisibleOnSmallScreens;
  }
  logout() {
    this.router.navigate(['/index']);
  }
  closeSidebarOnMobile() {
    if (this.isMobileView) {
      this.isSidebarVisibleOnSmallScreens = false;
    }
  }
}
