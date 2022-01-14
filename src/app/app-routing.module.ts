import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'main-desktop',
    pathMatch: 'full'
  },
  {
    path: 'main-desktop',
    loadChildren: () => import('./main-desktop/main-desktop.module').then( m => m.MainDesktopPageModule)
  },
  {
    path: 'definePerson',
    loadChildren: () => import('./General/BasicInfo/define-person/define-person.module').then( m => m.DefinePersonPageModule)
  },
  {
    path: 'defineRegard',
    loadChildren: () => import('./General/BasicInfo/define-regard/define-regard.module').then( m => m.DefineRegardPageModule)
  },
  {
    path: 'defineCash',
    loadChildren: () => import('./Treasury/BasicInfo/define-cash/define-cash.module').then( m => m.DefineCashPageModule)
  },
  {
    path: 'defineBank',
    loadChildren: () => import('./Treasury/BasicInfo/define-bank/define-bank.module').then( m => m.DefineBankPageModule)
  },
  {
    path: 'cashFirstCourse',
    loadChildren: () => import('./Treasury/Operators/cash-first-course/cash-first-course.module').then( m => m.CashFirstCoursePageModule)
  },
  {
    path: 'bankFirstCourse',
    loadChildren: () => import('./Treasury/Operators/bank-first-course/bank-first-course.module').then( m => m.BankFirstCoursePageModule)
  },
  {
    path: 'receipt',
    loadChildren: () => import('./Treasury/Operators/receipt/receipt.module').then( m => m.ReceiptPageModule)
  },
  {
    path: 'cashAndBankTransactionsReport',
    loadChildren: () => import('./Treasury/Reports/cash-and-bank-transactions-report/cash-and-bank-transactions-report.module').then( m => m.CashAndBankTransactionsReportPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./Treasury/Operators/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'graphicalSetting',
    loadChildren: () => import('./General/Settings/graphical-setting/graphical-setting.module').then( m => m.GraphicalSettingPageModule)
  },
  {
    path: 'companySetting',
    loadChildren: () => import('./General/Settings/company-setting/company-setting.module').then( m => m.CompanySettingPageModule)
  },
  {
    path: 'behaviorSetting',
    loadChildren: () => import('./General/Settings/behavior-setting/behavior-setting.module').then( m => m.BehaviorSettingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
