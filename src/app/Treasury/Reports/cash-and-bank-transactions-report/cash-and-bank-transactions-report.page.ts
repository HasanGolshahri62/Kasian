import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GridSetting } from '../../../GeneralComponent/grid-view/gridSetting';
import { FormContext } from '../../../TotalClasses/CrudClasses/FormContext';
import { BasicFormBase } from '../../../TotalClasses/FormBaseClasses/BasicFormBase';
import { BehaviorUserSettingService } from '../../../TotalServices/GeneralServices/behavior-user-setting.service';
import { GraphicUserSettingService } from '../../../TotalServices/GeneralServices/graphic-user-setting.service';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';

@Component({
  selector: 'app-cash-and-bank-transactions-report',
  templateUrl: './cash-and-bank-transactions-report.page.html',
  styleUrls: ['./cash-and-bank-transactions-report.page.scss'],
})
export class CashAndBankTransactionsReportPage extends BasicFormBase implements OnInit {

  private _isBetween: boolean = false;
  private _isShowLov: boolean = false;
  private _isShowDetail: boolean = false;

  MasterReport: any;
  MasterColumnHeader: string[];
  MasterFooter: {'ReceiptPrice':number,'PaymentPrice':number,'Title':string,'FakeColumns':string[]};
  DetailReport: {Type: string,FormSerial:string,ReceiptPrice:number,PaymentPrice:number,Date: string}[];
  currentMasterReport: any;

  //DetailReport: {}
  filterList: { FilterField: string, FilterType: string,FilterOne:string,FilterTwo:string,FilterOneId:number,
    FilterTwoId:number, GroupByList: string[] };

  constructor(public userSetting: GraphicUserSettingService, public crudManager: CrudManagerService,
    private mdlCtrl: ModalController, private behaviorUser: BehaviorUserSettingService,private appRef: ApplicationRef) {
    super();
    this.crudDisplay = { All: false, New: false, Edit: false, Delete: false, Save: false, More: false };
    this.filterList = { FilterField: '', FilterType: '',FilterOne: '',FilterTwo:'',FilterOneId:null,
    FilterTwoId:null,GroupByList:[''] };
    this.MasterReport = [];
    this.MasterColumnHeader = [];
    this.MasterFooter = {ReceiptPrice:0,PaymentPrice:0,Title:'Sum',FakeColumns:[]};
    this.DetailReport = [{Type:'',FormSerial:'',PaymentPrice:0,ReceiptPrice:0,Date:''}];
    this.DetailReport.splice(0);
  }

  crudDisplay: { All: boolean, New: boolean, Edit: boolean, Delete: boolean, Save: boolean, More: boolean };
  toolbar = { TabInfo: { Id: 23, UrlAddress: 'cashAndBankTransactionsReport', Title: 'Cash and Bank transactions' } };
  gridReport: GridSetting = new GridSetting(true);

  ngOnInit() {
  }

  filterTypeChange(objSelect) {
    if (objSelect.detail.value == "Between") {
      this._isBetween = true;
    } else {
      this._isBetween = false;
    }
  }

  filterFieldChange(objSelect) {
    this.filterList.FilterOne = "";
    this.filterList.FilterOneId = null;
    this.filterList.FilterTwo = "";
    this.filterList.FilterTwoId = null;

    if (objSelect.detail.value != "Date") {
      this._isShowLov = true;
    } else {
      this._isShowLov = false;
    }
  }

  ShowCashListLov(selectCondition: any=null,filterLevel: number) {
    let _idFieldName:string = '',_nameFieldName:string = '';
     
    _idFieldName =(filterLevel == 1)? "FilterOneId":"FilterTwoId";
    _nameFieldName=(filterLevel == 1)?"FilterOne":"FilterTwo";
    
    let lovData = { 'SelectName': 'SelectForNav', 'SourceRow': this.filterList, 'TablesInfo': [new FormContext('CashDefine', '', 1)] };
    lovData["ColumnsConfig"] = [{ 'Name': 'Id', 'Title': 'Id', 'MapToSource': _idFieldName, 'Hidden': true },
    { 'Name': 'Name', 'Title': 'Name', 'MapToSource': _nameFieldName }, { 'Name': 'Code', 'Title': 'Code' }];
    lovData["myApp"] = this.appRef;

    if(selectCondition){
      lovData["SelectCondition"]=selectCondition;
      this.RunLovSilently(this.crudManager,lovData);
    }else{
      this.ShowDialog(this.mdlCtrl, lovData);
    }
    
  }

