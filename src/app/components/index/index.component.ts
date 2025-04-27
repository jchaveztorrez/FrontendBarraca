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
    'https://www.hola.com/horizon/square/068521db78ee-cocinas-madera-3t-t.jpg',
    'https://www.hola.com/horizon/original_aspect_ratio/4b4ba09c159a-cocinas-madera-3a-a.jpg',
    'https://cdn.shopify.com/s/files/1/2262/1405/files/Casa_Suarez_Canada_Cabinets_Chests_480x480.jpg?v=1647562197',
  ];
}
