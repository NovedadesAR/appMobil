import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductByName } from '../../interfaces/ProductsByName.interface';
import { toLower } from 'ionicons/dist/types/components/icon/utils';

@Component({
  selector: 'app-products-by-name',
  templateUrl: './products-by-name.component.html',
  styleUrl: './products-by-name.component.css'
})
export class ProductsByNameComponent implements OnInit{
  constructor(
    private producsService:ProductsService,
    private activateRoute:ActivatedRoute
  ){}
  public products:ProductByName[] = [];
  public order: string = 'asc';
  public inputName:string = '';
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.inputName = params['name'] as string;
      this.producsService.getProductByName(this.inputName.toLowerCase()).subscribe(resp => {
        this.products = resp.data;
      })
    })
  }

  public orderProductsByOrder() {
    this.products.sort((a, b) => {
      if (this.order === 'asc') {
        return a.precio - b.precio;
      } else {
        return b.precio - a.precio;
      }
    });
    this.order = this.order === 'asc' ? 'desc' : 'asc';
  }
}
