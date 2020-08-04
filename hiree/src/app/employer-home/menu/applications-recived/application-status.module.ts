import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationsRecPageRoutingModule } from './application-status-routing.module';

import { ApplicationsRecPage } from './application-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationsRecPageRoutingModule
  ],
  declarations: [ApplicationsRecPage]
})
export class ApplicationsRecPageModule {}
