import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './pages/homeComponent/home.page';

import { CarouselModule } from 'primeng/carousel';
import { TabNavigationComponent } from './pages/tab-navigation/tab-navigation.component';
import { SliderProductsComponent } from './components/slider-products/slider-products.component';
import { TitleCategoryComponent } from './components/title-category/title-category.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CarouselModule,
    ReactiveFormsModule
],
  declarations: [
    HomePage,
    TabNavigationComponent,
    SliderProductsComponent,
    TitleCategoryComponent,
    LoaderComponent,
    ErrorPageComponent,

  ],
  exports:[
    ErrorPageComponent
  ]
})
export class HomePageModule {}
