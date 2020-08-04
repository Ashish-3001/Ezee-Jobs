import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterAsEmployerPageRoutingModule } from './register-as-employer-routing.module';

import { RegisterAsEmployerPage } from './register-as-employer.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterAsEmployerPageRoutingModule,
    SharedModule
  ],
  declarations: [RegisterAsEmployerPage]
})
export class RegisterAsEmployerPageModule {}
