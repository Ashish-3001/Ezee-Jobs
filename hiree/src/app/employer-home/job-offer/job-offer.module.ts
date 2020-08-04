import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobOfferPageRoutingModule } from './job-offer-routing.module';

import { JobOfferPage } from './job-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobOfferPageRoutingModule
  ],
  declarations: [JobOfferPage]
})
export class JobOfferPageModule {}
