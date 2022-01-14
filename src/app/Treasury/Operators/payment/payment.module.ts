import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { FormToolbarComponent } from '../../../GeneralComponent/form-toolbar/form-toolbar.component';
import { GridViewComponent } from '../../../GeneralComponent/grid-view/grid-view.component';
import { BorderControlDirective } from '../../../TotalDirectives/GraphicalDirectives/border-control.directive';
import { LovComponent } from '../../../GeneralComponent/lov/lov.component';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule
  ],
  declarations: [PaymentPage,FormToolbarComponent,GridViewComponent, BorderControlDirective,LovComponent],
  providers:[CrudManagerService]
})
export class PaymentPageModule {}
