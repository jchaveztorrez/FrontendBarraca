import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  images = [
    'assets/carrucel/Silla 2.png',
    'assets/carrucel/Mesa.png',
    'assets/carrucel/Banca.png',
    'assets/carrucel/Acopio1.jpg',
    'assets/carrucel/Acopio.jpg',
  ];
}
