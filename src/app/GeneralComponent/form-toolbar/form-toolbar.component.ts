import { Component, Input, OnInit, Output,EventEmitter, ApplicationRef } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { BehaviorUserSettingService } from 'src/app/TotalServices/GeneralServices/behavior-user-setting.service';
import { DeviceInformationService } from 'src/app/TotalServices/GeneralServices/device-information.service';
import { FormMode } from './formEnumMode';

@Component({
  selector: 'app-form-toolbar',
  templateUrl: './form-toolbar.component.html',
  styleUrls: ['./form-toolbar.component.scss'],
})
export class FormToolbarComponent implements OnInit {

  @Input() CrudDisplay:{All:boolean,New:boolean,Edit:boolean,Delete:boolean,More:boolean};
  @Input() toolbarInfo:{TabInfo:{Id:number,UrlAddress:string,Title:string}};

  @Output() NewClick = new EventEmitter<boolean>();
  @Output() EditClick = new EventEmitter<boolean>();
  @Output() DeleteClick = new EventEmitter<boolean>();
  @Output() CancelClick = new EventEmitter<boolean>();
  @Output() SaveClick = new EventEmitter<boolean>();
  @Output() FormModeChange = new EventEmitter<FormMode>();
  @Output() VoiceRecorder = new EventEmitter<string>();

  public IsFormActive: boolean = false;

  constructor(public srvDevice: DeviceInformationService,private actnCtrl: ActionSheetController,private navCtrl: NavController,
    private appref: ApplicationRef,private bhSetting: BehaviorUserSettingService) { 
    this.CrudDisplay = {All:true,New:true,Edit:true,Delete:true,More:true};
    
  }

  ngOnInit() {
    
  }

  CompressButtonClick(){
    let btns:{text:string,icon:string,handler:any}[]=[];
    if(this.bhSetting.IsRecordVoice == '1'){
      btns.push({text:'Voice',icon:'mic-outline',handler:()=>{this.VoiceClicked()}});
    }
    
    if(!this.IsFormActive){
      if(this.CrudDisplay.New){
        btns.push({text:'New',icon:'add-outline',handler:()=>{this.NewClicked()}})
      }
      if(this.CrudDisplay.Edit){
        btns.push({text:'Edit',icon:'create-outline',handler:()=>{this.EditClicked()}})
      }
      if(this.CrudDisplay.Delete){
        btns.push({text:'Delete',icon:'trash-outline',handler:()=>{this.DeleteClicked()}})
      }
    }else{
      btns.push({text:'Save',icon:'save-outline',handler:()=>{this.SaveClicked()}});
      btns.push({text:'Cancel',icon:'hand-left-outline',handler:()=>{this.CancelClicked()}});
    }
    this.actnCtrl.create({
      header:'select action',
      buttons: btns
    }).then(actionSheetEl=>{
      actionSheetEl.present();
    })
  }

  closeTab(){
    if(!this.toolbarInfo || !this.toolbarInfo.TabInfo){
      console.log('can not close tab because tabinfo is not set');
      return;
    }
    let _currentIndex = this.srvDevice.TabList.findIndex(x => x.Id == this.toolbarInfo.TabInfo.Id);
    if(_currentIndex>=0){
      this.srvDevice.TabList.splice(_currentIndex,1);
        if(this.srvDevice.TabList.length == 0){
        this.navCtrl.navigateRoot('/');
        }else{
          if(this.srvDevice.TabList[_currentIndex-1]){
            this.navCtrl.navigateRoot('/'+ this.srvDevice.TabList[_currentIndex-1].UrlAddress);
          }else{
            this.navCtrl.navigateRoot('/'+ this.srvDevice.TabList[_currentIndex].UrlAddress);
          }
        }
      this.appref.tick();
    }
  }

  NewClicked(){

    this.IsFormActive=true;
    this.FormModeChange.emit(FormMode.Add);
    this.NewClick.emit(true);
  }
  EditClicked(){
    
    this.IsFormActive=true;
    this.FormModeChange.emit(FormMode.Edit);
    this.EditClick.emit(true);
  }
  DeleteClicked(){

    this.IsFormActive=false;
    this.FormModeChange.emit(FormMode.Delete);
    this.DeleteClick.emit(true);
  }
  CancelClicked(){

    this.IsFormActive=false;
    this.FormModeChange.emit(FormMode.View);
    this.CancelClick.emit(true);
  }
  SaveClicked(){

    this.IsFormActive=false;
    this.SaveClick.emit(true);
    this.FormModeChange.emit(FormMode.View);
  }

  VoiceClicked(){
    let obVoice = this.bhSetting.GetVoiceConvertToString();
      let subVoice = obVoice.subscribe(textReturned =>{
        console.log(textReturned);
        this.VoiceRecorder.emit(textReturned);
        subVoice.unsubcribe();
      });
  }
}
