import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuarios/usuarios.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

export const routes: Routes = [
    { path: '', title: 'App Home Page', component: DashboardComponent },
    { path: 'usuarios', component: UsuarioComponent },
    { path: 'propiedades', component: PropiedadesComponent },
    { path: 'notificaciones', component: NotificacionesComponent },
    { path: '**', redirectTo: '' } // Redirección si la ruta no existe
  ];
