import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployerHomePageRoutingModule } from './employer-home-routing.module';

import { FolderPage } from './employer-home.page';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployerHomePageRoutingModule
  ],
  declarations: [FolderPage],
  providers: [
    CallNumber],
})
export class EmployerHomePageModule {}
