import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphicalSettingPageRoutingModule } from './graphical-setting-routing.module';

import { GraphicalSettingPage } from './graphical-setting.page';
import { FormToolbarComponent } from 'src/app/GeneralComponent/form-toolbar/form-toolbar.component';
import { GridViewComponent } from 'src/app/GeneralComponent/grid-view/grid-view.component';
import { BorderControlDirective } from 'src/app/TotalDirectives/GraphicalDirectives/border-control.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphicalSettingPageRoutingModule
  ],
  declarations: [GraphicalSettingPage,FormToolbarComponent,GridViewComponent, BorderControlDirective]
})
export class GraphicalSettingPageModule {}
