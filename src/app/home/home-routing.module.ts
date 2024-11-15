import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/homeComponent/home.page';
import { TabNavigationComponent } from './pages/tab-navigation/tab-navigation.component';
import { AccountComponent } from '../profile/pages/account/account.component';
import { accountMatchGuard } from '../profile/guards/account-match.guard';
import { MyShoppingComponent } from '../profile/pages/my-shopping/my-shopping.component';
import { ShoppingCarComponent } from '../profile/pages/shopping-car/shopping-car.component';

const routes: Routes = [
  {
    path: '',
    component: TabNavigationComponent,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'account',
        component:AccountComponent,
        canMatch:[accountMatchGuard],
      },
      {
        path:'my-shopping',
        component:MyShoppingComponent,
        canMatch:[accountMatchGuard],
      },
      {
        path:'car',
        component:ShoppingCarComponent,
        canMatch:[accountMatchGuard],
      },
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
