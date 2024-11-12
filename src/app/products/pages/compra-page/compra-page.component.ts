import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  Stripe,
  PaymentSheetEventsEnum,
  CreatePaymentSheetOption,
} from '@capacitor-community/stripe';
import axios from 'axios';
import { first, firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-compra-page',
  templateUrl: './compra-page.component.html',
  styleUrl: './compra-page.component.css',
})
export class CompraPageComponent {
  constructor(private http: HttpClient) {
    Stripe.initialize({
      publishableKey: 'pk_test_51Os6QyP0xF5rSbalhCDVxAhQAHMJJLSQsgR9JRdjUrd1MQHuWDxzNNFP84btqgdlTAniH5bX6NEX31jctM7CGuYC00OYXvGDI7',
    });
  }
  private url = environment.url_api;
  data: any = {
    name: 'Nikhil',
    email: 'nykz786@gmail.com',
    amount: 100,
    currency: 'inr'
  };


  httpPost(body:any) {
    return this.http.post<any>(`${this.url}stripe`, body).pipe(first());
  }

  async paymentSheet() {

    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });
      const resp = this.httpPost(this.data);
      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(resp);
      console.log('paymentIntent: ', paymentIntent);

      // prepare PaymentSheet with CreatePaymentSheetOption.
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'Technyks'
      });

      console.log('createPaymentSheet');
      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
      console.log('result: ', result);
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
        this.splitAndJoin(paymentIntent);
      }
    } catch(e) {
      console.log(e);
    }
  }
  splitAndJoin(paymentIntent:any) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log(result);
    return result;
  }
}
