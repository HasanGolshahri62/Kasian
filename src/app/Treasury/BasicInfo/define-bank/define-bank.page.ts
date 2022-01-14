import { ApplicationRef, Component, OnInit } from '@angular/core';
import { GridSetting } from '../../../GeneralComponent/grid-view/gridSetting';
import { FormContext } from '../../../TotalClasses/CrudClasses/FormContext';
import { BasicFormBase } from '../../../TotalClasses/FormBaseClasses/BasicFormBase';
import { GraphicUserSettingService } from '../../../TotalServices/GeneralServices/graphic-user-setting.service';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';

@Component({
  selector: 'app-define-bank',
  templateUrl: './define-bank.page.html',
  styleUrls: ['./define-bank.page.scss'],
})
export class DefineBankPage extends BasicFormBase implements OnInit {

  gridSetting: GridSetting = new GridSetting(false);
  toolbar = {TabInfo:{Id:13,UrlAddress:'defineBank',Title:'Define Bank'}};
  private Bank :{Id: number, Name: string, AccountCode: string} = {Id: -1,Name:'',AccountCode:''};
  BankNav :{Id: number, Name: string, AccountCode: string}[] = [];
  constructor(public userSetting: GraphicUserSettingService,public crudManager: CrudManagerService,private appRef: ApplicationRef) { 
    super();
    this.MasterRow = this.Bank;
    this.TablesInfo.push(new FormContext("BankDefine","",1));
    this.FunctionInSelectSuccess = (Results:any) => {
      if(this.BankNav.length>0 && Results.length>0){
        this.BankNav = [];
      }
      for (const CurrentRow of Results) {
        this.BankNav.push({Id: CurrentRow.Id,Name: CurrentRow.Name, AccountCode: CurrentRow.AccountCode});
      }
      if(Results.length == 0){
        this.gridSetting.CanNextPage = false;
      }
      this.appRef.tick();
    }
    crudManager.SelectData({TablesInfo: this.TablesInfo,CrudType:4,"SelectName":"SelectForNav","SelectFunctionInSuccess":this.FunctionInSelectSuccess});
    this.SelectNavJsonData = {TablesInfo: this.TablesInfo,CrudType:4,"SelectName":"SelectForNav","SelectFunctionInSuccess":this.FunctionInSelectSuccess};
  }

  ngOnInit() {
  }

  FunctionInInsertSuccess = (lastIndex)=>{
    this.BankNav.push({Id:lastIndex,Name:this.Bank.Name,AccountCode:this.Bank.AccountCode});
    this.appRef.tick();
  }

  FunctionInUpdateSuccess = ()=>{
    let _findNavRow = this.BankNav.find(x => x.Id == this.Bank.Id);
    if(_findNavRow){
      _findNavRow.AccountCode = this.Bank.AccountCode;
      _findNavRow.Name = this.Bank.Name;
      this.appRef.tick();
    }
  }

  FunctionInDeleteSuccess = ()=>{
    let _currentIndex = this.BankNav.findIndex(x => x.Id == this.Bank.Id);
    this.BankNav.splice(_currentIndex,1);
    this.appRef.tick();
  }

  BankClick(currentIndex: number){
    let _findBank = this.BankNav.find(x => x.Id == currentIndex);
    if(_findBank){
      this.Bank.Id = currentIndex;
      this.Bank.AccountCode = _findBank.AccountCode;
      this.Bank.Name = _findBank.Name;
      this.appRef.tick();
    }
  }
}
