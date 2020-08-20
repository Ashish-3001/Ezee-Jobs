import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployerRegistrationPageRoutingModule } from './employer-registration-routing.module';

import { EmployerRegistrationPage } from './employer-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployerRegistrationPageRoutingModule
  ],
  declarations: [EmployerRegistrationPage]
})
export class EmployerRegistrationPageModule {}
