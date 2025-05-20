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
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Productos

import { VentaListarComponent } from './components/gestion_de_productos/venta/venta-listar/venta-listar.component';
import { VentaRegistrarComponent } from './components/gestion_de_productos/venta/venta-registrar/venta-registrar.component';
import { VentaEditarComponent } from './components/gestion_de_productos/venta/venta-editar/venta-editar.component';
import { DetalleVentaListarComponent } from './components/gestion_de_productos/detalle-venta/detalle-venta-listar/detalle-venta-listar.component';
import { DetalleVentaRegistrarComponent } from './components/gestion_de_productos/detalle-venta/detalle-venta-registrar/detalle-venta-registrar.component';
import { DetalleVentaEditarComponent } from './components/gestion_de_productos/detalle-venta/detalle-venta-editar/detalle-venta-editar.component';
import { ProductoMaderaListarComponent } from './components/gestion_de_productos/ProductoMadera/producto-madera-listar/producto-madera-listar.component';
import { ProductoMaderaRegistrarComponent } from './components/gestion_de_productos/ProductoMadera/producto-madera-registrar/producto-madera-registrar.component';
import { ProductoMaderaEditarComponent } from './components/gestion_de_productos/ProductoMadera/producto-madera-editar/producto-madera-editar.component';
import { FacturaReciboRegistrarComponent } from './components/gestion_de_productos/FacturaRecibo/factura-recibo-registrar/factura-recibo-registrar.component';
import { FacturaReciboEditarComponent } from './components/gestion_de_productos/FacturaRecibo/factura-recibo-editar/factura-recibo-editar.component';
import { FacturaReciboListarComponent } from './components/gestion_de_productos/FacturaRecibo/factura-recibo-listar/factura-recibo-listar.component';
import { VenderComponent } from './components/vender/vender.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ListarCategoriaComponent } from './components/gestion_de_productos/categoria/listar-categoria/listar-categoria.component';
import { RegistrarCategoriaComponent } from './components/gestion_de_productos/categoria/registrar-categoria/registrar-categoria.component';
import { EditarCategoriaComponent } from './components/gestion_de_productos/categoria/editar-categoria/editar-categoria.component';

export const routes: Routes = [
  // Ruta principal
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  {
    path: 'app-panel-control',
    component: PanelControlComponent,
    children: [
      //ruta para vender
      { path: 'vender', component: VenderComponent },

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
      /* rutasde productos */
      // Sucursal
      { path: 'listar-categoria', component: ListarCategoriaComponent },
      { path: 'registrar-categoria', component: RegistrarCategoriaComponent },
      { path: 'editar-categoria/:id', component: EditarCategoriaComponent },
      // ProductoMadera
      {
        path: 'listar-producto-madera',
        component: ProductoMaderaListarComponent,
      },
      {
        path: 'registrar-producto-madera',
        component: ProductoMaderaRegistrarComponent,
      },
      {
        path: 'editar-producto-madera/:id',
        component: ProductoMaderaEditarComponent,
      },

      // Venta
      { path: 'listar-venta', component: VentaListarComponent },
      { path: 'registrar-venta', component: VentaRegistrarComponent },
      { path: 'editar-venta/:id', component: VentaEditarComponent },

      // Detalle Venta
      { path: 'listar-detalle-venta', component: DetalleVentaListarComponent },
      {
        path: 'registrar-detalle-venta',
        component: DetalleVentaRegistrarComponent,
      },
      {
        path: 'editar-detalle-venta/:id',
        component: DetalleVentaEditarComponent,
      },
      //facturarecibo
      // FacturaRecibo
      {
        path: 'listar-factura-recibo',
        component: FacturaReciboListarComponent,
      },
      {
        path: 'registrar-factura-recibo',
        component: FacturaReciboRegistrarComponent,
      },
      {
        path: 'editar-factura-recibo/:id',
        component: FacturaReciboEditarComponent,
      },
      //carrito
      {
        path: 'carrito',
        component: CarritoComponent,
      },
      // dashbhoard
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      // Ruta por defecto
      { path: '', redirectTo: 'vender', pathMatch: 'full' },
    ],
  },
];
