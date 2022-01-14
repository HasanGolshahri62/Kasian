import { ModalController } from "@ionic/angular";
import { LovComponent } from "../../GeneralComponent/lov/lov.component";

export class FormLov {
    
    public ShowDialog(mdCtrl: ModalController){
        mdCtrl.create({component: LovComponent}).then(mdEl=>{
            mdEl.present();
        });
    }
}