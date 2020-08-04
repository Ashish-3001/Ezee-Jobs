import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationsRecPage } from './application-status.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsRecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationsRecPageRoutingModule {}
