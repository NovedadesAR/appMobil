import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Stripe, PaymentSheetEventsEnum } from '@capacitor-community/stripe';

@Component({
  selector: 'app-compra-page',
  templateUrl: './compra-page.component.html',
  styleUrl: './compra-page.component.css',
})
export class CompraPageComponent {
  constructor(private http: HttpClient) {}

  async compra() {
    console.log('entra');
    // Escucha el evento de finalización de la hoja de pagos
    Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
      console.log('Pago completado');
    });

    // Solicitud al backend para obtener los datos de pago
    this.http
      .post<{
        paymentIntent: string;
        ephemeralKey: string;
        customer: string;
      }>('http://localhost:3000/stripe', {})
      .subscribe(async (resp) => {
        try {
          console.log(resp)
          // Prepara el PaymentSheet con las opciones necesarias
          await Stripe.createPaymentSheet({
            paymentIntentClientSecret: resp.paymentIntent,
            customerId: resp.customer,
            customerEphemeralKeySecret: resp.ephemeralKey,
          });

          // Presenta el PaymentSheet y captura el resultado
          const result = await Stripe.presentPaymentSheet();
          console.log(result);

          if (result?.paymentResult === PaymentSheetEventsEnum.Completed) {
            console.log('Pago realizado con éxito');
            // Código para manejar el pago exitoso
          } else {
            console.log('Pago no completado', result);
          }
        } catch (error) {
          console.error('Error al presentar la hoja de pago:', error);
        }
      });
  }

}
