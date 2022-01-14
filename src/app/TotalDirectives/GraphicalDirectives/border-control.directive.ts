import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { GraphicUserSettingService } from 'src/app/TotalServices/GeneralServices/graphic-user-setting.service';

@Directive({
  selector: '[appBorderControl]'
})
export class BorderControlDirective implements OnInit {

  @Input() appBorderControl: string;

  constructor(private elRef: ElementRef,private rendrer: Renderer2,private srvUser: GraphicUserSettingService) { }

  ngOnInit(){
    let _borderWidth:string,_borderColor:string,_borderStyle:string;
    let _backColor:string;
    if(!this.appBorderControl || this.appBorderControl.startsWith('Grid')){
      if(this.appBorderControl.endsWith(',head') && this.srvUser.GridBorderHeaderSetting){
        _borderWidth=this.srvUser.GridBorderHeaderSetting.BorderWidth;
        _borderStyle=this.srvUser.GridBorderHeaderSetting.BorderStyle;
        _borderColor=this.srvUser.GridBorderHeaderSetting.BorderColor;
        _backColor=this.srvUser.GridHeaderBackColor;
      }else if(this.appBorderControl.endsWith(',row') && this.srvUser.GridBorderRowSetting){
        _borderWidth=this.srvUser.GridBorderRowSetting.BorderWidth;
        _borderStyle=this.srvUser.GridBorderRowSetting.BorderStyle;
        _borderColor=this.srvUser.GridBorderRowSetting.BorderColor;
        _backColor=this.srvUser.GridRowsBackColor;
      }else{
        _borderWidth=this.srvUser.GridBorderSetting.BorderWidth;
        _borderStyle=this.srvUser.GridBorderSetting.BorderStyle;
        _borderColor=this.srvUser.GridBorderSetting.BorderColor
        _backColor='';
      }
      
    }
    this.rendrer.setStyle(this.elRef.nativeElement,'borderWidth',_borderWidth);
    this.rendrer.setStyle(this.elRef.nativeElement,'borderStyle',_borderStyle);
    this.rendrer.setStyle(this.elRef.nativeElement,'borderColor',_borderColor);
    if(_backColor){
      this.rendrer.setStyle(this.elRef.nativeElement,'backgroundColor',_backColor);
    }
    //this.rendrer.setStyle(this.elRef.nativeElement,'backgroundColor','aqua')
  }
}
