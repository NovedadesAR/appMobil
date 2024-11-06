import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Imagen, Product } from '../../interfaces/Product.interface';

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
  public imgSelected:string = '';
  public images:Imagen[] = [];
  public product:Product = {
    id:              0,
    nombre_producto: '',
    precio:          0,
    descripccion:     '',
    stock:           0,
    categoria:       '',
    rating:          0,
    descuento:       0,
    status:          '',
    tipo:             '',
    imagen:          [],
    comentarios:     []
  };

  ngOnInit(): void {
    this.getProductById();
  }

  public getProductById(){
    this.activateRouter.params.subscribe(params => {
      this.id = params['product'];
      this.productService.getProductById(this.id).subscribe(res => {
        this.product = res;
        this.images = res.imagen;
        this.imgSelected = this.images[0].url_imagen;
      })
    })
  }
  public changeImg(id:number){
    this.images.forEach(img => {
      if(img.id === id){
        this.imgSelected = img.url_imagen;
      }
    })
  }
}
