import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { loginGuard } from '../login/guards/loginGuard/login-activate.guard';
import { loginMatchGuard } from '../login/guards/loginGuard/login-match.guard';

const routes: Routes = [
  {
    path:'account',
    component:AccountComponent,
    canActivate:[loginGuard],
    canMatch:[loginMatchGuard]
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
