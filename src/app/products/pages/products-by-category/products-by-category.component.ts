import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductsCategory } from '../../interfaces/ProductsByCategory.interface';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrl: './products-by-category.component.css'
})
export class ProductsByCategoryComponent implements OnInit{

  constructor(private activateRouter:ActivatedRoute, private productsService:ProductsService){}

  public products:ProductsCategory[] = [];
  public order:string = "asc";
  ngOnInit(): void {
    this.activateRouter.params.subscribe(params => {
      const category =  params['category'];
      const gender =  params['gender'];
      this.productsService.getProductsByCategory(category,gender).subscribe(resp => {
        console.log(resp);
        this.products = resp;
      });
    });
  }

  public orderProductsByOrder(){
    this.products.sort((a, b) => {
      if(this.order === "asc"){
        return a.precio - b.precio;
      }else {
        return b.precio - a.precio;
      }
    });
    this.order = this.order === "asc"? "desc" : "asc";
  }

}
