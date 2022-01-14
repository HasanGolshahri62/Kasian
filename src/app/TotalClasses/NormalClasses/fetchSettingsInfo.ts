import { BehaviorUserSettingService } from "src/app/TotalServices/GeneralServices/behavior-user-setting.service";
import { GraphicUserSettingService } from "src/app/TotalServices/GeneralServices/graphic-user-setting.service";
import { CrudManagerService } from "src/app/TotalServices/ManageCrud/crud-manager.service";
import { FormContext } from "../CrudClasses/FormContext";

export class FetchSettingsInfo{

    constructor(private crudMngr: CrudManagerService){  }

    public FetchAndSetGraphicalUserSetting(usrgrphSetting: GraphicUserSettingService){
        let jsonData: any = {};
        jsonData["SelectName"] = "SelectForm";
        jsonData["CrudType"] = 4;
        jsonData["TablesInfo"] = [new FormContext("GraphicalUserSetting","",1)];
        jsonData["SelectFunctionInSuccess"]= (results)=>{
            if(results && results[0])
            {

                usrgrphSetting.Id = results[0].Id;
                if(results[0].DateDisplayFormat){
                    usrgrphSetting.DateDisplayFormat = results[0].DateDisplayFormat;
                }
                if(results[0].HeaderGridBorderWidth){
                    usrgrphSetting.GridBorderHeaderSetting.BorderColor = results[0].HeaderGridBorderWidth;
                }
                if(results[0].HeaderGridBorderStyle){
                    usrgrphSetting.GridBorderHeaderSetting.BorderStyle = results[0].HeaderGridBorderStyle;
                }
                if(results[0].HeaderGridBorderWidth){
                    usrgrphSetting.GridBorderHeaderSetting.BorderWidth = results[0].HeaderGridBorderWidth;
                }
                if(results[0].RowsGridBorderColor){
                    usrgrphSetting.GridBorderRowSetting.BorderColor = results[0].RowsGridBorderColor;
                }
                if(results[0].RowsGridBorderStyle){
                    usrgrphSetting.GridBorderRowSetting.BorderStyle = results[0].RowsGridBorderStyle;
                }
                if(results[0].RowsGridBorderWidth){
                    usrgrphSetting.GridBorderRowSetting.BorderWidth = results[0].RowsGridBorderWidth;
                }
                if(results[0].MiniGridBorderColor){
                    usrgrphSetting.GridBorderSetting.BorderColor = results[0].MiniGridBorderColor;
                }
                if(results[0].MiniGridBorderStyle){
                    usrgrphSetting.GridBorderSetting.BorderStyle = results[0].MiniGridBorderStyle;
                }
                if(results[0].MiniGridBorderWidth){
                    usrgrphSetting.GridBorderSetting.BorderWidth = results[0].MiniGridBorderWidth;
                }
                if(results[0].GridHeaderBackColor){
                    usrgrphSetting.GridHeaderBackColor = results[0].GridHeaderBackColor;
                }
                if(results[0].GridRowsBackColor){
                    usrgrphSetting.GridRowsBackColor = results[0].GridRowsBackColor;
                }
                if(results[0].LabelPositionStyle){
                    usrgrphSetting.LabelPositionStyle = results[0].LabelPositionStyle;
                }
                if(results[0].BackgroundColor){
                    usrgrphSetting.MultiBackgroundColor[0] = results[0].BackgroundColor;
                    document.documentElement.style.setProperty('--ion-background-color', usrgrphSetting.MultiBackgroundColor[0]);
                }
                if(results[0].PageDirection){
                    usrgrphSetting.PageDirection = results[0].PageDirection;
                }
                if(results[0].ReceiptSerialLength){
                    usrgrphSetting.SerialFormat.PaymentZeroLength = results[0].ReceiptSerialLength;
                }
                if(results[0].PaymentSerialLength){
                    usrgrphSetting.SerialFormat.ReceiptZeroLength = results[0].PaymentSerialLength;
                }
                if(results[0].tabLocation){
                    usrgrphSetting.tabLocation = results[0].tabLocation;
                }
            }
        }
        this.crudMngr.SelectData(jsonData);
    }

    FetchAndSetBehaviorSetting(usrbhvSetting: BehaviorUserSettingService){
        let jsonData: any = {};
        jsonData["SelectName"] = "SelectForm";
        jsonData["CrudType"] = 4;
        jsonData["TablesInfo"] = [new FormContext("BehaviorUserSetting","",1)];
        jsonData["SelectFunctionInSuccess"]= (results)=>{
            if(results && results[0]){
                usrbhvSetting.Id = results[0].Id;
                if(results[0].IsLoadNavigatorAfterNew){
                    usrbhvSetting.IsLoadNavigatorAfterNew = results[0].IsLoadNavigatorAfterNew;
                }
                if(results[0].IsLoadNavigatorAfterUpdate){
                    usrbhvSetting.IsLoadNavigatorAfterUpdate = results[0].IsLoadNavigatorAfterUpdate;
                }
                if(results[0].MainUrlAddress){
                    usrbhvSetting.MainUrlAddress = results[0].MainUrlAddress
                }
                if(results[0].NavigatorPageSize){
                    usrbhvSetting.NavigatorPageSize = results[0].NavigatorPageSize
                }
                if(results[0].SaveMode){
                    usrbhvSetting.SaveMode = results[0].SaveMode
                }
                if (results[0].IsRecordVoice) {
                    usrbhvSetting.IsRecordVoice = "1"
                }
            }
        }
        this.crudMngr.SelectData(jsonData);
    }//end mt
}//end class