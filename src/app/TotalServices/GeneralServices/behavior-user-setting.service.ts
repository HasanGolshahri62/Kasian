import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var webkitSpeechRecognition: any,SpeechRecognition: any;


@Injectable({
  providedIn: 'root'
})
export class BehaviorUserSettingService {

  constructor() { }

  private _saveMode: enmSaveMode = enmSaveMode.LocalStorage;

  //public SaveMode: enmSaveMode = enmSaveMode.LocalStorage;
  
  

  public SaveModeName:string = 'Local';
  public get SaveMode(){
    return this._saveMode;
  }
  public set SaveMode(value){
    this._saveMode = value;
    switch (value) {
      case 1:
        this.SaveModeName = "Local"
        break;
      case 2:

      break;
      case 3:
        this.SaveModeName = "My server";
      break;
      default:
        break;
    }
  }
  
  public Id: number = -1;
  
  public IsLoadNavigatorAfterNew: boolean = false;
  public IsLoadNavigatorAfterUpdate:boolean = false;
  public NavigatorPageSize: number = 0;
  
  public MainUrlAddress: string= '';

  public IsRecordVoice:string = "0";
  
  public MyLanguage:string = 'en-US';

  public GetVoiceConvertToString(){
    
    let speechRecognition = webkitSpeechRecognition || SpeechRecognition;
    let incSpeechRecognition = new speechRecognition();
    incSpeechRecognition.lang = this.MyLanguage;
    incSpeechRecognition.start();
    const result = Observable.create(observer =>{

      incSpeechRecognition.onresult = (event)=>{
        let strresult: string = event.results[0][0].transcript;
        strresult = strresult.toLowerCase().trim();
        strresult = strresult.replace('please','').trim().replace('kasian','').trim();
        observer.next(strresult);
      }
      incSpeechRecognition.onerror = (erevent)=>{
        let strError = "I do not understand because " + erevent.error;
        observer.error(strError);
      }
      incSpeechRecognition.onspeechend = ()=>{
        incSpeechRecognition.stop();
        observer.complete();
      }

    });
    return result;
  }//end 

}//end class

export enum enmSaveMode{
  LocalStorage=1,
  LocalSqlite=2,
  CustomServer=3
}