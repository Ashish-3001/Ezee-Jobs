import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterAsEmployeePageRoutingModule } from './register-as-employee-routing.module';

import { RegisterAsEmployeePage } from './register-as-employee.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterAsEmployeePageRoutingModule,
    SharedModule
  ],
  declarations: [RegisterAsEmployeePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterAsEmployeePageModule {}
