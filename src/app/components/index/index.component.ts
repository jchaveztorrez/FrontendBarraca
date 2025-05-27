import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  constructor(private router: Router) {}
  images = [
    'assets/carrucel/Silla 2.png',
    'assets/carrucel/Mesa.png',
    'assets/carrucel/Banca.png',
    'assets/carrucel/Acopio1.jpg',
    'assets/carrucel/Acopio.jpg',
    'https://images.unsplash.com/photo-1634672652995-ee7525bce595?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
