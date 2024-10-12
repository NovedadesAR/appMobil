import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { IonicModule } from '@ionic/angular';
import { LoginService } from './services/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AcordionComponentComponent } from './components/acordion-component/acordion-component.component';
import { TitleAndDescriptionComponent } from './components/title-and-description/title-and-description.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    AcordionComponentComponent,
    TitleAndDescriptionComponent
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
