import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GridSetting } from '../../../GeneralComponent/grid-view/gridSetting';
import { FormContext } from '../../../TotalClasses/CrudClasses/FormContext';
import { BasicFormBase } from '../../../TotalClasses/FormBaseClasses/BasicFormBase';
import { BehaviorUserSettingService } from '../../../TotalServices/GeneralServices/behavior-user-setting.service';
import { GraphicUserSettingService } from '../../../TotalServices/GeneralServices/graphic-user-setting.service';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage extends BasicFormBase implements OnInit {

  gridSettingNav: GridSetting = new GridSetting(false);
  gridSettingPayment: GridSetting = new GridSetting(true);
  toolbar = {TabInfo:{Id:18,UrlAddress:'payment',Title:'Payment'}};
  private PaymentDtl: {
    Id: number, CashDefineId: number, BankDefineId: number, CashName: string,
    BankName: string, Price: number, Description: string
  }
  private Payment: {
    Id: number, Serial: string, Date: string, PersonId: number, RegardId: number,
    PersonName: string, RegardName: string, Description: string,
    PaymentDtl: {
      Id: number, CashDefineId: number, BankDefineId: number, CashName: string,
      BankName: string, Price: number, Description: string
    }[]
  };
  PaymentNav: { Id: number, Date: string, Serial: string }[] = [];

  constructor(public userSetting: GraphicUserSettingService, public crudManager: CrudManagerService,
    private appRef: ApplicationRef, private mdlCtrl: ModalController, private behaviorUser: BehaviorUserSettingService) { 
    super();
    this.Payment = { Id: null, Serial: '', Date: '', PersonId: null, RegardId: null, PersonName: '', RegardName: '', Description: '', PaymentDtl: [] };
    this.MasterRow = this.Payment;
    this.TablesInfo = [new FormContext('Payment', '', 1, true), new FormContext('PaymentDtl', 'Payment', 2, false)];
    this.TablesInfo[1].FkParentName = "FkPayment";
    this.gridSettingPayment.IsDetail = true;
    this.FunctionInSelectSuccess = (Results: any) => {
      if(this.PaymentNav.length>0 && Results.length>0){
        this.PaymentNav = [];
      }
      for (const CurrentRow of Results) {
        this.PaymentNav.push({ Id: CurrentRow.Id, Serial: CurrentRow.Serial.toString().padStart(userSetting.SerialFormat.PaymentZeroLength, '0'), Date: CurrentRow.Date });
      }
      this.SetEnabledForNextPage(this.PaymentNav,behaviorUser,this.gridSettingNav);
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

  ShowCashListLov(currentPaymentDtl: any,selectCondition: any=null) {
    this.PaymentDtl = currentPaymentDtl;
    let lovData = { 'SelectName': 'SelectForNav', 'SourceRow': this.PaymentDtl, 'TablesInfo': [new FormContext('CashDefine', '', 1)] };
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

  ShowBankListLov(currentPaymentDtl: any,selectCondition: any=null) {
    this.PaymentDtl = currentPaymentDtl;
    let lovData = { 'SelectName': 'SelectForNav', 'SourceRow': this.PaymentDtl, 'TablesInfo': [new FormContext('BankDefine', '', 1)] };
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
        let minId = (Math.min(...this.Payment.PaymentDtl.map(x => x.Id)) || 0)
        if (minId > 0) {
          minId = 0;
        }
        this.Payment.PaymentDtl.push({ Id: minId - 1, CashDefineId: null, BankDefineId: null, CashName: '', BankName: '', Description: '', Price: 0 })
        break;
      case 'Remove':
        let _currentIndex = this.Payment.PaymentDtl.findIndex(x => x.Id == this.PaymentDtl.Id);
        this.Payment.PaymentDtl.splice(_currentIndex, 1);
        break;
      default:
        break;
    }
  }

  rowGridDtlClick(currentRow: any) {
    this.PaymentDtl = currentRow;
  }

  FunctionInInsertSuccess = (LastIndex) => {
    if (this.behaviorUser.IsLoadNavigatorAfterNew) {

    } else {
      let _max = Math.max(...this.PaymentNav.map(x => +x.Serial));
      this.PaymentNav.push({ Id: LastIndex, Date: this.Payment.Date, Serial: (_max + 1).toString().padStart(this.userSetting.SerialFormat.PaymentZeroLength, '0') });
    }
    this.appRef.tick();
  }

  NavClicked(currentRow) {
    this.crudManager.SelectData({
      TablesInfo: this.TablesInfo, CrudType: 4, "SelectName": "SelectForm", "SelectFunctionInSuccess": this.FunctionForSelectForm,
      'SelectCondition': [{ 'FieldName': 'Payment.Id', 'FieldValue': currentRow.Id }]
    });
    this.appRef.tick();
  }

  FunctionForSelectForm = (results) => {
    this.Payment.PaymentDtl.splice(0);
    for (const currentRow of results) {
      this.Payment.Id = currentRow.Id;
      this.Payment.Date = currentRow.Date;
      this.Payment.Description = currentRow.Description;
      this.Payment.PersonId = currentRow.PersonId;
      this.Payment.PersonName = currentRow.PersonName;
      this.Payment.RegardId = currentRow.RegardId;
      this.Payment.RegardName = currentRow.RegardName;
      this.Payment.Serial = currentRow.Serial.toString().padStart(this.userSetting.SerialFormat.PaymentZeroLength, '0');

      let _currentDtl: {
        Id: number, CashDefineId: number, BankDefineId: number, CashName: string,
        BankName: string, Price: number, Description: string
      } = { Id: -1, CashDefineId: -1, BankDefineId: -1, CashName: '', BankName: '', Price: 0, Description: '' };
      _currentDtl.BankDefineId = currentRow.BankDefineId;
      _currentDtl.BankName = currentRow.BankName;
      _currentDtl.CashDefineId = currentRow.CashDefineId;
      _currentDtl.CashName = currentRow.CashName;
      _currentDtl.Description = currentRow.PaymentDtlDescription;
      _currentDtl.Id = currentRow.PaymentDtlId;
      _currentDtl.Price = currentRow.Price;
      this.Payment.PaymentDtl.push(_currentDtl);
    }
    this.appRef.tick();
  }

  FunctionInUpdateSuccess = () => {
    let _id = this.Payment.Id;
    let currentRow = this.PaymentNav.find(x => x.Id == _id);
    if (currentRow) {
      currentRow.Date = this.Payment.Date;
      this.appRef.tick();
    }
  }

  FunctionInDeleteSuccess = () => {

    let _findIndex = this.PaymentNav.findIndex(x => x.Id == this.Payment.Id);
    if (_findIndex >= 0) {
      this.PaymentNav.splice(_findIndex, 1);
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
