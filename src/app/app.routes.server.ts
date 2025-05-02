import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender, // Ruta para la página de inicio
  },
  /* aqui debemos agregas las rutas  */
  {
    path: '**',
    renderMode: RenderMode.Prerender, // Ruta para manejar cualquier otra URL
  },
];
