import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  Stripe,
  PaymentSheetEventsEnum,
  CreatePaymentSheetOption,
} from '@capacitor-community/stripe';
import axios from 'axios';
import { first, firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompraProducto } from '../../interfaces/Compra.interface';

@Component({
  selector: 'app-compra-page',
  templateUrl: './compra-page.component.html',
  styleUrl: './compra-page.component.css',
})
export class CompraPageComponent {
  constructor(private http: HttpClient) {
    Stripe.initialize({
      publishableKey:
        'pk_test_51Os6QyP0xF5rSbalhCDVxAhQAHMJJLSQsgR9JRdjUrd1MQHuWDxzNNFP84btqgdlTAniH5bX6NEX31jctM7CGuYC00OYXvGDI7',
    });
  }
  private url = environment.url_api;
  private jwtHelper = new JwtHelperService();
  private cantidad: number = 0;
  private dataByback:CompraProducto[] = [];

  compraProducto() {
    const idUser = localStorage.getItem('token');
    if (idUser !== null) {
      const token = this.jwtHelper.decodeToken(idUser);
      const data = {
        id: 56,
        title: 'Playera',
        precio: this.calDesByBack(1000, 10),
        idUser: token.sub,
        cantidad: 1,
        idCard: 'null',
      };
      console.log(data)
      this.dataByback.push(data);
    }
    return this.dataByback;
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

  httpPost() {
    return this.http.post<any>(`${this.url}stripe`, this.compraProducto()).pipe(first());
  }

  async paymentSheet() {
    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });
      const resp = this.httpPost();
      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(
        resp
      );
      console.log('paymentIntent: ', paymentIntent);

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'Novedades AR',
      });

      console.log('createPaymentSheet');
      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
      console.log('result: ', result);
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
        this.splitAndJoin(paymentIntent);
      }
    } catch (e) {
      console.log(e);
    }
  }
  splitAndJoin(paymentIntent: any) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log(result);
    return result;
  }
}
