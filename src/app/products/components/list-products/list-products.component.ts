import { Component, Input } from '@angular/core';
import { ProductsCategory } from '../../interfaces/ProductsByCategory.interface';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  @Input()
  products:ProductsCategory[] = [];
}
