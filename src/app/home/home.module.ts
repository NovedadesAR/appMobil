import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './pages/homeComponent/home.page';

import { CarouselModule } from 'primeng/carousel';
import { TabNavigationComponent } from './pages/tab-navigation/tab-navigation.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CarouselModule,
  ],
  declarations: [
    HomePage,
    TabNavigationComponent,

  ]
})
export class HomePageModule {}
