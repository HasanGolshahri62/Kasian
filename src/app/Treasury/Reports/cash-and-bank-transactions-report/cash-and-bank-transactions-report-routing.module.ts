import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashAndBankTransactionsReportPage } from './cash-and-bank-transactions-report.page';

const routes: Routes = [
  {
    path: '',
    component: CashAndBankTransactionsReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashAndBankTransactionsReportPageRoutingModule {}
