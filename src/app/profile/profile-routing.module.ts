import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { accountMatchGuard } from './guards/account-match.guard';
import { accountActivateGuard } from './guards/account-activate.guard';

const routes: Routes = [
  {
    path:'account',
    component:AccountComponent,
    canMatch:[accountMatchGuard],
    canActivate:[accountActivateGuard]
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'/loginModule/login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
