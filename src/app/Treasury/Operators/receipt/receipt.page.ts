import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormContext } from 'src/app/TotalClasses/CrudClasses/FormContext';
import { BehaviorUserSettingService } from 'src/app/TotalServices/GeneralServices/behavior-user-setting.service';
import { GridSetting } from '../../../GeneralComponent/grid-view/gridSetting';
import { BasicFormBase } from '../../../TotalClasses/FormBaseClasses/BasicFormBase';
import { GraphicUserSettingService } from '../../../TotalServices/GeneralServices/graphic-user-setting.service';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage extends BasicFormBase implements OnInit {

  gridSettingNav: GridSetting = new GridSetting(false);
  gridSettingReceipt: GridSetting = new GridSetting(true);
  toolbar = { TabInfo: { Id: 17, UrlAddress: 'receipt', Title: 'Receipt' } };
  private ReceiptDtl: {
    Id: number, CashDefineId: number, BankDefineId: number, CashName: string,
    BankName: string, Price: number, Description: string
  }
  private Receipt: {
    Id: number, Serial: string, Date: string, PersonId: number, RegardId: number,
    PersonName: string, RegardName: string, Description: string,
    ReceiptDtl: {
      Id: number, CashDefineId: number, BankDefineId: number, CashName: string,
      BankName: string, Price: number, Description: string
    }[]
  };
  ReceiptNav: { Id: number, Date: string, Serial: string }[] = [];

  constructor(public userSetting: GraphicUserSettingService, public crudManager: CrudManagerService,
    private appRef: ApplicationRef, private mdlCtrl: ModalController, private behaviorUser: BehaviorUserSettingService) {
    super();
    this.Receipt = { Id: null, Serial: '', Date: '', PersonId: null, RegardId: null, PersonName: '', RegardName: '', Description: '', ReceiptDtl: [] };
    this.MasterRow = this.Receipt;
    this.TablesInfo = [new FormContext('Receipt', '', 1, true), new FormContext('ReceiptDtl', 'Receipt', 2, false)];
    this.TablesInfo[1].FkParentName = "FkReceipt";
    this.gridSettingReceipt.IsDetail = true;
    
    this.FunctionInSelectSuccess = (Results: any) => {
      if(this.ReceiptNav.length>0 && Results.length>0){
        this.ReceiptNav = [];
      }
      for (const CurrentRow of Results) {
        this.ReceiptNav.push({ Id: CurrentRow.Id, Serial: CurrentRow.Serial.toString().padStart(userSetting.SerialFormat.ReceiptZeroLength, '0'), Date: CurrentRow.Date });
      }
      this.SetEnabledForNextPage(this.ReceiptNav,behaviorUser,this.gridSettingNav);
      if(Results.length == 0){
        this.gridSettingNav.CanNextPage = false;
      }
      this.appRef.tick();

    }
    crudManager.SelectData({ TablesInfo: this.TablesInfo, CrudType: 4, "SelectName": "SelectForNav", "SelectFunctionInSuccess": this.FunctionInSelectSuccess });
    this.SelectNavJsonData = { TablesInfo: this.TablesInfo, CrudType: 4, "SelectName": "SelectForNav", "SelectFunctionInSuccess": this.FunctionInSelectSuccess };
  }

  ngOnInit() {
  }

  ShowCashListLov(currentReceiptDtl: any,selectCondition: any=null) {
    this.ReceiptDtl = currentReceiptDtl;
    let lovData = { 'SelectName': 'SelectForNav', 'SourceRow': this.ReceiptDtl, 'TablesInfo': [new FormContext('CashDefine', '', 1)] };
    lovData["ColumnsConfig"] = [{ 'Name': 'Id', 'Title': 'Id', 'MapToSource': 'CashDefineId', 'Hidden': true },
    { 'Name': 'Name', 'Title': 'Name', 'MapToSource': 'CashName' }, { 'Name': 'Code', 'Title': 'Code' }];
    lovData["myApp"] = this.appRef;
    if(selectCondition){
      lovData["SelectCondition"]=selectCondition;
      this.RunLovSilently(this.crudManager,lovData);
    }else{
      this.ShowDialog(this.mdlCtrl, lovData);
    }
    
  }

  ShowBankListLov(currentReceiptDtl: any,selectCondition: any=null) {
    this.ReceiptDtl = currentReceiptDtl;
    let lovData = { 'SelectName': 'SelectForNav', 'SourceRow': this.ReceiptDtl, 'TablesInfo': [new FormContext('BankDefine', '', 1)] };
    lovData["ColumnsConfig"] = [{ 'Name': 'Id', 'Title': 'Id', 'MapToSource': 'BankDefineId', 'Hidden': true },
    { 'Name': 'Name', 'Title': 'Name', 'MapToSource': 'BankName' }, { 'Name': 'AccountCode', 'Title': 'AccountCode' }];
    lovData["myApp"] = this.appRef;
    if(selectCondition){
      lovData["SelectCondition"]=selectCondition;
      this.RunLovSilently(this.crudManager,lovData);
    }else{
      this.ShowDialog(this.mdlCtrl, lovData);
    }
    
  }

  ShowPersonListLov(selectCondition: any = null) {
    let lovData = { 'SelectName': 'PersonLov', 'SourceRow': this.MasterRow, 'TablesInfo': [new FormContext('Person', '', 1)] };
    lovData["ColumnsConfig"] = [{ 'Name': 'Id', 'Title': 'Id', 'MapToSource': 'PersonId', 'Hidden': true },
    { 'Name': 'FullName', 'Title': 'Name', 'MapToSource': 'PersonName' }, { 'Name': 'Code', 'Title': 'Code' }];
    lovData["myApp"] = this.appRef;
    if (selectCondition) {
      lovData["SelectCondition"] = selectCondition;
      this.RunLovSilently(this.crudManager,lovData);
    } else {
      this.ShowDialog(this.mdlCtrl, lovData);
    }

  }

  ShowRegardListLov(selectCondition: any = null) {
    let lovData = { 'SelectName': 'SelectForNav', 'SourceRow': this.MasterRow, 'TablesInfo': [new FormContext('Regard', '', 1)] };
    lovData["ColumnsConfig"] = [{ 'Name': 'Id', 'Title': 'Id', 'MapToSource': 'RegardId', 'Hidden': true },
    { 'Name': 'Name', 'Title': 'Name', 'MapToSource': 'RegardName' }, { 'Name': 'Code', 'Title': 'Code', 'MapToSource': 'NoMapped' }];
    lovData["myApp"] = this.appRef;
    if (selectCondition) {
      lovData["SelectCondition"] = selectCondition;
      this.RunLovSilently(this.crudManager, lovData);
    } else {
      this.ShowDialog(this.mdlCtrl, lovData);
    }

  }

  btnGridDtlClick(btnName: string) {
    switch (btnName) {
      case 'Add':
        let minId = (Math.min(...this.Receipt.ReceiptDtl.map(x => x.Id)) || 0)
        if (minId > 0) {
          minId = 0;
        }
        this.Receipt.ReceiptDtl.push({ Id: minId - 1, CashDefineId: null, BankDefineId: null, CashName: '', BankName: '', Description: '', Price: 0 })
        break;
      case 'Remove':
        let _currentIndex = this.Receipt.ReceiptDtl.findIndex(x => x.Id == this.ReceiptDtl.Id);
        this.Receipt.ReceiptDtl.splice(_currentIndex, 1);
        break;
      default:
        break;
    }
  }

  rowGridDtlClick(currentRow: any) {
    this.ReceiptDtl = currentRow;
  }

  FunctionInInsertSuccess = (LastIndex) => {
    if (this.behaviorUser.IsLoadNavigatorAfterNew) {

    } else {
      let _max = Math.max(...this.ReceiptNav.map(x => +x.Serial));
      this.ReceiptNav.push({ Id: LastIndex, Date: this.Receipt.Date, Serial: (_max + 1).toString().padStart(this.userSetting.SerialFormat.ReceiptZeroLength, '0') });
    }
    this.appRef.tick();
  }

  NavClicked(currentRow) {
    this.crudManager.SelectData({
      TablesInfo: this.TablesInfo, CrudType: 4, "SelectName": "SelectForm", "SelectFunctionInSuccess": this.FunctionForSelectForm,
      'SelectCondition': [{ 'FieldName': 'Receipt.Id', 'FieldValue': currentRow.Id }]
    });
    this.appRef.tick();
  }

  FunctionForSelectForm = (results) => {
    this.Receipt.ReceiptDtl.splice(0);
    for (const currentRow of results) {
      this.Receipt.Id = currentRow.Id;
      this.Receipt.Date = currentRow.Date;
      this.Receipt.Description = currentRow.Description;
      this.Receipt.PersonId = currentRow.PersonId;
      this.Receipt.PersonName = currentRow.PersonName;
      this.Receipt.RegardId = currentRow.RegardId;
      this.Receipt.RegardName = currentRow.RegardName;
      this.Receipt.Serial = currentRow.Serial.toString().padStart(this.userSetting.SerialFormat.ReceiptZeroLength, '0');

      let _currentDtl: {
        Id: number, CashDefineId: number, BankDefineId: number, CashName: string,
        BankName: string, Price: number, Description: string
      } = { Id: -1, CashDefineId: -1, BankDefineId: -1, CashName: '', BankName: '', Price: 0, Description: '' };
      _currentDtl.BankDefineId = currentRow.BankDefineId;
      _currentDtl.BankName = currentRow.BankName;
      _currentDtl.CashDefineId = currentRow.CashDefineId;
      _currentDtl.CashName = currentRow.CashName;
      _currentDtl.Description = currentRow.ReceiptDtlDescription;
      _currentDtl.Id = currentRow.ReceiptDtlId;
      _currentDtl.Price = currentRow.Price;
      this.Receipt.ReceiptDtl.push(_currentDtl);
    }
    this.appRef.tick();
  }

  FunctionInUpdateSuccess = () => {
    let _id = this.Receipt.Id;
    let currentRow = this.ReceiptNav.find(x => x.Id == _id);
    if (currentRow) {
      currentRow.Date = this.Receipt.Date;
      this.appRef.tick();
    }
  }

  FunctionInDeleteSuccess = () => {

    let _findIndex = this.ReceiptNav.findIndex(x => x.Id == this.Receipt.Id);
    if (_findIndex >= 0) {
      this.ReceiptNav.splice(_findIndex, 1);
      this.appRef.tick();
    }
  }

  GetValueFromLovWithCode(currentControl, LovName: string,currentRow: any = null) {
    let _currentCode = currentControl.target.value;
    let SelectCondition
    switch (LovName) {
      case 'Person':
        SelectCondition = [{ 'FieldName': 'Code', 'FieldValue': _currentCode }];
        this.ShowPersonListLov(SelectCondition);
        break;
      case 'Regard':
        SelectCondition = [{'FieldName':'Code', 'FieldValue': _currentCode}];
        this.ShowRegardListLov(SelectCondition);
      break;
      case 'Cash':
        SelectCondition = [{'FieldName':'Code','FieldValue': _currentCode}];
        this.ShowCashListLov(currentRow,SelectCondition);
      break;
      case 'Bank':
        SelectCondition = [{'FieldName':'AccountCode','FieldValue': _currentCode}];
        this.ShowBankListLov(currentRow,SelectCondition);
      break;
      default:
        break;
    }
  }
}
