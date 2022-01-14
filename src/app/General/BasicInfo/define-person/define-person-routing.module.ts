import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefinePersonPage } from './define-person.page';

const routes: Routes = [
  {
    path: '',
    component: DefinePersonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinePersonPageRoutingModule {}
