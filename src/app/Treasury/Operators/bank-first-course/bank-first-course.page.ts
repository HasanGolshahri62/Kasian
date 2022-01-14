import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorUserSettingService } from '../../../TotalServices/GeneralServices/behavior-user-setting.service';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';
import { GridSetting } from '../../../GeneralComponent/grid-view/gridSetting';
import { FormContext } from '../../../TotalClasses/CrudClasses/FormContext';
import { BasicFormBase } from '../../../TotalClasses/FormBaseClasses/BasicFormBase';
import { GraphicUserSettingService } from '../../../TotalServices/GeneralServices/graphic-user-setting.service';

@Component({
  selector: 'app-bank-first-course',
  templateUrl: './bank-first-course.page.html',
  styleUrls: ['./bank-first-course.page.scss'],
})
export class BankFirstCoursePage extends BasicFormBase implements OnInit {

  gridSetting: GridSetting = new GridSetting(false);
  toolbar = {TabInfo:{Id:16,UrlAddress:'bankFirstCourse',Title:'Bank first course'}};
  private BankFirstCourse: {Id: number, BankDefineId: number,Price: number,BankAccountCode: string,BankName:string}={Id:-1,BankDefineId:-1,Price:0,BankAccountCode:'',BankName:''};
  BankFirstNav: {Id: number, BankDefineId: number,Price: number,BankAccountCode: string,BankName:string}[] = [];

  constructor(public userSetting: GraphicUserSettingService,public crudManager: CrudManagerService,
    private appRef: ApplicationRef,private mdlCtrl: ModalController,private bhvSetting: BehaviorUserSettingService) { 
    super();
    this.gridSetting.FieldSetting = [{Name:'Price',MinSize: userSetting.MinimizeGridSize,MaxSize:0}];
    this.gridSetting.FieldSetting.push({Name:'Bank Name',MinSize: userSetting.MinimizeGridSize,MaxSize:0});
    this.gridSetting.FieldSetting.push({Name:'Account',MinSize: userSetting.MinimizeGridSize,MaxSize:0});

    this.MasterRow = this.BankFirstCourse;
    this.TablesInfo = [new FormContext("BankFirstCourse",'',1)];
    this.FunctionInSelectSuccess = (Results:any) => {
      if(this.BankFirstNav.length>0 && Results.length>0){
        this.BankFirstNav = [];
      }
      for (const CurrentRow of Results) {
        this.BankFirstNav.push({Id: CurrentRow.Id,BankName: CurrentRow.BankName ,BankAccountCode: CurrentRow.BankAccountCode,Price:CurrentRow.Price,BankDefineId:CurrentRow.BankDefineId})
      }
      this.SetEnabledForNextPage(this.BankFirstNav,bhvSetting,this.gridSetting);
      if(Results.length == 0){
        this.gridSetting.CanNextPage = false;
      }
      this.appRef.tick();
    }
    crudManager.SelectData({TablesInfo: this.TablesInfo,CrudType:4,"SelectName":"SelectForNav","SelectFunctionInSuccess":this.FunctionInSelectSuccess});
    this.SelectNavJsonData = { TablesInfo: this.TablesInfo, CrudType: 4, "SelectName": "SelectForNav", "SelectFunctionInSuccess": this.FunctionInSelectSuccess }
  }

  ngOnInit() {
  }

  ShowBankListLov(){
    let lovData = {'SelectName':'SelectForNav','SourceRow':this.MasterRow,'TablesInfo':[new FormContext('BankDefine','',1)]};
    lovData["ColumnsConfig"] = [{'Name':'Id','Title':'Id','MapToSource':'BankDefineId','Hidden':true},
    {'Name':'AccountCode','Title':'AccountCode','MapToSource':'BankAccountCode'},{'Name':'Name','Title':'Name','MapToSource':'BankName'}]
    this.ShowDialog(this.mdlCtrl,lovData);
  }

  FunctionInInsertSuccess = (lastIndex)=>{
    this.BankFirstNav.push({Id:lastIndex,BankName:this.BankFirstCourse.BankName ,BankAccountCode:this.BankFirstCourse.BankAccountCode,Price:this.BankFirstCourse.Price,BankDefineId:this.BankFirstCourse.BankDefineId});
    this.appRef.tick();
  }

  BankFirstCourseClick(IdRow:number){
    let _findNavRow = this.BankFirstNav.find(x => x.Id == IdRow);
    if(_findNavRow){
      this.BankFirstCourse.Id = IdRow;
      this.BankFirstCourse.BankAccountCode = _findNavRow.BankAccountCode;
      this.BankFirstCourse.BankName = _findNavRow.BankName;
      this.BankFirstCourse.Price = _findNavRow.Price;
      this.BankFirstCourse.BankDefineId = _findNavRow.BankDefineId;
      this.appRef.tick();
    }
  }

  FunctionInUpdateSuccess = ()=>{
      let _findNavRow = this.BankFirstNav.find(x => x.Id == this.BankFirstCourse.Id);
      if(_findNavRow){
        _findNavRow.BankAccountCode = this.BankFirstCourse.BankAccountCode;
        _findNavRow.BankName = this.BankFirstCourse.BankName;
        _findNavRow.BankDefineId = this.BankFirstCourse.BankDefineId;
        _findNavRow.Price = this.BankFirstCourse.Price;
        this.appRef.tick();
      }
  }

  FunctionInDeleteSuccess = ()=>{
    let _currentIndex = this.BankFirstNav.findIndex(x => x.Id == this.BankFirstCourse.Id);
    this.BankFirstNav.splice(_currentIndex,1);
    this.appRef.tick();
  }

}
