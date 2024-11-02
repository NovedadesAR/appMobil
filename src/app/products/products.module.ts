import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsByCategoryComponent } from './pages/products-by-category/products-by-category.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    ProductsByCategoryComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
