import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataInicio } from '../interfaces/Data-home.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  private urlApi =  environment.url_api;

  public getProductByHome(){
    return this.http.get<DataInicio>(`${this.urlApi}products/data-inicio`,{headers: new HttpHeaders({'ngrok-skip-browser-warning':'1'})})
  }
}
