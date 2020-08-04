import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EyeeAppliedPage } from './eyee-applied.page';

const routes: Routes = [
  {
    path: '',
    component: EyeeAppliedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EyeeAppliedPageRoutingModule {}
