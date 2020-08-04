import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerProfilePage } from './employee-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EmployerProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerProfilePageRoutingModule {}
