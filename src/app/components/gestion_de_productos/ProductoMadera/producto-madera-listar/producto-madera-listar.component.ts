import { Component } from '@angular/core';
import { ProductoMadera } from '../../../../models/productos';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../../../services/service.service';

@Component({
  selector: 'app-producto-madera-listar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './producto-madera-listar.component.html',
  styleUrl: './producto-madera-listar.component.css',
})
export class ProductoMaderaListarComponent {
  producto: ProductoMadera[] = [];
  filtrados: ProductoMadera[] = [];
  mostrados: ProductoMadera[] = [];
  busqueda = '';
  limite = 20;
  constructor(
    private servicio: ServiceService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.servicio.getProductoMaderas().subscribe((data) => {
      this.producto = data;
      this.filtrar();
    });
  }
  actualizarMostrados(): void {
    this.mostrados = this.filtrados.slice(0, this.limite);
  }
  onScroll(event: Event): void {
    const div = event.target as HTMLElement;
    const alFinal = div.scrollTop + div.clientHeight >= div.scrollHeight - 5;
    if (alFinal) {
      this.limite += 10;
      this.actualizarMostrados();
    }
  }
  filtrar(): void {
    const texto = this.busqueda.trim().toLowerCase();
    this.filtrados = this.producto.filter((prod) =>
      prod.especie.toLowerCase().includes(texto),
    );
    this.limite = 10;
    this.actualizarMostrados();
  }
  irAEditar(id: number): void {
    this.router.navigate(['app-panel-control/editar-producto-madera', id]);
  }
  irARegistrar(): void {
    this.router.navigate(['app-panel-control/registrar-producto-madera']);
  }
}
