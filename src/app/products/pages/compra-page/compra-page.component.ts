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
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra-page',
  templateUrl: './compra-page.component.html',
  styleUrl: './compra-page.component.css',
})
export class CompraPageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private router:Router,
  ) {
    Stripe.initialize({
      publishableKey:
        'pk_test_51Os6QyP0xF5rSbalhCDVxAhQAHMJJLSQsgR9JRdjUrd1MQHuWDxzNNFP84btqgdlTAniH5bX6NEX31jctM7CGuYC00OYXvGDI7',
    });
  }
  public cantidad: number = 1;
  public isOpen: boolean = false;
  private url = environment.url_api;
  private jwtHelper = new JwtHelperService();
  private dataByback: CompraProducto[] = [];
  private idProducto: string = '';
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
    imagen: [
      {
        id: 0,
        url_imagen: '',
      },
    ],
    comentarios: [],
  };
  ngOnInit(): void {
    this.getDataProduct();
  }
  private getDataProduct() {
    const idProduct = localStorage.getItem('product');
    if (idProduct) {
      this.idProducto = idProduct;
      this.productService.getProductById(idProduct).subscribe((res) => {
        this.product = res;
      });
    }
  }
  public optionsCantidad(cantidad: number): number[] {
    let element: number[] = [];
    for (let i = 1; i <= cantidad; i++) {
      element.push(i);
    }
    return element;
  }
  public changePrice() {
    const descuento = (this.product.precio * this.product.descuento) / 100;
    return (this.product.precio - descuento) * this.cantidad;
  }
  async compraProducto() {
    const idUser = localStorage.getItem('token');
    if (idUser !== null) {
      const token = this.jwtHelper.decodeToken(idUser);
      const product = await lastValueFrom(
        this.productService.getProductById(this.idProducto)
      );
      const data = {
        id: product.id,
        title: product.nombre_producto,
        precio: product.precio,
        idUser: token.sub,
        cantidad: this.cantidad,
        idCard: 'null',
      };
      this.dataByback.push(data);
    }
    return this.dataByback;
  }
  async paymentSheet() {
    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        this.isOpen = true;
        setTimeout(() => {
          localStorage.removeItem('product')
          this.router.navigate(['/my-shopping'])
        }, 2000);
      });
      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(this.http.post<any>(`${this.url}stripe`, await this.compraProducto()))
      this.dataByback = [];
      console.log(this.dataByback)
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'Novedades AR',
        countryCode:'MX',
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
}
