import { Component, Input } from '@angular/core';
import { ProductsCategory } from '../../interfaces/ProductsByCategory.interface';
import { ProductByName } from '../../interfaces/ProductsByName.interface';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  constructor(
    private profileService:ProfileService,
  ){}
  @Input()
  products:ProductsCategory[] = [];

  @Input()
  productsByName:ProductByName[] = [];

  @Input()
  type:string = '';

  public addProductoToCart(id:number){
    this.profileService.addProductToCardSer(id);
  }
}
