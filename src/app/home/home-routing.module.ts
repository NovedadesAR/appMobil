import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/homeComponent/home.page';
import { TabNavigationComponent } from './pages/tab-navigation/tab-navigation.component';

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
        path: '',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
