import { Component } from '@angular/core';
import { Stripe } from '@capacitor-community/stripe';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  constructor() {
    Stripe.initialize({
      publishableKey:
        'sk_test_51Os6QyP0xF5rSbalHiltPXqBNbewYYo0T3P02CikwxwUFGLXZqnfNoHZyC8P03TWCTUxypvbrTQqigaWoWx5ctlf00XocCc2bt',

      /**
       * Danger: This is production environment using production key.
       * For testing ApplePay and GooglePay, but If it fails, payment will occur.
       */
      // publishableKey: 'pk_live_51KFDksKRG9PRcrzztDRkrFSon0jOxWuQ77zd2URAyn3sy4Dn1EST360KnM6ElTlAerKOBvi27J4SPlKd2rG4SNAZ00n0f3mEbg',
    });
  }
}
