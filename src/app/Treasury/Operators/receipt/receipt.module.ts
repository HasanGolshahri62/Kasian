import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiptPageRoutingModule } from './receipt-routing.module';

import { ReceiptPage } from './receipt.page';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';
import { FormToolbarModule } from '../../../GeneralComponent/form-toolbar/form-toolbar.module';
import { GridViewComponentModule } from '../../../GeneralComponent/grid-view/grid-view.module';
import { LovModule } from '../../../GeneralComponent/lov/lov.module';
import { BorderControlModule } from '../../../TotalDirectives/GraphicalDirectives/border-control.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormToolbarModule,GridViewComponentModule,LovModule,BorderControlModule,
    ReceiptPageRoutingModule
  ],
  declarations: [ReceiptPage],
  providers:[CrudManagerService]
})
export class ReceiptPageModule {}
