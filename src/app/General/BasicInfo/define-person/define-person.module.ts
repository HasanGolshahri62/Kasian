import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DefinePersonPageRoutingModule } from './define-person-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers } from '@ionic/storage';

import { DefinePersonPage } from './define-person.page';
import { FormToolbarComponent } from 'src/app/GeneralComponent/form-toolbar/form-toolbar.component';
import { GridViewComponent } from 'src/app/GeneralComponent/grid-view/grid-view.component';
import { BorderControlDirective } from 'src/app/TotalDirectives/GraphicalDirectives/border-control.directive';
import { CrudManagerService } from 'src/app/TotalServices/ManageCrud/crud-manager.service';
import { ContentControlDirective } from 'src/app/TotalDirectives/GraphicalDirectives/content-control.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefinePersonPageRoutingModule,IonicStorageModule.forRoot({
      driverOrder: [CordovaSQLiteDriver._driver,Drivers.IndexedDB]
    })
  ],
  declarations: [DefinePersonPage,FormToolbarComponent,GridViewComponent, BorderControlDirective],
  providers:[CrudManagerService]
})
export class DefinePersonPageModule {}
