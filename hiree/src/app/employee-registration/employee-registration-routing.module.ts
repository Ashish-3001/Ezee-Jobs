import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeRegistrationPage } from './employee-registration.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRegistrationPageRoutingModule {}
