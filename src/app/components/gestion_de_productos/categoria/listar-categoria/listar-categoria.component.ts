import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../../models/models'; // Asegúrate que la interfaz esté allí
import { ServiceService } from '../../../../services/service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-categoria',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-categoria.component.html',
  styleUrl: './listar-categoria.component.css',
})
export class ListarCategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriasFiltradas: Categoria[] = [];
  categoriasMostradas: Categoria[] = [];

  busqueda = '';
  filtroEstado: string = 'activos';

  limite = 10;

  constructor(
    private categoriaService: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
      this.filtrar();
    });
  }

  actualizarCategoriasMostradas(): void {
    this.categoriasMostradas = this.categoriasFiltradas.slice(0, this.limite);
  }

  onScroll(event: Event): void {
    const div = event.target as HTMLElement;
    const alFinal = div.scrollTop + div.clientHeight >= div.scrollHeight - 5;
    if (alFinal) {
      this.limite += 10;
      this.actualizarCategoriasMostradas();
    }
  }

  filtrar(): void {
    const texto = this.busqueda.trim();
    const esMayus = texto === texto.toUpperCase();

    this.categoriasFiltradas = this.categorias
      .filter(({ nombre = '', descripcion = '', estado }) => {
        const combinado = `${nombre} ${descripcion}`;
        const coincideTexto = esMayus
          ? combinado.includes(texto)
          : combinado.toLowerCase().includes(texto.toLowerCase());

        const coincideEstado =
          (this.filtroEstado === 'activos' && estado) ||
          (this.filtroEstado === 'inactivos' && !estado) ||
          this.filtroEstado === 'todos';

        return coincideTexto && coincideEstado;
      })
      .sort((a, b) => Number(b.estado) - Number(a.estado));

    this.limite = 10;
    this.actualizarCategoriasMostradas();
  }

  cambiarEstado(categoria: Categoria): void {
    const actualizado = { ...categoria, estado: !categoria.estado };
    this.categoriaService
      .actualizarCategoria(categoria.id, actualizado)
      .subscribe({
        next: () => {
          categoria.estado = actualizado.estado;
          this.filtrar();
        },
        error: (err) => console.error('Error al cambiar el estado:', err),
      });
  }

  irAEditar(id: number): void {
    this.router.navigate(['app-panel-control/editar-categoria', id]);
  }

  irARegistrar(): void {
    this.router.navigate(['app-panel-control/registrar-categoria']);
  }
}
