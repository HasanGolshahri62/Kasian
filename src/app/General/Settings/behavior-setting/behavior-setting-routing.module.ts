import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BehaviorSettingPage } from './behavior-setting.page';

const routes: Routes = [
  {
    path: '',
    component: BehaviorSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BehaviorSettingPageRoutingModule {}
