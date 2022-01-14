import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GridSetting } from '../../../GeneralComponent/grid-view/gridSetting';
import { FormContext } from '../../../TotalClasses/CrudClasses/FormContext';
import { BasicFormBase } from '../../../TotalClasses/FormBaseClasses/BasicFormBase';
import { BehaviorUserSettingService } from '../../../TotalServices/GeneralServices/behavior-user-setting.service';
import { GraphicUserSettingService } from '../../../TotalServices/GeneralServices/graphic-user-setting.service';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';

@Component({
  selector: 'app-cash-first-course',
  templateUrl: './cash-first-course.page.html',
  styleUrls: ['./cash-first-course.page.scss'],
})
export class CashFirstCoursePage extends BasicFormBase implements OnInit {

  gridSetting: GridSetting = new GridSetting(false);
  toolbar = {TabInfo:{Id:15,UrlAddress:'cashFirstCourse',Title:'Cash first course'}};
  private CashFirstCourse: {Id: number, CashDefineId: number,Price: number,CashCode: string,CashName:string}={Id:-1,CashDefineId:-1,Price:0,CashCode:'',CashName:''};
  CashFirstNav: {Id: number, CashDefineId: number,Price: number,CashCode: string,CashName:string}[] = [];
  constructor(public userSetting: GraphicUserSettingService,public crudManager: CrudManagerService,private appRef: ApplicationRef
    ,private mdlCtrl: ModalController,private bhvSetting: BehaviorUserSettingService) { 
    super();
    this.MasterRow = this.CashFirstCourse;
    this.TablesInfo = [new FormContext("CashFirstCourse",'',1)];
    this.FunctionInSelectSuccess = (Results:any) => {
      if(this.CashFirstNav.length>0 && Results.length>0){
        this.CashFirstNav = [];
      }
      for (const CurrentRow of Results) {
        this.CashFirstNav.push({Id: CurrentRow.Id,CashName: CurrentRow.CashName ,CashCode: CurrentRow.CashCode,Price:CurrentRow.Price,CashDefineId:CurrentRow.CashDefineId})
      }
      this.SetEnabledForNextPage(this.CashFirstNav,bhvSetting,this.gridSetting);
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
  
  ShowCashListLov(){
    let lovData = {'SelectName':'SelectForNav','SourceRow':this.MasterRow,'TablesInfo':[new FormContext('CashDefine','',1)]};
    lovData["ColumnsConfig"] = [{'Name':'Id','Title':'Id','MapToSource':'CashDefineId','Hidden':true},
    {'Name':'Code','Title':'Code','MapToSource':'CashCode'},{'Name':'Name','Title':'Name','MapToSource':'CashName'}]
    this.ShowDialog(this.mdlCtrl,lovData);
  }

  FunctionInInsertSuccess = (lastIndex)=>{
    this.CashFirstNav.push({Id:lastIndex,CashName:this.CashFirstCourse.CashName ,CashCode:this.CashFirstCourse.CashCode,Price:this.CashFirstCourse.Price,CashDefineId:this.CashFirstCourse.CashDefineId});
    this.appRef.tick();
  }

  CashFirstCourseClick(IdRow:number){
    let _findNavRow = this.CashFirstNav.find(x => x.Id == IdRow);
    if(_findNavRow){
      this.CashFirstCourse.Id = IdRow;
      this.CashFirstCourse.CashCode = _findNavRow.CashCode;
      this.CashFirstCourse.CashName = _findNavRow.CashName;
      this.CashFirstCourse.Price = _findNavRow.Price;
      this.CashFirstCourse.CashDefineId = _findNavRow.CashDefineId;
      this.appRef.tick();
    }
  }

  FunctionInUpdateSuccess = ()=>{
      let _findNavRow = this.CashFirstNav.find(x => x.Id == this.CashFirstCourse.Id);
      if(_findNavRow){
        _findNavRow.CashCode = this.CashFirstCourse.CashCode;
        _findNavRow.CashName = this.CashFirstCourse.CashName;
        _findNavRow.CashDefineId = this.CashFirstCourse.CashDefineId;
        _findNavRow.Price = this.CashFirstCourse.Price;
        this.appRef.tick();
      }
  }

  FunctionInDeleteSuccess = ()=>{
    let _currentIndex = this.CashFirstNav.findIndex(x => x.Id == this.CashFirstCourse.Id);
    this.CashFirstNav.splice(_currentIndex,1);
    this.appRef.tick();
  }

}
