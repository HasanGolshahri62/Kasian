import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { GraphicUserSettingService } from 'src/app/TotalServices/GeneralServices/graphic-user-setting.service';

@Directive({
  selector: 'ion-content'
})
export class ContentControlDirective implements OnInit {

  constructor(private elRef: ElementRef,private rendrer: Renderer2,private srvUser: GraphicUserSettingService) { }

  ngOnInit(){
    //document.documentElement.style.setProperty('--ion-background-color', this.srvUser.MainBackgroundColor);
  }
}
