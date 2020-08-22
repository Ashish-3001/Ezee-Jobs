import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationStatusPageRoutingModule } from './application-status-routing.module';

import { ApplicationStatusPage } from './application-status.page';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationStatusPageRoutingModule
  ],
  declarations: [ApplicationStatusPage],
  providers: [
    CallNumber],
})
export class ApplicationStatusPageModule {}
