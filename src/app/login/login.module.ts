import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { IonicModule } from '@ionic/angular';
import { CrearCuentaPage } from './pages/crear-cuenta/crear-cuenta.page';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { LoginService } from './services/login.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginPageComponent,
    CrearCuentaPage,
    RecuperarPasswordComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    LoginRoutingModule,
    ReactiveFormsModule,
  ],
  providers:[LoginService]
})
export class LoginModule { }
