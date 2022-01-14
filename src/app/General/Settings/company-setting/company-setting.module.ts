import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanySettingPageRoutingModule } from './company-setting-routing.module';

import { CompanySettingPage } from './company-setting.page';
import { FormToolbarComponent } from '../../../GeneralComponent/form-toolbar/form-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanySettingPageRoutingModule
  ],
  declarations: [CompanySettingPage,FormToolbarComponent]
})
export class CompanySettingPageModule {}
