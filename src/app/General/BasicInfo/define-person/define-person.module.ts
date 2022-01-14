import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DefinePersonPageRoutingModule } from './define-person-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers } from '@ionic/storage';

import { DefinePersonPage } from './define-person.page';
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
    DefinePersonPageRoutingModule,IonicStorageModule.forRoot({
      driverOrder: [CordovaSQLiteDriver._driver,Drivers.IndexedDB]
    })
  ],
  declarations: [DefinePersonPage],
  providers:[CrudManagerService]
})
export class DefinePersonPageModule {}
