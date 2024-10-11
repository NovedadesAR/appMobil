import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CrearCuentaPage } from './pages/crear-cuenta/crear-cuenta.page';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginPageComponent
  },
  {
    path: 'crear-cuenta',
    component:CrearCuentaPage
  },
  {
    path: 'recuperar-password',
    component:RecuperarPasswordComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
