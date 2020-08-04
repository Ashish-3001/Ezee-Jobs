import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegEmployerBasicPage } from './reg-employer-basic.page';

const routes: Routes = [
  {
    path: '',
    component: RegEmployerBasicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegEmployerBasicPageRoutingModule {}
