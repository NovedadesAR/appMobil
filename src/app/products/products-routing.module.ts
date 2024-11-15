import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsByCategoryComponent } from './pages/products-by-category/products-by-category.component';
import { ProductsByNameComponent } from './pages/products-by-name/products-by-name.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { CompraPageComponent } from './pages/compra-page/compra-page.component';
import { compraGuard } from './guards/compra.guard';

const routes: Routes = [
  {
    path: 'category/:category/gender/:gender',
    component:ProductsByCategoryComponent
  },
  {
    path:'name/:name',
    component:ProductsByNameComponent
  },
  {
    path:'view/:product',
    component:ViewProductComponent
  },
  {
    path: 'compra',
    component:CompraPageComponent,
    //canMatch:[compraGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
