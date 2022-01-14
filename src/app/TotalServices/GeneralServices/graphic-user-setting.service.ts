import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphicUserSettingService {

  

  constructor() { }

  public PageDirection: string = "ltr";
  public Id: number = -1;
  
  public get SlotAttr():string {
    let _result: string = ''
    if (this.PageDirection == 'rtl') {
      _result = 'end';
    } else {
      _result = 'start';
    }
    return _result;
  }

  public MultiBackgroundColor:string[] = [''];
  public LabelPositionStyle: string = 'stacked';
  public tabLocation: string = 'bottom';

  public GridBorderSetting: BorderSetting = new BorderSetting();
  public GridBorderHeaderSetting: BorderSetting = new BorderSetting('1px','rgb(100,100,150)','solid');
  public GridBorderRowSetting: BorderSetting = new BorderSetting('1px','rgb(150,100,150)','solid');
  public GridHeaderBackColor:string='';
  public GridRowsBackColor:string='';
  
  public MinimizeGridSize: number=300;

  public SerialFormat : {ReceiptZeroLength:number,PaymentZeroLength:number}={ReceiptZeroLength:6,PaymentZeroLength:6};

  public DateDisplayFormat:string = "YYYY-MM-DD";
  
}

class BorderSetting{
  BorderWidth:string = '1px';
  BorderColor:string = 'aqua';
  BorderStyle:string = 'solid';
  constructor(width: string='1px',color:string='aqua',style:string='solid'){
    this.BorderWidth = width;
    this.BorderColor=color;
    this.BorderStyle=style;
  }
}