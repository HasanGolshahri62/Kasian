import { ApplicationRef, Component, OnInit } from '@angular/core';
import { FormContext } from 'src/app/TotalClasses/CrudClasses/FormContext';
import { BasicFormBase } from '../../../TotalClasses/FormBaseClasses/BasicFormBase';
import { BehaviorUserSettingService, enmSaveMode } from '../../../TotalServices/GeneralServices/behavior-user-setting.service';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';

@Component({
  selector: 'app-behavior-setting',
  templateUrl: './behavior-setting.page.html',
  styleUrls: ['./behavior-setting.page.scss'],
})
export class BehaviorSettingPage extends BasicFormBase implements OnInit {

  toolbar = {TabInfo:{Id:21,UrlAddress:'behaviorSetting',Title:'Behavior user setting'}};
  crudDisplay: {All:boolean, New: boolean, Edit: boolean, Delete: boolean, Save: boolean, More: boolean };
  MsrBehaviorSetting: {Id: number,SaveMode:number,MainUrlAddress:string,NavigatorPageSize:number,
    IsLoadNavigatorAfterNew:boolean,IsLoadNavigatorAfterUpdate:boolean,IsRecordVoice:number}
  constructor(public bhrSetting:BehaviorUserSettingService,private crudManager: CrudManagerService,private appRef: ApplicationRef) { 
    super();
    let _isNew: boolean = false, _isEdit: boolean = false;

    if(bhrSetting.Id == -1){
      _isNew = true;
      _isEdit = false;
    }else{
      _isNew = false;
      _isEdit = true;
    }
    this.crudDisplay = {All:true, New: _isNew, Edit: _isEdit, Delete: false, Save: true, More: false };
    this.MsrBehaviorSetting = {Id:-1,MainUrlAddress:'',SaveMode:0,NavigatorPageSize:0,
    IsLoadNavigatorAfterNew:false,IsLoadNavigatorAfterUpdate:false,IsRecordVoice:0};
    this.MasterRow = this.MsrBehaviorSetting;
    this.TablesInfo = [new FormContext("BehaviorUserSetting","",1)];
  }

  ngOnInit() {
    
  }

  editForm(){
    this.MsrBehaviorSetting.Id = this.bhrSetting.Id;
    if(this.bhrSetting.SaveModeName == "Local"){
      this.MsrBehaviorSetting.SaveMode = enmSaveMode.LocalStorage;
      this.bhrSetting.SaveMode = enmSaveMode.LocalStorage;
    }
    if(this.bhrSetting.SaveModeName == "My server"){
      this.MsrBehaviorSetting.SaveMode = enmSaveMode.CustomServer;
      this.bhrSetting.SaveMode = enmSaveMode.CustomServer;
    }
    this.MsrBehaviorSetting.MainUrlAddress = this.bhrSetting.MainUrlAddress;
    this.MsrBehaviorSetting.NavigatorPageSize = this.bhrSetting.NavigatorPageSize;
    super.EditClicked();
  }

  saveForm(){
    if(this.bhrSetting.SaveModeName == "Local"){
      this.MsrBehaviorSetting.SaveMode = enmSaveMode.LocalStorage;
      this.bhrSetting.SaveMode = enmSaveMode.LocalStorage;
    }
    if(this.bhrSetting.SaveModeName == "My server"){
      this.MsrBehaviorSetting.SaveMode = enmSaveMode.CustomServer;
      this.bhrSetting.SaveMode = enmSaveMode.CustomServer;
    }
    this.MsrBehaviorSetting.MainUrlAddress = this.bhrSetting.MainUrlAddress;
    this.MsrBehaviorSetting.NavigatorPageSize = this.bhrSetting.NavigatorPageSize;
    this.MsrBehaviorSetting.IsRecordVoice = (this.bhrSetting.IsRecordVoice=="1")?1:0;

    this.FunctionInInsertSuccess = this.successSave;
    this.FunctionInUpdateSuccess = this.successSave;
    super.saveForm(this.crudManager);
  }

  saveModeChange(selectChange){
    if(selectChange.target.value == "Local"){
      this.bhrSetting.MainUrlAddress = '';
    }
  }

  successSave = (_id: any)=>{
    this.crudDisplay.Edit = false;
    if (_id && typeof _id == "number") {
      this.bhrSetting.Id = _id;
      this.crudDisplay.New = false;
      this.crudDisplay.Edit = true;
      this.appRef.tick();
    }
  }

}
