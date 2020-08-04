import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsOfferedPage } from './jobs-offered.page';

const routes: Routes = [
  {
    path: '',
    component: JobsOfferedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsOfferedPageRoutingModule {}
