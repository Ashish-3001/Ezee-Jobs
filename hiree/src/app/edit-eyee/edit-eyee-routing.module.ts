import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEyeePage } from './edit-eyee.page';

const routes: Routes = [
  {
    path: '',
    component: EditEyeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEyeePageRoutingModule {}
