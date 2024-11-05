import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsByCategoryComponent } from './pages/products-by-category/products-by-category.component';
import { IonicModule } from '@ionic/angular';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductsByNameComponent } from './pages/products-by-name/products-by-name.component';
import { ProductNotFoundComponent } from './components/product-not-found/product-not-found.component';


@NgModule({
  declarations: [
    ProductsByCategoryComponent,
    ListProductsComponent,
    ProductsByNameComponent,
    ProductNotFoundComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
