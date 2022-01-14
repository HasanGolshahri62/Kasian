import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphicalSettingPage } from './graphical-setting.page';

const routes: Routes = [
  {
    path: '',
    component: GraphicalSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphicalSettingPageRoutingModule {}
