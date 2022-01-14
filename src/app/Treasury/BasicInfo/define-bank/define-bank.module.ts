import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefineBankPageRoutingModule } from './define-bank-routing.module';

import { DefineBankPage } from './define-bank.page';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';
import { FormToolbarModule } from '../../../GeneralComponent/form-toolbar/form-toolbar.module';
import { GridViewComponentModule } from '../../../GeneralComponent/grid-view/grid-view.module';
import { BorderControlModule } from '../../../TotalDirectives/GraphicalDirectives/border-control.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormToolbarModule,GridViewComponentModule,BorderControlModule,
    DefineBankPageRoutingModule
  ],
  declarations: [DefineBankPage],
  providers:[CrudManagerService]
})
export class DefineBankPageModule {}
