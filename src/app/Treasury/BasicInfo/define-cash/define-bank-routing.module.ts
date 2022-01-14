import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefineBankPage } from './define-bank.page';

const routes: Routes = [
  {
    path: '',
    component: DefineBankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefineBankPageRoutingModule {}
