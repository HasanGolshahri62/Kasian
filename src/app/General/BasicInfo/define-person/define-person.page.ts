import { Component, OnInit, ApplicationRef } from '@angular/core';
import { GraphicUserSettingService } from '../../../TotalServices/GeneralServices/graphic-user-setting.service';
import { GridSetting } from '../../../GeneralComponent/grid-view/gridSetting';
import { BasicFormBase } from '../../../TotalClasses/FormBaseClasses/BasicFormBase';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';
import { FormContext } from '../../../TotalClasses/CrudClasses/FormContext';
import { ViewWillEnter } from '@ionic/angular';
import { BehaviorUserSettingService } from '../../../TotalServices/GeneralServices/behavior-user-setting.service';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-define-person',
  templateUrl: './define-person.page.html',
  styleUrls: ['./define-person.page.scss'],
})
export class DefinePersonPage extends BasicFormBase implements OnInit,ViewWillEnter  {

  gridSetting: GridSetting = new GridSetting(false);
  
  toolbar = {TabInfo:{Id:3,UrlAddress:'definePerson',Title:'Define Person'}};
  NavData: {Id: number,FullName:string,Code: string}[]=[];

  private Person: {Id: number,Name:string,Family:string,Code:string}={Id:-1,Name:'',Family:'',Code:''};

  private recognition = new webkitSpeechRecognition();


  constructor(public userSetting: GraphicUserSettingService,public crudManager: CrudManagerService,private appRef: ApplicationRef,
      bhvSetting: BehaviorUserSettingService) { 
    super();
    this.MasterRow = this.Person;
    
    this.TablesInfo.push(new FormContext("Person","",1));

    this.FunctionInSelectSuccess = (Results:any) => {
      if(this.NavData.length>0 && Results.length>0){
        this.NavData = [];
      }
      for (const CurrentRow of Results) {
        this.NavData.push({Id: CurrentRow.Id,FullName: CurrentRow.Name + ' ' + CurrentRow.Family,Code: CurrentRow.Code})
      }
      this.SetEnabledForNextPage(this.NavData,bhvSetting,this.gridSetting)
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

  ionViewWillEnter(){
    
    
  }
  
  FunctionInInsertSuccess = (lastIndex)=>{
    this.NavData.push({Id:lastIndex,FullName:this.Person.Name + ' ' + this.Person.Family,Code:this.Person.Code});
    this.appRef.tick();
  }

  PersonClick(NavRow:any){
    let jsonData = {TablesInfo: this.TablesInfo,CrudType:4,"SelectName":"SelectForNav"};
    jsonData["SelectFunctionInSuccess"] = (result)=>{
        this.Person.Id = result[0].Id;
        this.Person.Code = result[0].Code;
        this.Person.Name = result[0].Name;
        this.Person.Family = result[0].Family;
        this.appRef.tick();
    }
    jsonData["IsSelectChild"] = false;
    jsonData["SelectCondition"]=[{FieldName:"Id",FieldValue:NavRow.Id}];
    this.crudManager.SelectData(jsonData);
  }

  FunctionInUpdateSuccess = ()=>{
      let _findNavRow = this.NavData.find(x => x.Id == this.Person.Id);
      if(_findNavRow){
        _findNavRow.Code = this.Person.Code;
        _findNavRow.FullName = this.Person.Name + ' ' + this.Person.Family;
        this.appRef.tick();
      }
  }

  FunctionInDeleteSuccess = ()=>{
    let _currentIndex = this.NavData.findIndex(x => x.Id == this.Person.Id);
    this.NavData.splice(_currentIndex,1);
    this.appRef.tick();
  }

  
}
