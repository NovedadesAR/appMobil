import { Component, Input } from '@angular/core';
import { ProductoIni } from '../../interfaces/Data-home.interface';

@Component({
  selector: 'app-slider-products',
  templateUrl: './slider-products.component.html',
  styleUrl: './slider-products.component.css',
})
export class SliderProductsComponent {
  @Input()
  public products: ProductoIni[] = [];
  @Input()
  public title:string = '';
  @Input()
  public description:string = '';

  public calDesc(price:number, discount:number):number{
    return price - (price * (discount / 100));
  }
}
