import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BehaviorSettingPageRoutingModule } from './behavior-setting-routing.module';

import { BehaviorSettingPage } from './behavior-setting.page';
import { FormToolbarComponent } from 'src/app/GeneralComponent/form-toolbar/form-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BehaviorSettingPageRoutingModule
  ],
  declarations: [BehaviorSettingPage,FormToolbarComponent]
})
export class BehaviorSettingPageModule {}
