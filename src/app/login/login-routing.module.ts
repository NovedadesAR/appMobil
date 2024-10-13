import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CrearCuentaPage } from './pages/crear-cuenta/crear-cuenta.page';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { WriteCodeComponent } from './pages/write-code/write-code.component';
import { CodeActivateGuard } from './guards/codePageGuard/code-activate.guard';
import { codeMatchGuard } from './guards/codePageGuard/code.match.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

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
    path: 'write-code',
    component:WriteCodeComponent,
    canActivate:[CodeActivateGuard],
    canMatch:[codeMatchGuard],
  },
  {
    path: 'change-password',
    component:ChangePasswordComponent,
    canActivate:[CodeActivateGuard],
    canMatch:[codeMatchGuard],
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
