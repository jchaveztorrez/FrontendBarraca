import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/models';
import { ServiceService } from '../../../../services/service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css',
})
export class ListarUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  usuariosMostrados: Usuario[] = [];

  busqueda = '';
  filtroEstado: string = 'activos'; // por defecto mostrar activos

  limite = 10;

  constructor(
    private usuarioService: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      this.filtrar();
    });
  }

  actualizarUsuariosMostrados(): void {
    this.usuariosMostrados = this.usuariosFiltrados.slice(0, this.limite);
  }

  onScroll(event: Event): void {
    const div = event.target as HTMLElement;
    const alFinal = div.scrollTop + div.clientHeight >= div.scrollHeight - 5;
    if (alFinal) {
      this.limite += 10;
      this.actualizarUsuariosMostrados();
    }
  }

  filtrar(): void {
    const texto = this.busqueda.trim().toLowerCase();

    this.usuariosFiltrados = this.usuarios
      .filter(({ nombre, apellido, correo, estado }) => {
        const coincideTexto =
          nombre.toLowerCase().includes(texto) ||
          apellido.toLowerCase().includes(texto) ||
          correo.toLowerCase().includes(texto);

        const coincideEstado =
          (this.filtroEstado === 'activos' && estado) ||
          (this.filtroEstado === 'inactivos' && !estado) ||
          this.filtroEstado === 'todos';

        return coincideTexto && coincideEstado;
      })
      .sort((a, b) => Number(b.estado) - Number(a.estado));

    this.limite = 10;
    this.actualizarUsuariosMostrados();
  }

  /*   cambiarEstado(usuario: Usuario): void {
    const actualizado = { ...usuario, estado: !usuario.estado };
    this.usuarioService.editarUsuario(actualizado).subscribe({
      next: () => {
        usuario.estado = actualizado.estado;
        this.filtrar();
      },
      error: (err) => console.error('Error al cambiar el estado:', err),
    });
  } */
  cambiarEstado(usuario: Usuario): void {
    const actualizado = { ...usuario, estado: !usuario.estado };

    const formData = new FormData();
    formData.append('estado', String(actualizado.estado));

    // Si tu backend necesita otros campos, añade aquí más:
    // formData.append('nombre', actualizado.nombre);
    // formData.append('correo', actualizado.correo);

    this.usuarioService.editarUsuario(actualizado.id, formData).subscribe({
      next: () => {
        usuario.estado = actualizado.estado;
        this.filtrar();
      },
      error: (err: any) => console.error('Error al cambiar el estado:', err),
    });
  }

  irAEditar(id: number): void {
    this.router.navigate(['app-panel-control/editar-usuario', id]);
  }

  irARegistrar(): void {
    this.router.navigate(['app-panel-control/registrar-usuario']);
  }
}
