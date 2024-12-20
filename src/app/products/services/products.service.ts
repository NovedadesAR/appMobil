import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductsCategory } from '../interfaces/ProductsByCategory.interface';
import { ResProductByName } from '../interfaces/ProductsByName.interface';
import { Product } from '../interfaces/Product.interface';

export interface Route {
  name:         string;
  category: string;
  gender:     string;
};
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  private url_api:string =  environment.url_api;
  private headers = new HttpHeaders({ 'ngrok-skip-browser-warning': '1' });

  private route:Route = {
    name:'',
    category:'',
    gender:'',
  }
  public getProductsByCategory(category:string, gender:string){
    return this.http.get<ProductsCategory[]>(`${this.url_api}products/gender/${gender}/category/${category}`,{headers:this.headers})
  }
  public getProductByName(name:string){
    return this.http.get<ResProductByName>(`${this.url_api}products/search-by-name/${name}`,{headers:this.headers});
  }
  public getProductById(id:string){
    return this.http.get<Product>(`${this.url_api}products/${id}`,{headers:this.headers});
  }

  public set routerSet(route : Route) {
    this.route = route;
  }

  public get routeGet() : Route {
    return this.route;
  }

}
