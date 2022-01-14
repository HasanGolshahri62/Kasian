import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefineBankPageRoutingModule } from './define-bank-routing.module';

import { DefineBankPage } from './define-bank.page';
import { FormToolbarComponent } from '../../../GeneralComponent/form-toolbar/form-toolbar.component';
import { GridViewComponent } from '../../../GeneralComponent/grid-view/grid-view.component';
import { BorderControlDirective } from '../../../TotalDirectives/GraphicalDirectives/border-control.directive';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefineBankPageRoutingModule
  ],
  declarations: [DefineBankPage,FormToolbarComponent,GridViewComponent, BorderControlDirective],
  providers:[CrudManagerService]
})
export class DefineBankPageModule {}
