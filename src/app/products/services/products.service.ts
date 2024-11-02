import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductsCategory } from '../interfaces/ProductsByCategory.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  private url_api:string =  environment.url_api;

  public getProductsByCategory(category:string, gender:string){
    return this.http.get<ProductsCategory[]>(`${this.url_api}products/gender/${gender}/category/${category}`)
  }
}
