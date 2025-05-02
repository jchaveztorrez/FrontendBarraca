import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { PanelControlComponent } from './components/panel-control/panel-control.component';

// Permiso
import { RegistrarPermisoComponent } from './components/gestion_de_usuario/permiso/registrar-permiso/registrar-permiso.component';
import { ListarPermisoComponent } from './components/gestion_de_usuario/permiso/listar-permiso/listar-permiso.component';
import { EditarPermisoComponent } from './components/gestion_de_usuario/permiso/editar-permiso/editar-permiso.component';

// Rol
import { RegistrarRolComponent } from './components/gestion_de_usuario/rol/registrar-rol/registrar-rol.component';
import { ListarRolComponent } from './components/gestion_de_usuario/rol/listar-rol/listar-rol.component';
import { EditarRolComponent } from './components/gestion_de_usuario/rol/editar-rol/editar-rol.component';

// Rol-Permiso
import { RegistrarRolPermisoComponent } from './components/gestion_de_usuario/rol-permiso/registrar-rol-permiso/registrar-rol-permiso.component';
import { ListarRolPermisoComponent } from './components/gestion_de_usuario/rol-permiso/listar-rol-permiso/listar-rol-permiso.component';
import { EditarRolPermisoComponent } from './components/gestion_de_usuario/rol-permiso/editar-rol-permiso/editar-rol-permiso.component';

// Sucursales
import { RegistrarSucursalComponent } from './components/gestion_de_usuario/Sucursales/registrar-sucursal/registrar-sucursal.component';
import { ListarSucursalComponent } from './components/gestion_de_usuario/Sucursales/listar-sucursal/listar-sucursal.component';
import { EditarSucursalComponent } from './components/gestion_de_usuario/Sucursales/editar-sucursal/editar-sucursal.component';

// Usuario
import { RegistrarUsuarioComponent } from './components/gestion_de_usuario/usuario/registrar-usuario/registrar-usuario.component';
import { ListarUsuarioComponent } from './components/gestion_de_usuario/usuario/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './components/gestion_de_usuario/usuario/editar-usuario/editar-usuario.component';

// Usuario-Rol-Sucursal
import { RegistrarUsuarioRolSucursalComponent } from './components/gestion_de_usuario/usuario-rol-sucursal/registrar-usuario-rol-sucursal/registrar-usuario-rol-sucursal.component';
import { ListarUsuarioRolSucursalComponent } from './components/gestion_de_usuario/usuario-rol-sucursal/listar-usuario-rol-sucursal/listar-usuario-rol-sucursal.component';
import { EditarUsuarioRolSucursalComponent } from './components/gestion_de_usuario/usuario-rol-sucursal/editar-usuario-rol-sucursal/editar-usuario-rol-sucursal.component';

export const routes: Routes = [
  // Ruta principal
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  {
    path: 'app-panel-control',
    component: PanelControlComponent,
    children: [
      // Permiso
      { path: 'listar-permiso', component: ListarPermisoComponent },
      { path: 'registrar-permiso', component: RegistrarPermisoComponent },
      { path: 'editar-permiso/:id', component: EditarPermisoComponent },

      // Rol
      { path: 'listar-rol', component: ListarRolComponent },
      { path: 'registrar-rol', component: RegistrarRolComponent },
      { path: 'editar-rol/:id', component: EditarRolComponent },

      // Rol-Permiso
      { path: 'listar-rol-permiso', component: ListarRolPermisoComponent },
      {
        path: 'registrar-rol-permiso',
        component: RegistrarRolPermisoComponent,
      },
      { path: 'editar-rol-permiso/:id', component: EditarRolPermisoComponent },

      // Sucursal
      { path: 'listar-sucursal', component: ListarSucursalComponent },
      { path: 'registrar-sucursal', component: RegistrarSucursalComponent },
      { path: 'editar-sucursal/:id', component: EditarSucursalComponent },

      // Usuario
      { path: 'listar-usuario', component: ListarUsuarioComponent },
      { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
      { path: 'editar-usuario/:id', component: EditarUsuarioComponent },

      // Usuario-Rol-Sucursal
      {
        path: 'listar-usuario-rol-sucursal',
        component: ListarUsuarioRolSucursalComponent,
      },
      {
        path: 'registrar-usuario-rol-sucursal',
        component: RegistrarUsuarioRolSucursalComponent,
      },
      {
        path: 'editar-usuario-rol-sucursal/:id',
        component: EditarUsuarioRolSucursalComponent,
      },

      // Ruta por defecto
      { path: '', redirectTo: 'listar-permiso', pathMatch: 'full' },
    ],
  },
];
