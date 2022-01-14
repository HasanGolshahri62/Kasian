import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashAndBankTransactionsReportPageRoutingModule } from './cash-and-bank-transactions-report-routing.module';

import { CashAndBankTransactionsReportPage } from './cash-and-bank-transactions-report.page';
import { FormToolbarComponent } from '../../../GeneralComponent/form-toolbar/form-toolbar.component';
import { GridViewComponent } from '../../../GeneralComponent/grid-view/grid-view.component';
import { BorderControlDirective } from '../../../TotalDirectives/GraphicalDirectives/border-control.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashAndBankTransactionsReportPageRoutingModule
  ],
  declarations: [CashAndBankTransactionsReportPage,FormToolbarComponent,GridViewComponent, BorderControlDirective]
})
export class CashAndBankTransactionsReportPageModule {}
