import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsByCategoryComponent } from './pages/products-by-category/products-by-category.component';

const routes: Routes = [
  {
    path: 'category/:category/gender/:gender',
    component:ProductsByCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