  ShowBankListLov(selectCondition: any=null,filterLevel: number) {
    let _idFieldName:string = '',_nameFieldName:string = '';
     
    _idFieldName =(filterLevel == 1)? "FilterOneId":"FilterTwoId";
    _nameFieldName=(filterLevel == 1)?"FilterOne":"FilterTwo";

    let lovData = { 'SelectName': 'SelectForNav', 'SourceRow': this.filterList, 'TablesInfo': [new FormContext('BankDefine', '', 1)] };
    lovData["ColumnsConfig"] = [{ 'Name': 'Id', 'Title': 'Id', 'MapToSource': _idFieldName, 'Hidden': true },
    { 'Name': 'Name', 'Title': 'Name', 'MapToSource': _nameFieldName }, { 'Name': 'AccountCode', 'Title': 'AccountCode' }];
    lovData["myApp"] = this.appRef;
    if(selectCondition){
      lovData["SelectCondition"]=selectCondition;
      this.RunLovSilently(this.crudManager,lovData);
    }else{
      this.ShowDialog(this.mdlCtrl, lovData);
    }
    
  }

  ShowPersonListLov(selectCondition: any = null,filterLevel: number) {
    let _idFieldName:string = '',_nameFieldName:string = '';
     
    _idFieldName =(filterLevel == 1)? "FilterOneId":"FilterTwoId";
    _nameFieldName=(filterLevel == 1)?"FilterOne":"FilterTwo";

    let lovData = { 'SelectName': 'PersonLov', 'SourceRow': this.filterList, 'TablesInfo': [new FormContext('Person', '', 1)] };
    lovData["ColumnsConfig"] = [{ 'Name': 'Id', 'Title': 'Id', 'MapToSource': _idFieldName, 'Hidden': true },
    { 'Name': 'FullName', 'Title': 'Name', 'MapToSource': _nameFieldName }, { 'Name': 'Code', 'Title': 'Code' }];
    lovData["myApp"] = this.appRef;
    if (selectCondition) {
      lovData["SelectCondition"] = selectCondition;
      this.RunLovSilently(this.crudManager,lovData);
    } else {
      this.ShowDialog(this.mdlCtrl, lovData);
    }

  }

  ShowRegardListLov(selectCondition: any = null,filterLevel: number) {
    let _idFieldName:string = '',_nameFieldName:string = '';
     
    _idFieldName =(filterLevel == 1)? "FilterOneId":"FilterTwoId";
    _nameFieldName=(filterLevel == 1)?"FilterOne":"FilterTwo";

    let lovData = { 'SelectName': 'SelectForNav', 'SourceRow': this.filterList, 'TablesInfo': [new FormContext('Regard', '', 1)] };
    lovData["ColumnsConfig"] = [{ 'Name': 'Id', 'Title': 'Id', 'MapToSource': _idFieldName, 'Hidden': true },
    { 'Name': 'Name', 'Title': 'Name', 'MapToSource': _nameFieldName }, { 'Name': 'Code', 'Title': 'Code', 'MapToSource': 'NoMapped' }];
    lovData["myApp"] = this.appRef;
    if (selectCondition) {
      lovData["SelectCondition"] = selectCondition;
      this.RunLovSilently(this.crudManager, lovData);
    } else {
      this.ShowDialog(this.mdlCtrl, lovData);
    }

  }

  lovClicked(filterLevel:number,objSelect:any){
    let selectCondition: any;
    let _currentCode = null,_fieldName:string = '';
    if(objSelect){
      _currentCode = objSelect.target.value;
    }
    
    switch (this.filterList.FilterField) {
      case 'Person':
        if(_currentCode){
          selectCondition = [{'FieldName':'Code','FieldValue':_currentCode}];
        }
        this.ShowPersonListLov(selectCondition,filterLevel);
        
      break;
      case 'Cash':
        if(_currentCode){
          selectCondition = [{'FieldName':'Code','FieldValue':_currentCode}];
        }
        this.ShowCashListLov(selectCondition,filterLevel);
      break;
      case 'Bank':
        if(_currentCode){
          selectCondition = [{'FieldName':'AccountCode','FieldValue':_currentCode}];
        }
        this.ShowBankListLov(selectCondition,filterLevel);
      break;
      case 'Regard':
        if(_currentCode){
          selectCondition = [{'FieldName':'Code','FieldValue':_currentCode}];
        }
        this.ShowRegardListLov(selectCondition,filterLevel);
      break;
      default:
        break;
    }
  }

