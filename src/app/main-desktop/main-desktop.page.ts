import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { MenuManager } from '../TotalClasses/NormalClasses/menuManager';
import { BehaviorUserSettingService } from '../TotalServices/GeneralServices/behavior-user-setting.service';
import { DeviceInformationService } from '../TotalServices/GeneralServices/device-information.service';

@Component({
  selector: 'app-main-desktop',
  templateUrl: './main-desktop.page.html',
  styleUrls: ['./main-desktop.page.scss'],
})
export class MainDesktopPage implements OnInit {

  constructor(private usrBhvrSetting: BehaviorUserSettingService,private mnuCtrl:MenuController
    ,private navCtrl: NavController,public deviceInfo:DeviceInformationService) {
      this.menuManager = new MenuManager();
    this.menuItemList = this.menuManager.GenerateMenu();
     }

  ngOnInit() {
  }

  public menuItemList;

  public menuManager: MenuManager;
  
  private MenuClickAndTabManage(menuItem,menuList){
    let currentMenu = this.menuManager.ClickMenuHandler(menuItem,menuList);
    
    if(currentMenu){
      let finded = this.deviceInfo.TabList.find(x => x.Id == currentMenu.Id);
      if(!finded){
        this.deviceInfo.TabList.push({Id:currentMenu.Id,UrlAddress:currentMenu.menuUrl,Title:currentMenu.menuTitle});
      }
      this.mnuCtrl.close();
      this.navCtrl.navigateRoot('/'+currentMenu.menuUrl);
      
    }

  }

  
  KeydownForRecordVoice(){
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
  }
}
