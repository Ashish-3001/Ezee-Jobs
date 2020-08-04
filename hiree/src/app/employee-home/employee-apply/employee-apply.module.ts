import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeApplyPageRoutingModule } from './employee-apply-routing.module';

import { EmployeeApplyPage } from './employee-apply.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeApplyPageRoutingModule
  ],
  declarations: [EmployeeApplyPage]
})
export class EmployeeApplyPageModule {}
