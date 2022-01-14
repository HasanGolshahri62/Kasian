import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashFirstCoursePage } from './cash-first-course.page';

const routes: Routes = [
  {
    path: '',
    component: CashFirstCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashFirstCoursePageRoutingModule {}
