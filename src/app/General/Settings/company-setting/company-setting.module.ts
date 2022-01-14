import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanySettingPageRoutingModule } from './company-setting-routing.module';

import { CompanySettingPage } from './company-setting.page';
import { FormToolbarModule } from '../../../GeneralComponent/form-toolbar/form-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormToolbarModule,
    CompanySettingPageRoutingModule
  ],
  declarations: [CompanySettingPage]
})
export class CompanySettingPageModule {}
