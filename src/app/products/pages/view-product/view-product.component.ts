import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/Product.interface';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit{
  constructor(
    private activateRouter:ActivatedRoute,
    private productService:ProductsService,
  ){}
  public id:string = '';
  public product!:Product;

  ngOnInit(): void {
    this.getProductById();
  }

  public getProductById(){
    this.activateRouter.params.subscribe(params => {
      this.id = params['product'];
      this.productService.getProductById(this.id).subscribe(res => {
        this.product = res;
      })
    })
  }
}
