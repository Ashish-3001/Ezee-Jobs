import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobOfferPage } from './job-offer.page';

const routes: Routes = [
  {
    path: '',
    component: JobOfferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobOfferPageRoutingModule {}
