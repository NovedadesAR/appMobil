import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IonicModule
  ]
})
export class ProfileModule { }
