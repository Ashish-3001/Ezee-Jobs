import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEyeePageRoutingModule } from './edit-eyee-routing.module';

import { EditEyeePage } from './edit-eyee.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEyeePageRoutingModule,
    SharedModule
  ],
  declarations: [EditEyeePage]
})
export class EditEyeePageModule {}
