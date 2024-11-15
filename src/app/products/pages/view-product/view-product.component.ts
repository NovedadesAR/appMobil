import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Imagen, Product } from '../../interfaces/Product.interface';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css',
})
export class ViewProductComponent implements OnInit {
  constructor(
    private activateRouter: ActivatedRoute,
    private productService: ProductsService,
    private profileService: ProfileService
  ) {}
  public isToastOpen: boolean = false;
  public message: string = '';
  public isLoader: boolean = true;
  public id: string = '';
  public imgSelected: string = '';
  public images: Imagen[] = [];
  public routeBack: string = '';
  public product: Product = {
    id: 0,
    nombre_producto: '',
    precio: 0,
    descripccion: '',
    stock: 0,
    categoria: '',
    rating: 0,
    descuento: 0,
    status: '',
    tipo: '',
    imagen: [],
    comentarios: [],
  };

  ngOnInit(): void {
    console.log(this.productService.routeGet);
    this.getProductById();
    this.routeToNavigation();
  }

  public getProductById() {
    this.activateRouter.params.subscribe((params) => {
      this.id = params['product'];
      this.productService.getProductById(this.id).subscribe((res) => {
        this.product = res;
        this.images = res.imagen;
        this.imgSelected = this.images[0].url_imagen;
        this.isLoader = false;
      });
    });
  }
  public changeImg(id: number) {
    this.images.forEach((img) => {
      if (img.id === id) {
        this.imgSelected = img.url_imagen;
      }
    });
  }

  public routeToNavigation() {
    if (
      this.productService.routeGet.category === '' &&
      this.productService.routeGet.name === ''
    ) {
      this.routeBack = `/home`;
    } else if (this.productService.routeGet.name === '') {
      this.routeBack = `/products/category/${this.productService.routeGet.category}/gender/${this.productService.routeGet.gender}`;
    } else {
      this.routeBack = `/products/name/${this.productService.routeGet.name}`;
    }
  }
  public async addProductoToCart(id: number) {
    const message = await this.profileService.addProductToCardSer(id);
    this.message = message;
    this.isToastOpen = true;
  }
}
