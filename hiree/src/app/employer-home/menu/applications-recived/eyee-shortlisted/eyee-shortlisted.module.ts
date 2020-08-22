import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EyeeShortlistedPageRoutingModule } from './eyee-shortlisted-routing.module';

import { EyeeShortlistedPage } from './eyee-shortlisted.page';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EyeeShortlistedPageRoutingModule
  ],
  declarations: [EyeeShortlistedPage],
  providers: [
    CallNumber],
})
export class EyeeShortlistedPageModule {}
