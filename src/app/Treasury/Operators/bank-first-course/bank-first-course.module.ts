import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankFirstCoursePageRoutingModule } from './bank-first-course-routing.module';

import { BankFirstCoursePage } from './bank-first-course.page';
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
    BankFirstCoursePageRoutingModule
  ],
  declarations: [BankFirstCoursePage],
  providers:[CrudManagerService]
})
export class BankFirstCoursePageModule {}
