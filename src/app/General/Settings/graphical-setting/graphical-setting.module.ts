import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphicalSettingPageRoutingModule } from './graphical-setting-routing.module';

import { GraphicalSettingPage } from './graphical-setting.page';
import { FormToolbarModule } from '../../../GeneralComponent/form-toolbar/form-toolbar.module';
import { GridViewComponentModule } from '../../../GeneralComponent/grid-view/grid-view.module';
import { BorderControlModule } from '../../../TotalDirectives/GraphicalDirectives/border-control.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormToolbarModule,GridViewComponentModule,BorderControlModule,
    GraphicalSettingPageRoutingModule
  ],
  declarations: [GraphicalSettingPage]
})
export class GraphicalSettingPageModule {}
