import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeRegistrationPageRoutingModule } from './employee-registration-routing.module';

import { EmployeeRegistrationPage } from './employee-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeRegistrationPageRoutingModule
  ],
  declarations: [EmployeeRegistrationPage]
})
export class EmployeeRegistrationPageModule {}
