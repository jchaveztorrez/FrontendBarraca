import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender, // Ruta para la página de inicio
  },
  {
    path: 'sucursal',
    renderMode: RenderMode.Prerender, // Ruta para la página de sucursales
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender, // Ruta para manejar cualquier otra URL
  },
];
