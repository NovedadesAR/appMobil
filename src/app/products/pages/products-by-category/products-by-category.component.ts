import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductsCategory } from '../../interfaces/ProductsByCategory.interface';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrl: './products-by-category.component.css',
})
export class ProductsByCategoryComponent implements OnInit {
  constructor(
    private activateRouter: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  public products: ProductsCategory[] = [];
  public order: string = 'asc';
  public title: string = '';
  private gender: string = '';
  public isLoader: boolean = true;
  ngOnInit(): void {
    this.searchProductByCategory();
  }

  public searchProductByCategory() {
    this.activateRouter.params.subscribe((params) => {
      const category = params['category'];
      const gender = params['gender'];
      this.title = category;
      this.gender = gender;

      this.productsService
        .getProductsByCategory(category, gender)
        .subscribe((resp) => {
          this.products = resp;
          this.isLoader = false;
        });
    });
  }
  public orderProductsByOrder() {
    this.products.sort((a, b) => {
      if (this.order === 'desc') {
        return a.precio - b.precio;
      } else {
        return b.precio - a.precio;
      }
    });
    this.order = this.order === 'asc' ? 'desc' : 'asc';
  }

  public checkTitleForCategory() {
    switch (this.title) {
      case 'Blusa':
        return 'Blusas para dama';
      case 'Falda':
        return 'Faldas para dama';
      case 'Vestido':
        return 'Vestidos para dama';
      case 'Pantalon':
        if (this.gender === 'M') return 'Pantalones para dama';
        else return 'Pantalones para caballero';
      case 'Playera':
        if (this.gender === 'M') return 'Playeras para dama';
        else return 'Playeras para caballero';
      case 'Short':
        if (this.gender === 'M') return 'Shorts para dama';
        else return 'Shorts para caballero';
      case 'Sudadera':
        if (this.gender === 'M') return 'Sudaderas para dama';
        else return 'Sudaderas para caballero';
      case 'Sueter':
        if (this.gender === 'M') return 'Sueters para dama';
        else return 'Sueters para caballero';
      case 'Camisa':
        if (this.gender === 'M') return 'Camisas para dama';
        else return 'Camisas para caballero';
      case 'Polo':
        if (this.gender === 'M') return 'Polos para dama';
        else return 'Polos para caballero';
      default:
        return '';
    }
  }
}
