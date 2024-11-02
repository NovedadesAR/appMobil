import { Component, Input } from '@angular/core';
import { ProductsCategory } from '../../interfaces/ProductsByCategory.interface';
import { ProductByName } from '../../interfaces/ProductsByName.interface';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  @Input()
  products:ProductsCategory[] = [];

  @Input()
  productsByName:ProductByName[] = [];

  @Input()
  type:string = '';
}
