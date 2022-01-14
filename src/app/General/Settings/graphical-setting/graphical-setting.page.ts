import { ApplicationRef, Component, OnInit } from '@angular/core';
import { FormContext } from 'src/app/TotalClasses/CrudClasses/FormContext';
import { BasicFormBase } from 'src/app/TotalClasses/FormBaseClasses/BasicFormBase';
import { GraphicUserSettingService } from 'src/app/TotalServices/GeneralServices/graphic-user-setting.service';
import { CrudManagerService } from 'src/app/TotalServices/ManageCrud/crud-manager.service';

@Component({
  selector: 'app-graphical-setting',
  templateUrl: './graphical-setting.page.html',
  styleUrls: ['./graphical-setting.page.scss'],
})
export class GraphicalSettingPage extends BasicFormBase implements OnInit {

  toolbar = {TabInfo:{Id:19,UrlAddress:'graphicalSetting',Title:'Graphical user setting'}};
  crudDisplay: {All:boolean, New: boolean, Edit: boolean, Delete: boolean, Save: boolean, More: boolean };
  TestColor: string;
  private dateDisplayFormat: {Year:string,Month:string,Day:string,Separator:string} = {Year:'',Month:'',Day:'',Separator:''};
  MsrUserSetting:{BackgroundColor:string,GridHeaderBackColor:string,GridRowsBackColor:string,MiniGridBorderWidth:string
  ,MiniGridBorderColor:string,MiniGridBorderStyle:string,HeaderGridBorderWidth:string,HeaderGridBorderColor:string
  ,HeaderGridBorderStyle:string,RowsGridBorderColor:string,RowsGridBorderWidth:string,RowsGridBorderStyle:string
  ,DateDisplayFormat:string,ReceiptSerialLength:number,PaymentSerialLength:number,Id: number};

  
  constructor(public userSetting: GraphicUserSettingService,public crudManager: CrudManagerService,private appRef: ApplicationRef) {
    super();
    let _isNew: boolean = false, _isEdit: boolean = false;

    if(userSetting.Id == -1){
      _isNew = true;
      _isEdit = false;
    }else{
      _isNew = false;
      _isEdit = true;
    }
    this.crudDisplay = {All:true, New: _isNew, Edit: _isEdit, Delete: false, Save: true, More: false };
    if(userSetting.DateDisplayFormat[2] != 'Y'){
      this.dateDisplayFormat.Separator = userSetting.DateDisplayFormat[2];
    }else{
      this.dateDisplayFormat.Separator = userSetting.DateDisplayFormat[4];
    }
    this.MsrUserSetting = {BackgroundColor:'',GridHeaderBackColor:'',GridRowsBackColor:'',MiniGridBorderColor:''
    ,MiniGridBorderStyle:'',MiniGridBorderWidth:'',HeaderGridBorderColor:'',HeaderGridBorderStyle:'',HeaderGridBorderWidth:''
    ,RowsGridBorderColor:'',RowsGridBorderStyle:'',RowsGridBorderWidth:'',DateDisplayFormat:'',ReceiptSerialLength:0
    ,PaymentSerialLength:0,Id:-1};
    let _dateFormat = userSetting.DateDisplayFormat.split(this.dateDisplayFormat.Separator);
    this.dateDisplayFormat.Year = _dateFormat[0];
    this.dateDisplayFormat.Month = _dateFormat[1];
    this.dateDisplayFormat.Day = _dateFormat[2];
    this.MasterRow = this.MsrUserSetting;
    this.TablesInfo = [new FormContext("GraphicalUserSetting","",1,true)];
    
  }

  ngOnInit() {
  }
  changeBackgroundColor(currentInput,currentIndex:number){
    //document.documentElement.style.setProperty('--ion-background-color', this.userSetting.MainBackgroundColor);
    this.userSetting.MultiBackgroundColor[currentIndex] = currentInput.target.value;
    this.SetColor();
    
  }

  btnColorClick(btnClicked:string){
    if (btnClicked == 'Add') {
      this.userSetting.MultiBackgroundColor.push('');
      
    }else{
      if(this.userSetting.MultiBackgroundColor.length>1){
        this.userSetting.MultiBackgroundColor.pop();
      }else{
        this.userSetting.MultiBackgroundColor[0]="";
      }
    }
  }

  private SetColor(){
    let _filledColor = this.userSetting.MultiBackgroundColor.filter(x => x.length>0);
    if(_filledColor.length == 1){
      document.documentElement.style.setProperty('--ion-background-color', _filledColor[0]);
    }else if (_filledColor.length>1) {
      document.documentElement.style.setProperty('--background', 'linear-gradient(red,blue);');
    }{

    }
    for (const currentColor of _filledColor) {
      
    }
  }

  saveForm(crudManager: CrudManagerService){
    this.userSetting.DateDisplayFormat = this.dateDisplayFormat.Year + this.dateDisplayFormat.Separator + this.dateDisplayFormat.Month + this.dateDisplayFormat.Separator + this.dateDisplayFormat.Day;
    this.MsrUserSetting.DateDisplayFormat = this.userSetting.DateDisplayFormat;
    this.MsrUserSetting.GridHeaderBackColor = this.userSetting.GridHeaderBackColor;
    this.MsrUserSetting.GridRowsBackColor = this.userSetting.GridRowsBackColor;
    this.MsrUserSetting.HeaderGridBorderColor = this.userSetting.GridBorderHeaderSetting.BorderColor;
    this.MsrUserSetting.HeaderGridBorderWidth = this.userSetting.GridBorderHeaderSetting.BorderWidth;
    this.MsrUserSetting.HeaderGridBorderStyle = this.userSetting.GridBorderHeaderSetting.BorderStyle;
    this.MsrUserSetting.BackgroundColor = this.userSetting.MultiBackgroundColor.join(',');
    this.MsrUserSetting.MiniGridBorderColor = this.userSetting.GridBorderSetting.BorderColor;
    this.MsrUserSetting.MiniGridBorderWidth = this.userSetting.GridBorderSetting.BorderWidth;
    this.MsrUserSetting.MiniGridBorderStyle = this.userSetting.GridBorderSetting.BorderStyle;
    this.MsrUserSetting.RowsGridBorderColor = this.userSetting.GridBorderRowSetting.BorderColor;
    this.MsrUserSetting.RowsGridBorderWidth = this.userSetting.GridBorderRowSetting.BorderWidth;
    this.MsrUserSetting.RowsGridBorderStyle = this.userSetting.GridBorderRowSetting.BorderStyle;
    this.MsrUserSetting.ReceiptSerialLength = this.userSetting.SerialFormat.ReceiptZeroLength;
    this.MsrUserSetting.PaymentSerialLength = this.userSetting.SerialFormat.PaymentZeroLength;
    this.MsrUserSetting.Id = this.userSetting.Id;

    this.FunctionInInsertSuccess = this.successSave;
    this.FunctionInUpdateSuccess = this.successSave;

    super.saveForm(this.crudManager);
    

  }

  successSave = (_id: any)=>{
    this.crudDisplay.Edit = false;
    if (_id && typeof _id == "number") {
      this.userSetting.Id = _id;
      this.crudDisplay.New = false;
      this.crudDisplay.Edit = true;
      this.appRef.tick();
    }
  }
}
