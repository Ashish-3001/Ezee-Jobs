import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEyerPageRoutingModule } from './edit-eyer-routing.module';

import { EditEyerPage } from './edit-eyer.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEyerPageRoutingModule,
    SharedModule
  ],
  declarations: [EditEyerPage]
})
export class EditEyerPageModule {}
