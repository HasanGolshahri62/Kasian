import { Component, OnInit } from '@angular/core';
import { MenuManager } from './TotalClasses/NormalClasses/menuManager';
import { CompanySettingService } from './TotalServices/GeneralServices/company-setting.service';
import { GraphicUserSettingService } from './TotalServices/GeneralServices/graphic-user-setting.service';
import { MenuController, NavController } from '@ionic/angular';
import { DeviceInformationService } from './TotalServices/GeneralServices/device-information.service';
import { CrudManagerService } from './TotalServices/ManageCrud/crud-manager.service';
import { BehaviorUserSettingService } from './TotalServices/GeneralServices/behavior-user-setting.service';
import { FetchSettingsInfo } from './TotalClasses/NormalClasses/fetchSettingsInfo';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[GraphicUserSettingService]
})
export class AppComponent implements OnInit {

  public menuItemList;

  public menuManager: MenuManager;
  //private currentMenu: any;
  
  constructor(public CompanySetting: CompanySettingService, public userSetting: GraphicUserSettingService,private usrBhvrSetting: BehaviorUserSettingService
             ,private mnuCtrl: MenuController,private navCtrl: NavController,public deviceInfo:DeviceInformationService,
             private http: HttpClient) {
    //myrender.setAttribute(document.body, 'dir', this.userSetting.PageDirection);
    this.menuManager = new MenuManager();
    this.menuItemList = this.menuManager.GenerateMenu();
  }

  public MenuClickAndTabManage(menuItem,menuList){
    let currentMenu = this.menuManager.ClickMenuHandler(menuItem,menuList);
    //this.currentMenu = currentMenu;
    if(currentMenu){
      let finded = this.deviceInfo.TabList.find(x => x.Id == currentMenu.Id);
      if(!finded){
        this.deviceInfo.TabList.push({Id:currentMenu.Id,UrlAddress:currentMenu.menuUrl,Title:currentMenu.menuTitle});
      }
      this.mnuCtrl.close();
      this.navCtrl.navigateRoot('/'+currentMenu.menuUrl);
      
    }

  }
  
  ngOnInit(){
    let _crudmngr: CrudManagerService;
    let _bhvSetting: BehaviorUserSettingService;
    let _fetchSetting:FetchSettingsInfo;
    
    _bhvSetting = new BehaviorUserSettingService();

    _crudmngr = new CrudManagerService(_bhvSetting,this.http);
    _fetchSetting = new FetchSettingsInfo(_crudmngr);
    _fetchSetting.FetchAndSetGraphicalUserSetting(this.userSetting);
    _fetchSetting.FetchAndSetBehaviorSetting(this.usrBhvrSetting);
  }

  /*@HostListener('document:keydown.control.shift.l',['$event'])
  KeydownForRecordVoice(data){
    if(this.usrBhvrSetting.IsRecordVoice == "1"){
      let obVoice = this.usrBhvrSetting.GetVoiceConvertToString();
      let subVoice = obVoice.subscribe(textReturned =>{
        console.log(textReturned);
        if(textReturned == "menu"){
          this.mnuCtrl.open();
        }else{
          let mnuFinded = this.menuItemList.find(x => x.menuTitle.toLowerCase() == textReturned);
          if(mnuFinded){
            this.MenuClickAndTabManage(mnuFinded,this.menuItemList);
          }
          
        }
        subVoice.Unsubcribe;
      });
    }
  }*/
}//end class
