import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegEmployerBasicPageRoutingModule } from './reg-employer-basic-routing.module';

import { RegEmployerBasicPage } from './reg-employer-basic.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegEmployerBasicPageRoutingModule,
    SharedModule
  ],
  declarations: [RegEmployerBasicPage]
})
export class RegEmployerBasicPageModule {}
