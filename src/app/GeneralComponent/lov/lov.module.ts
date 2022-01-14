import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BorderControlModule } from "../../TotalDirectives/GraphicalDirectives/border-control.module";
import { LovComponent } from "./lov.component";

@NgModule({imports:[IonicModule,CommonModule,FormsModule,BorderControlModule],
          declarations:[LovComponent],
          exports:[LovComponent]
}) 
export class LovModule{}