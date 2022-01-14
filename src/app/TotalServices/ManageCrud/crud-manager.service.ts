import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorUserSettingService, enmSaveMode } from '../GeneralServices/behavior-user-setting.service';
import { LocalStorageControl } from '../../TotalClasses/CrudClasses/localStorageControl';

@Injectable({
  providedIn: 'root'
})
export class CrudManagerService {

  private dbLocal: LocalStorageControl;

  private InitialLocalStorage(){
    this.dbLocal = new LocalStorageControl();
    this.dbLocal.InitialDatabase();
  }
  constructor(private behaviorSetting: BehaviorUserSettingService,private http: HttpClient) {
    if (behaviorSetting.SaveMode == enmSaveMode.LocalStorage) {
      this.InitialLocalStorage()
    }

  }

  public SelectData(jsonData: any) {
    if(this.behaviorSetting.NavigatorPageSize>0){
      jsonData["NavigatorPageSize"] = this.behaviorSetting.NavigatorPageSize;
    }
    if (this.behaviorSetting.SaveMode == enmSaveMode.LocalStorage) {
      if(!this.dbLocal){
        this.InitialLocalStorage();
      }
      this.dbLocal.DataControl(jsonData,null);
    }else{
      this.http.post(this.behaviorSetting.MainUrlAddress,jsonData).subscribe(
        (serverData)=>{
          jsonData.FunctionInSelectSuccess(serverData);
        },(serverError)=>{
          console.log(serverError);
        },()=>{}
      )
    }
    
  }

  public SaveNewData(NewData: any) {
    let _strResult: string = 'Successfully';

    try {
      if (this.behaviorSetting.SaveMode == enmSaveMode.LocalStorage) {
        if(!this.dbLocal){
          this.InitialLocalStorage();
        }
        this.dbLocal.DataControl(NewData);
      }else{
        this.http.post(this.behaviorSetting.MainUrlAddress,NewData).subscribe(
          (next)=>{
            NewData.FunctionInInsertSuccess(next);
          },(serverError) =>{
            console.log(serverError);
          }
          ,()=>{
            //complete
          }
        )
      }

    } catch (error) {
      _strResult = error.message;

    }

    return _strResult;
  }

  public SaveEditedData(NewData:any,OldData:any){

    try {
      if(this.behaviorSetting.SaveMode == enmSaveMode.LocalStorage){
        if(!this.dbLocal){
          this.InitialLocalStorage();
        }
        this.dbLocal.DataControl(NewData,OldData);
      }else{
        let UpdateData = {'NewData':NewData,'OldData':OldData}
        this.http.put(this.behaviorSetting.MainUrlAddress,UpdateData).subscribe(
          (serverData)=>{
            
          },(serverError)=>{
            console.log(serverError);
          },()=>{
            NewData.FunctionInUpdateSuccess();
          }
        )
      }
    } catch (error) {
      console.log(error);
    }
  }

  public DeleteData(deletedObject: any){
    try {
      if(this.behaviorSetting.SaveMode == enmSaveMode.LocalStorage){
        if(!this.dbLocal){
          this.InitialLocalStorage();
        }
        this.dbLocal.DataControl(deletedObject);
      }else{
        this.http.delete(this.behaviorSetting.MainUrlAddress,deletedObject).subscribe(
          (serverdata)=>{

          },(serverError)=>{
            console.log(serverError);
          },()=>{
            deletedObject.FunctionInDeleteSuccess()
          }
        )
      }
    } catch (error) {
      
    }
  }
}//end class
