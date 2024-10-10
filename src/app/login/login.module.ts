import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { IonicModule } from '@ionic/angular';
import { LoginService } from './services/login.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginPageComponent
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
