import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { IonicModule } from '@ionic/angular';
import { ViewPersonalComponent } from './pages/view-personal/view-personal.component';
import { ViewAccountComponent } from './pages/view-account/view-account.component';
import { ViewSecurityComponent } from './pages/view-security/view-security.component';
import { ViewEnviosComponent } from './pages/view-envios/view-envios.component';
import { MyShoppingComponent } from './pages/my-shopping/my-shopping.component';
import { ShoppingCarComponent } from './pages/shopping-car/shopping-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormProfileComponent } from './components/form-profile/form-profile.component';
import { ToasFormComponent } from './components/toas-form/toas-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AccountComponent,
    ViewPersonalComponent,
    ViewAccountComponent,
    ViewSecurityComponent,
    ViewEnviosComponent,
    MyShoppingComponent,
    ShoppingCarComponent,
    FormProfileComponent,
    ToasFormComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class ProfileModule { }
