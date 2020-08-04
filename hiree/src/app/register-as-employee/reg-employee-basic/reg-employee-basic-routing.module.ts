import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegEmployeeBasicPage } from './reg-employee-basic.page';

const routes: Routes = [
  {
    path: '',
    component: RegEmployeeBasicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegEmployeeBasicPageRoutingModule {}
