import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployerProfilePageRoutingModule } from './employee-profile-routing.module';

import { EmployerProfilePage } from './employee-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployerProfilePageRoutingModule
  ],
  declarations: [EmployerProfilePage]
})
export class EmployerProfilePageModule {}
