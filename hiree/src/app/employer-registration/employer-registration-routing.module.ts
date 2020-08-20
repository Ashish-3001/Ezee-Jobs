import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerRegistrationPage } from './employer-registration.page';

const routes: Routes = [
  {
    path: '',
    component: EmployerRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRegistrationPageRoutingModule {}
