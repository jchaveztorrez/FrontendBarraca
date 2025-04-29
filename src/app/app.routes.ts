import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { SucursalComponent } from './components/gestion_de_usuario/sucursal/sucursal.component';

export const routes: Routes = [
  { path: '', component: SucursalComponent },
  { path: 'sucursal', component: SucursalComponent },
  /*   { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent }, */
];
