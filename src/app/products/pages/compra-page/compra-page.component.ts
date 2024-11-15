import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  Stripe,
  PaymentSheetEventsEnum,
  CreatePaymentSheetOption,
} from '@capacitor-community/stripe';
import { first, firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompraProducto } from '../../interfaces/Compra.interface';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/Product.interface';

@Component({
  selector: 'app-compra-page',
  templateUrl: './compra-page.component.html',
  styleUrl: './compra-page.component.css',
})
export class CompraPageComponent implements OnInit{
  constructor(
    private http: HttpClient,
    private productService:ProductsService,
  ) {
    Stripe.initialize({
      publishableKey:
        'pk_test_51Os6QyP0xF5rSbalhCDVxAhQAHMJJLSQsgR9JRdjUrd1MQHuWDxzNNFP84btqgdlTAniH5bX6NEX31jctM7CGuYC00OYXvGDI7',
    });
  }
  private url = environment.url_api;
  private jwtHelper = new JwtHelperService();
  private cantidad: number = 0;
  private dataByback:CompraProducto[] = [];
  public product!:Product;
  ngOnInit(): void {
    this.getDataProduct();
  }
  private  getDataProduct(){
    const idProduct = localStorage.getItem('product');
    if(idProduct){
      this.productService.getProductById(idProduct).subscribe(res => {
        this.product = res;
        console.log(res);
      });
    }
  }
  async compraProducto() {
    const idUser = localStorage.getItem('token');
    if (idUser !== null) {
      const token = this.jwtHelper.decodeToken(idUser);
      const product = await lastValueFrom(this.productService.getProductById('56'));
      console.log(product);
      const data = {
        id: product!.id,
        title: 'Playera',
        precio: this.calDesByBack(1000, 10),
        idUser: token.sub,
        cantidad: 1,
        idCard: 'null',
      };
      this.dataByback.push(data);
    }
    return this.dataByback;
  }

  httpPost() {
    return this.http.post<any>(`${this.url}stripe`, this.compraProducto()).pipe(first());
  }

  async paymentSheet() {
    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
      });
      const resp = this.httpPost();
      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(
        resp
      );

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'Novedades AR',
      });

      const result = await Stripe.presentPaymentSheet();
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        this.splitAndJoin(paymentIntent);
      }
    } catch (e) {
      console.log(e);
    }
  }
  splitAndJoin(paymentIntent: any) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    return result;
  }
  calDes(precio: number, descuento: number) {
    let total: number = precio * this.cantidad;
    let desc = ((precio * descuento) / 100) * this.cantidad;
    return Math.floor(total - desc);
  }
  calDesByBack(precio: number, descuento: number) {
    let desc = precio - (precio * descuento) / 100;
    return Math.floor(desc);
  }
}
