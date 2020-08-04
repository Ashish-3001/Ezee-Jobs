import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EyeeAppliedPageRoutingModule } from './eyee-applied-routing.module';

import { EyeeAppliedPage } from './eyee-applied.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EyeeAppliedPageRoutingModule
  ],
  declarations: [EyeeAppliedPage]
})
export class EyeeAppliedPageModule {}
