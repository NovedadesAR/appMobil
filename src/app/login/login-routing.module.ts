import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CrearCuentaPage } from './pages/crear-cuenta/crear-cuenta.page';

const routes: Routes = [
  {
    path:'login',
    component:LoginPageComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'crear-cuenta',
    component:CrearCuentaPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
