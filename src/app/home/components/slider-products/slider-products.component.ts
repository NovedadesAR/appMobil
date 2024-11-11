import { Component, Input } from '@angular/core';
import { ProductoIni } from '../../interfaces/Data-home.interface';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-slider-products',
  templateUrl: './slider-products.component.html',
  styleUrl: './slider-products.component.css',
})
export class SliderProductsComponent {
  constructor(private profileService:ProfileService){}
  @Input()
  public products: ProductoIni[] = [];
  @Input()
  public title:string = '';
  @Input()
  public isLoader:boolean = true;

  public calDesc(price:number, discount:number):number{
    return price - (price * (discount / 100));
  }
  public addProductoToCart(id:number){
    this.profileService.addProductToCardSer(id);
  }
}
