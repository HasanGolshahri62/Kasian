import { ModalController } from "@ionic/angular";
import { GridSetting } from "src/app/GeneralComponent/grid-view/gridSetting";
import { BehaviorUserSettingService } from "src/app/TotalServices/GeneralServices/behavior-user-setting.service";
import { FormMode } from "../../GeneralComponent/form-toolbar/formEnumMode";
import { LovComponent } from "../../GeneralComponent/lov/lov.component";
import { CrudManagerService } from "../../TotalServices/ManageCrud/crud-manager.service";
import { FormContext } from "../CrudClasses/FormContext";

export class BasicFormBase {

    private _isFormActive: boolean = false;
    private _currentFormMode: FormMode;
    public SelectNavJsonData: any;


    constructor() {
    }

    public FormModeChanged(currentFormMode: FormMode) {
        this._currentFormMode = currentFormMode;
        if (currentFormMode == FormMode.Add || currentFormMode == FormMode.Edit) {
            this._isFormActive = true;
        } else {
            this._isFormActive = false;
        }
    }

    public get IsFormActive(): boolean {
        return this._isFormActive;
    }

    public MasterRow: any;
    private oldMasterRow: any;

    public MasterRowDefault: any;
    public MasterKeyList: string[] = ["Id"];

    public NewMasterClicked() {
        if (this.MasterRow) {
            this.oldMasterRow = this.MasterRow;
        }
        for (const propName of Object.keys(this.MasterRow)) {

            if (this.MasterKeyList.includes(propName)) {
                if (typeof this.MasterRow[propName] == 'number') {
                    this.MasterRow[propName] = -1;
                } else {
                    this.MasterRow[propName] = '';
                }
            } else {
                if (typeof this.MasterRow[propName] == 'number') {
                    this.MasterRow[propName] = 0;
                } else if (typeof this.MasterRow[propName] == 'string') {
                    this.MasterRow[propName] = '';
                } else if (typeof this.MasterRow[propName] == 'object' && Array.isArray(this.MasterRow[propName])) {
                    this.MasterRow[propName].length = 0;
                }
            }
        }
    }

    public EditClicked() {
        this.oldMasterRow = {};
        if (this.MasterRow) {
            for (const key in this.MasterRow) {
                if (Object.prototype.hasOwnProperty.call(this.MasterRow, key)) {
                    const element = this.MasterRow[key];
                    if (!Array.isArray(element)) {
                        this.oldMasterRow[key] = element;
                    } else {
                        this.oldMasterRow[key] = [];
                        for (const currentRow of element) {
                            this.oldMasterRow[key].push({ ...currentRow });
                        }
                    }
                }
            }
        }
    }

    public CancelClicked(){
        if (this.oldMasterRow) {
            for (const key in this.oldMasterRow) {
                if (Object.prototype.hasOwnProperty.call(this.oldMasterRow, key)) {
                    const element = this.oldMasterRow[key];
                    if (!Array.isArray(element)) {
                        this.MasterRow[key] = element;
                    } else {
                        this.MasterRow[key] = [];
                        for (const currentRow of element) {
                            this.MasterRow[key].push({ ...currentRow });
                        }
                    }
                }
            }
        }
    }


    public GoToPage(pageIndex:number,crudManager: CrudManagerService){
        
        this.SelectNavJsonData["CurrentRowIndex"] = pageIndex;
        crudManager.SelectData(this.SelectNavJsonData);
    }

    protected SetEnabledForNextPage(navData: any[],bhvSetting: BehaviorUserSettingService,grdSetting: GridSetting){
        if(navData.length< bhvSetting.NavigatorPageSize){
            grdSetting.CanNextPage = false;
        }else{
            grdSetting.CanNextPage = true;
        }
    }
    //#region ForCrud

    protected TablesInfo: FormContext[] = [];

    protected FunctionInSelectSuccess: any;

    protected FunctionInInsertSuccess: any;

    protected FunctionInUpdateSuccess: any;

