import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrudManagerService } from 'src/app/TotalServices/ManageCrud/crud-manager.service';

@Component({
  selector: 'app-lov',
  templateUrl: './lov.component.html',
  styleUrls: ['./lov.component.scss'],
})
export class LovComponent implements OnInit {

  constructor(private selectCtrl: CrudManagerService,private mdCtrl: ModalController) { }
  @Input() lovData: any;
  ListData: any[] = [];
  Columns: any[] = [];
  private currentRowIndex: number = 0;

  ngOnInit() {
    if(!this.lovData){
      throw new Error('LovData not set for Lov');
    }
    if(!this.lovData.SelectName && !this.lovData.SelectQuery){
      throw new Error("you have to set SelectName or SelectQuery in LovData");
    }
    if (!this.lovData.SourceRow) {
      throw new Error("Source row have to set");
    }
    if(!this.lovData.TablesInfo){
      throw new Error("TablesInfo have to set");
    }
    if(!this.lovData.ColumnsConfig){
      throw new Error("ColumnsConfig have to set");
    }
    this.Columns = this.lovData.ColumnsConfig;
    
    let SelectObj: any = {};
    if (this.lovData.SelectQuery) {
      SelectObj["SelectQuery"]=this.lovData.SelectQuery
    }else{
      SelectObj["SelectName"]=this.lovData.SelectName;
    }
    SelectObj["CrudType"] = 4;
    SelectObj["TablesInfo"] = this.lovData.TablesInfo;
    SelectObj["SelectFunctionInSuccess"] = (results)=>{
      for (const currentRow of results) {
        this.ListData.push(currentRow);
      }
      if(this.lovData.myApp){
        this.lovData.myApp.tick()
      }
    }
    this.selectCtrl.SelectData(SelectObj);
  }
  RowGridClick(rowClickIndex: number){
    this.currentRowIndex = rowClickIndex;
  }

  lovClick(btnName: string){
    if(btnName == 'Cancel'){
      this.mdCtrl.dismiss(null,'Cancel');
    }
    if(btnName == "Ok"){
      this.mdCtrl.dismiss(this.ListData[this.currentRowIndex],'Ok');
    }
  }
}
