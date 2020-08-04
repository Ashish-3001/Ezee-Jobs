import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterAsEmployerPage } from './register-as-employer.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterAsEmployerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterAsEmployerPageRoutingModule {}
