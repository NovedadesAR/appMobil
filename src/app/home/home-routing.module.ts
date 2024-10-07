import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/homeComponent/home.page';
import { TabNavigationComponent } from './pages/tab-navigation/tab-navigation.component';

const routes: Routes = [
  {
    path:'',
    component:TabNavigationComponent,
    children:[
      {
        path:'home',
        component: HomePage
      },
      {
        path:'profileModule',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path:'loginModule',
        loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
      },
      {
        path:'productsModule',
        loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
