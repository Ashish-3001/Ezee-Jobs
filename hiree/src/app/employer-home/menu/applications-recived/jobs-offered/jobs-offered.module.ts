import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsOfferedPageRoutingModule } from './jobs-offered-routing.module';

import { JobsOfferedPage } from './jobs-offered.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsOfferedPageRoutingModule
  ],
  declarations: [JobsOfferedPage]
})
export class JobsOfferedPageModule {}
