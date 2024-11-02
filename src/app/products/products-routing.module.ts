import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsByCategoryComponent } from './pages/products-by-category/products-by-category.component';
import { ProductsByNameComponent } from './pages/products-by-name/products-by-name.component';

const routes: Routes = [
  {
    path: 'category/:category/gender/:gender',
    component:ProductsByCategoryComponent
  },
  {
    path:'name/:name',
    component:ProductsByNameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
