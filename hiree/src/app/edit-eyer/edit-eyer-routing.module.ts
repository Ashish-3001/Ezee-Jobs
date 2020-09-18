import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEyerPage } from './edit-eyer.page';

const routes: Routes = [
  {
    path: '',
    component: EditEyerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEyerPageRoutingModule {}
