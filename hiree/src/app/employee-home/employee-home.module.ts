import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeHomePageRoutingModule } from './employee-home-routing.module';

import { EmployeeHomePage } from './employee-home.page';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeHomePageRoutingModule
  ],
  declarations: [EmployeeHomePage],
  providers: [
    CallNumber],
})
export class EmployeeHomePageModule {}