    protected FunctionInDeleteSuccess: any;

    protected saveForm(crudManager: CrudManagerService) {
        let SaveObject = { ...this.MasterRow };
        SaveObject["TablesInfo"] = this.TablesInfo;
        
        SaveObject["CrudType"] = (this._currentFormMode == FormMode.Add) ? 1 : 2;
        if (this._currentFormMode == FormMode.Add) {
            SaveObject["FunctionInInsertSuccess"] = this.FunctionInInsertSuccess;
            crudManager.SaveNewData(SaveObject);
        } else {
            SaveObject["FunctionInUpdateSuccess"] = this.FunctionInUpdateSuccess;
            crudManager.SaveEditedData(SaveObject, this.oldMasterRow);
        }

    }

    protected DeleteForm(crudManager: CrudManagerService) {
        let deleteObject = { ...this.MasterRow };
        deleteObject["TablesInfo"] = this.TablesInfo;
        deleteObject["CrudType"] = 3;
        deleteObject["FunctionInDeleteSuccess"] = this.FunctionInDeleteSuccess;

        crudManager.DeleteData(deleteObject);
    }

    //#endregion ForCrud

    //#region FormLov

    public ShowDialog(mdCtrl: ModalController, LovData: any) {
        mdCtrl.create({ component: LovComponent, componentProps: { lovData: LovData } }).then(mdEl => {
            mdEl.present();
            return mdEl.onDidDismiss();
        }).then(resultData => {
            if (resultData.role == "Ok") {
                for (const column of LovData.ColumnsConfig) {
                    if (column.MapToSource) {
                        LovData.SourceRow[column.MapToSource] = resultData.data[column.Name];
                    }
                }
            }
        });
    }

    public RunLovSilently(crudManager: CrudManagerService, LovData: any) {
        let SuccessFunction = (results) => {
            
            let _currentRow = results[0]
            
            for (const columnConfig of LovData.ColumnsConfig) {
                if(!_currentRow){
                    LovData.SourceRow[columnConfig.MapToSource] = null;
                }else{
                    LovData.SourceRow[columnConfig.MapToSource] = _currentRow[columnConfig.Name];
                }
                
            }
            if (LovData.myApp) {
                LovData.myApp.tick();
            }
        }
        crudManager.SelectData({
            'TablesInfo': LovData.TablesInfo, CrudType: 4, "SelectName": LovData.SelectName,
            "SelectCondition": LovData.SelectCondition, "SelectFunctionInSuccess": SuccessFunction
        });
    }

    //#endregion FormLov

    //#region Voice
    getTextVoiceAndDo(textReturned:string,crudManager: CrudManagerService){
    
        let propList = Object.getOwnPropertyNames(this.MasterRow);
        if(textReturned.startsWith("go to")){
          textReturned = textReturned.substring(5).trim();
          textReturned = textReturned.replace('record','').trim();
          if(Number(textReturned)){
            this.GoToPage(Number(textReturned)-1,crudManager);
          }
        }else{
          let totalWords = textReturned.split(' ');
          if (totalWords[0] == 'new') {
            this.NewMasterClicked();
          }
          if (totalWords[0] == 'edit') {
            this.EditClicked();
          }
          if (totalWords[0] == 'cancel') {
            this.CancelClicked();
          }
          if (totalWords[0] == 'new' || totalWords[0] == 'edit') {
            for (const currentAttr of propList) {
              let indx = textReturned.indexOf(currentAttr);
              if (indx>=0) {
                let endIndex = (textReturned.indexOf(' ',indx+currentAttr.length)>=0)?textReturned.indexOf(' ',indx+currentAttr.length+1):textReturned.length;
                let currentValue = textReturned.substring(indx+currentAttr.length,endIndex).trim();
                this.MasterRow[currentAttr] = currentValue;
              }
            }
            
            if(textReturned.includes('save')){
              this.saveForm(crudManager);
            }
          }
        }
      }//end getText

    //#endregion Voice
}