  MasterReportClick() {
    this._isShowDetail = true;
    this.DetailReport.splice(0);
    let jsonData: any = {};
    jsonData['SelectName'] = 'TransactionMasterSelect';
    jsonData["TablesInfo"] = [new FormContext('ReportTransactions','',1,true)];
    jsonData["CrudType"] = 4;
    let _selectCondition:[{FieldName:string,FieldValue:any,Operator:string,FieldValue2:any}];
    let _fieldName: string = '',_operator:string='';
    let _selectList: {FieldName:string,Operator:string}[];
    _selectList = [];
    this.MasterFooter = {ReceiptPrice:0,PaymentPrice:0,Title:'Sum',FakeColumns:[]};

    switch (this.filterList.FilterField) {
      case 'Person':
        _fieldName = 'PersonId';
      break;
      case 'Regard':
        _fieldName = 'RegardId';
      break;
      case 'Cash':
        _fieldName = 'CashDefineId';
      break;
      case 'Bank':
        _fieldName = 'BankDefineId';
      break;
      case 'Date':
        _fieldName = 'Date';
      break;
      default:
        break;
    }
      if(_fieldName.length > 0){
        switch (this.filterList.FilterType) {
          case 'Equal':
            _operator = ' = '
          break;
          case 'BiggerThen':
            _operator = ' > '
          break;
          case 'SmallerThen':
            _operator = ' < '
          break;
          case 'Between':
            _operator = ' BETWEEN '
          break;
          case 'NotEqual':
            _operator = ' != ';
          break;
          default:
            break;
        }
        _selectCondition = [{FieldName:_fieldName,FieldValue:this.filterList.FilterOneId,Operator:_operator
          ,FieldValue2:this.filterList.FilterTwoId}];

      }
    if (this.filterList.GroupByList) {
      for (const grpField of this.filterList.GroupByList) {
        _selectList.push({FieldName:grpField,Operator:''});
      }
      jsonData['SelectList']=_selectList;
      jsonData['GroupByList']=this.filterList.GroupByList;
    }
    jsonData['SelectCondition'] = _selectCondition;
    
    jsonData["SelectFunctionInSuccess"] = (results)=>{
      let colLength:number = 0;
      if(results.length>0){
        this.MasterColumnHeader.splice(0,this.MasterColumnHeader.length);
        this.MasterReport.splice(0,this.MasterReport.length);
        for (const key in results[0]) {
          if (Object.prototype.hasOwnProperty.call(results[0], key)) {
            let hiddenColumns = ['PersonId','RegardId','BankDefineId','CashDefineId']
            if (!hiddenColumns.includes(key)) {
              colLength += 1;
              this.MasterColumnHeader.push(key);  
            }
          }
        }
        
      }
      if(colLength>=3){
        for (let index = 0; index < colLength-3; index++) {
          this.MasterFooter.FakeColumns.push('');
          
        }
      }
      
      for(let msrRow of results){
        this.MasterReport.push(msrRow);
        this.MasterFooter.ReceiptPrice += msrRow.ReceiptPrice;
        this.MasterFooter.PaymentPrice += msrRow.PaymentPrice;
      }
      
      this.appRef.tick();
    }
    this.crudManager.SelectData(jsonData);
  }//
 
  MsrGridClick(currentRow){
    this.currentMasterReport = currentRow;
    this.DetailReport.splice(0);
    this.appRef.tick();
  }

  ShowDetailReport(currentMsrRow:any){
    this.DetailReport.splice(0);
    let jsonData: any = {};
    jsonData["TablesInfo"] = [new FormContext('ReportTransactions','',1,false)];
    jsonData["CrudType"] = 4;
    jsonData['SelectName']="TransactionDetailSelect";
    let _selectCondition:[{FieldName:string,FieldValue:any}] = [{FieldName:'',FieldValue:null}];
    _selectCondition.splice(0);
    for (const key in currentMsrRow) {
      if (Object.prototype.hasOwnProperty.call(currentMsrRow, key)) {
        //const element = currentMsrRow[key];
        let hiddenColumns = ['PersonId','RegardId','BankDefineId','CashDefineId','Date'];
        if(hiddenColumns.includes(key)){
          let _currentCondition = {FieldName:key,FieldValue:currentMsrRow[key]};
          _selectCondition.push(_currentCondition);
        }
      }
    }
    
    jsonData['SelectCondition'] = _selectCondition;
    jsonData['SelectFunctionInSuccess'] = (results)=>{
      for (const item of results) {
        let _serial:string;
        if (item.Type == 'Receipt') {
          _serial = item.Serial.toString().padStart(this.userSetting.SerialFormat.ReceiptZeroLength, '0')
        }else{
          _serial = item.Serial.toString().padStart(this.userSetting.SerialFormat.PaymentZeroLength, '0')
        }
        this.DetailReport.push({Type:item.Type,FormSerial:_serial,Date:item.Date,ReceiptPrice:item.ReceiptPrice,PaymentPrice:item.PaymentPrice});
      }
      this.appRef.tick();
    }
    this.crudManager.SelectData(jsonData);
  }

}//end class
