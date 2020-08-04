import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EyeeShortlistedPage } from './eyee-shortlisted.page';

const routes: Routes = [
  {
    path: '',
    component: EyeeShortlistedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EyeeShortlistedPageRoutingModule {}
