import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefineCashPage } from './define-cash.page';

const routes: Routes = [
  {
    path: '',
    component: DefineCashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefineCashPageRoutingModule {}
