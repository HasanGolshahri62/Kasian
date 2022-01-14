import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DeviceInformationService {

  constructor(private platformInfo: Platform) {

       this.platformInfo.resize.subscribe(x=>{
           this._sizeDevice = this.platformInfo.width();
       });
   }

   private _sizeDevice: number;

   public get SizeDevice(){
    return this._sizeDevice;
   }

   public get IsCompressMode(){
     let _result: boolean = false;
     if(this._sizeDevice<700){
       _result = true;
     }
     return _result;
   }

   public TabList: any[] = [];
   
}
