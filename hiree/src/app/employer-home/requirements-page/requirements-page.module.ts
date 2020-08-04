import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequirementsPagePageRoutingModule } from './requirements-page-routing.module';

import { RequirementsPagePage } from './requirements-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequirementsPagePageRoutingModule
  ],
  declarations: [RequirementsPagePage]
})
export class RequirementsPagePageModule {}
