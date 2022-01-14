import { ApplicationRef, Component, OnInit } from '@angular/core';
import { GridSetting } from '../../../GeneralComponent/grid-view/gridSetting';
import { FormContext } from '../../../TotalClasses/CrudClasses/FormContext';
import { BasicFormBase } from '../../../TotalClasses/FormBaseClasses/BasicFormBase';
import { GraphicUserSettingService } from '../../../TotalServices/GeneralServices/graphic-user-setting.service';
import { CrudManagerService } from '../../../TotalServices/ManageCrud/crud-manager.service';
import { BehaviorUserSettingService } from '../../../TotalServices/GeneralServices/behavior-user-setting.service';

@Component({
  selector: 'app-define-regard',
  templateUrl: './define-regard.page.html',
  styleUrls: ['./define-regard.page.scss'],
})
export class DefineRegardPage extends BasicFormBase implements OnInit {

  gridSetting: GridSetting = new GridSetting(false);
  toolbar = { TabInfo: { Id: 4, UrlAddress: 'defineRegard', Title: 'Define Regard' } }

  private Regard: { Id: number, Code: string, Name: string } = { Id: -1, Code: '', Name: '' };
  RegardNav: { Id: number, Code: string, Name: string }[] = [];

  constructor(public userSetting: GraphicUserSettingService, public crudManager: CrudManagerService, private appRef: ApplicationRef,
      private bhvSetting: BehaviorUserSettingService) {
    super();
    this.MasterRow = this.Regard;
    this.TablesInfo = [new FormContext('Regard', '', 1)];

    this.FunctionInSelectSuccess = (Results: any) => {
      if(this.RegardNav.length>0 && Results.length>0){
        this.RegardNav = [];
      }
      for (const CurrentRow of Results) {
        this.RegardNav.push({ Id: CurrentRow.Id, Name: CurrentRow.Name, Code: CurrentRow.Code });
      }
      this.SetEnabledForNextPage(this.RegardNav,bhvSetting,this.gridSetting);
      if(Results.length == 0){
        this.gridSetting.CanNextPage = false;
      }
      this.appRef.tick();
    }
    crudManager.SelectData({ TablesInfo: this.TablesInfo, CrudType: 4, "SelectName": "SelectForNav", "SelectFunctionInSuccess": this.FunctionInSelectSuccess });
    this.SelectNavJsonData = { TablesInfo: this.TablesInfo, CrudType: 4, "SelectName": "SelectForNav", "SelectFunctionInSuccess": this.FunctionInSelectSuccess }
  }

  ngOnInit() {
  }

  FunctionInInsertSuccess = (lastIndex) => {
    this.RegardNav.push({ Id: lastIndex, Name: this.Regard.Name, Code: this.Regard.Code });
    this.appRef.tick();
  }

  RegardClick(currentIndex: number) {
    let _findNavRow = this.RegardNav.find(x => x.Id == currentIndex);
    if (_findNavRow) {
      this.Regard.Code = _findNavRow.Code;
      this.Regard.Name = _findNavRow.Name;
      this.Regard.Id = _findNavRow.Id;
      this.appRef.tick();
    }
  }

  FunctionInUpdateSuccess = () => {
    let _findNavRow = this.RegardNav.find(x => x.Id == this.Regard.Id);
    if (_findNavRow) {
      _findNavRow.Code = this.Regard.Code;
      _findNavRow.Name = this.Regard.Name;
      this.appRef.tick();
    }
  }
  FunctionInDeleteSuccess = ()=>{
    let _currentIndex = this.RegardNav.findIndex(x => x.Id == this.Regard.Id);
    this.RegardNav.splice(_currentIndex,1);
    this.appRef.tick();
  }

}
