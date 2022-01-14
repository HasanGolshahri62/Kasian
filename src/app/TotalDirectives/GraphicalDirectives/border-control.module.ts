import { NgModule } from "@angular/core";
import { BorderControlDirective } from "./border-control.directive";

@NgModule({declarations:[BorderControlDirective],
           exports:[BorderControlDirective]})
export class BorderControlModule{}