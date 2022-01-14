import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BehaviorSettingPageRoutingModule } from './behavior-setting-routing.module';

import { BehaviorSettingPage } from './behavior-setting.page';
import { FormToolbarModule } from '../../../GeneralComponent/form-toolbar/form-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormToolbarModule,
    BehaviorSettingPageRoutingModule
  ],
  declarations: [BehaviorSettingPage]
})
export class BehaviorSettingPageModule {}
