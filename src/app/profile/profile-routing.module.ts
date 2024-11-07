import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPersonalComponent } from './pages/view-personal/view-personal.component';
import { ViewAccountComponent } from './pages/view-account/view-account.component';
import { ViewSecurityComponent } from './pages/view-security/view-security.component';
import { ViewEnviosComponent } from './pages/view-envios/view-envios.component';

const routes: Routes = [
  {
    path:'view-personal',
    component:ViewPersonalComponent
  },
  {
    path:'view-account',
    component:ViewAccountComponent
  },
  {
    path:'view-security',
    component:ViewSecurityComponent
  },
  {
    path:'view-envio',
    component:ViewEnviosComponent
  },
  {
    path:'',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
