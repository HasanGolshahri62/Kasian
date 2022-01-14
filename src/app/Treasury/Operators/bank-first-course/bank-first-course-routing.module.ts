import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankFirstCoursePage } from './bank-first-course.page';

const routes: Routes = [
  {
    path: '',
    component: BankFirstCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankFirstCoursePageRoutingModule {}
