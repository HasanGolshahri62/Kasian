import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { GridViewComponent } from "./grid-view.component";

@NgModule({imports:[IonicModule,CommonModule],
           declarations:[GridViewComponent],
           exports:[GridViewComponent]
        })
export class GridViewComponentModule{}