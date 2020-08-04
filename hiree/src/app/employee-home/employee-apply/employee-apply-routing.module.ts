import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeApplyPage } from './employee-apply.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeApplyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeApplyPageRoutingModule {}
