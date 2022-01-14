import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefineRegardPage } from './define-regard.page';

const routes: Routes = [
  {
    path: '',
    component: DefineRegardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefineRegardPageRoutingModule {}
