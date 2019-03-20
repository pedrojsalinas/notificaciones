import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'notificacion/:id', loadChildren: './pages/notificacion/notificacion.module#NotificacionPageModule', canActivate: [AuthGuard] },
  { path: 'personal/:id', loadChildren: './pages/personal/personal.module#PersonalPageModule', canActivate: [AuthGuard] },
  { path: 'mensaje/:id', loadChildren: './pages/detalle/detalle.module#DetallePageModule', canActivate: [AuthGuard] },
  {
    path: 'mensaje-personal/:id',
    loadChildren: './pages/mensaje-personal/mensaje-personal.module#MensajePersonalPageModule',
    canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
