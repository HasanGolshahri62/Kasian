import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { FormToolbarComponent } from "./form-toolbar.component";

@NgModule({imports:[CommonModule,IonicModule],
    declarations:[FormToolbarComponent],
    exports:[FormToolbarComponent]})
export class FormToolbarModule{}