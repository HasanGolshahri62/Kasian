(self.webpackChunkKasianFinancial=self.webpackChunkKasianFinancial||[]).push([[2817],{4752:(e,t,i)=>{"use strict";i.d(t,{r:()=>p});var o=i(8720),s=i(9137),n=i(6134),r=i(7823),c=i(9226),l=i(8583);const a=function(e){return{display:e}};function d(e,t){if(1&e){const e=o.EpF();o.TgZ(0,"ion-button",4),o.NdJ("click",function(){return o.CHM(e),o.oxw().NewClicked()}),o._uU(1,"New "),o._UZ(2,"ion-icon",11),o.qZA()}if(2&e){const e=o.oxw();o.Q6J("ngStyle",o.VKq(2,a,e.srvDevice.IsCompressMode?"none":""))("disabled",e.IsFormActive)}}function h(e,t){if(1&e){const e=o.EpF();o.TgZ(0,"ion-button",4),o.NdJ("click",function(){return o.CHM(e),o.oxw().EditClicked()}),o._uU(1,"Edit "),o._UZ(2,"ion-icon",12),o.qZA()}if(2&e){const e=o.oxw();o.Q6J("ngStyle",o.VKq(2,a,e.srvDevice.IsCompressMode?"none":""))("disabled",e.IsFormActive)}}function u(e,t){if(1&e){const e=o.EpF();o.TgZ(0,"ion-button",4),o.NdJ("click",function(){return o.CHM(e),o.oxw().DeleteClicked()}),o._uU(1,"Delete "),o._UZ(2,"ion-icon",13),o.qZA()}if(2&e){const e=o.oxw();o.Q6J("ngStyle",o.VKq(2,a,e.srvDevice.IsCompressMode?"none":""))("disabled",e.IsFormActive)}}function C(e,t){if(1&e){const e=o.EpF();o.TgZ(0,"ion-button",4),o.NdJ("click",function(){return o.CHM(e),o.oxw().SaveClicked()}),o._uU(1,"Save "),o._UZ(2,"ion-icon",14),o.qZA()}if(2&e){const e=o.oxw();o.Q6J("ngStyle",o.VKq(2,a,e.srvDevice.IsCompressMode?"none":""))("disabled",!e.IsFormActive)}}let p=(()=>{class e{constructor(e,t,i,s,n){this.srvDevice=e,this.actnCtrl=t,this.navCtrl=i,this.appref=s,this.bhSetting=n,this.NewClick=new o.vpe,this.EditClick=new o.vpe,this.DeleteClick=new o.vpe,this.CancelClick=new o.vpe,this.SaveClick=new o.vpe,this.FormModeChange=new o.vpe,this.VoiceRecorder=new o.vpe,this.IsFormActive=!1,this.CrudDisplay={All:!0,New:!0,Edit:!0,Delete:!0,More:!0,Save:!0}}ngOnInit(){}CompressButtonClick(){let e=[];"1"==this.bhSetting.IsRecordVoice&&e.push({text:"Voice",icon:"mic-outline",handler:()=>{this.VoiceClicked()}}),this.IsFormActive?(e.push({text:"Save",icon:"save-outline",handler:()=>{this.SaveClicked()}}),e.push({text:"Cancel",icon:"hand-left-outline",handler:()=>{this.CancelClicked()}})):(this.CrudDisplay.New&&e.push({text:"New",icon:"add-outline",handler:()=>{this.NewClicked()}}),this.CrudDisplay.Edit&&e.push({text:"Edit",icon:"create-outline",handler:()=>{this.EditClicked()}}),this.CrudDisplay.Delete&&e.push({text:"Delete",icon:"trash-outline",handler:()=>{this.DeleteClicked()}})),this.actnCtrl.create({header:"select action",buttons:e}).then(e=>{e.present()})}closeTab(){if(!this.toolbarInfo||!this.toolbarInfo.TabInfo)return void console.log("can not close tab because tabinfo is not set");let e=this.srvDevice.TabList.findIndex(e=>e.Id==this.toolbarInfo.TabInfo.Id);e>=0&&(this.srvDevice.TabList.splice(e,1),this.navCtrl.navigateRoot(0==this.srvDevice.TabList.length?"/":this.srvDevice.TabList[e-1]?"/"+this.srvDevice.TabList[e-1].UrlAddress:"/"+this.srvDevice.TabList[e].UrlAddress),this.appref.tick())}NewClicked(){this.IsFormActive=!0,this.FormModeChange.emit(s.h.Add),this.NewClick.emit(!0)}EditClicked(){this.IsFormActive=!0,this.FormModeChange.emit(s.h.Edit),this.EditClick.emit(!0)}DeleteClicked(){this.IsFormActive=!1,this.FormModeChange.emit(s.h.Delete),this.DeleteClick.emit(!0)}CancelClicked(){this.IsFormActive=!1,this.FormModeChange.emit(s.h.View),this.CancelClick.emit(!0)}SaveClicked(){this.IsFormActive=!1,this.SaveClick.emit(!0),this.FormModeChange.emit(s.h.View)}VoiceClicked(){let e=this.bhSetting.GetVoiceConvertToString().subscribe(t=>{console.log(t),this.VoiceRecorder.emit(t),e.unsubcribe()})}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(n.U),o.Y36(r.BX),o.Y36(r.SH),o.Y36(o.z2F),o.Y36(c.O))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-form-toolbar"]],inputs:{CrudDisplay:"CrudDisplay",toolbarInfo:"toolbarInfo"},outputs:{NewClick:"NewClick",EditClick:"EditClick",DeleteClick:"DeleteClick",CancelClick:"CancelClick",SaveClick:"SaveClick",FormModeChange:"FormModeChange",VoiceRecorder:"VoiceRecorder"},decls:21,vars:20,consts:[[3,"click"],["name","close-outline"],["slot","end",3,"ngStyle"],[3,"ngStyle","disabled","click",4,"ngIf"],[3,"ngStyle","disabled","click"],["name","hand-left-outline"],["disabled","",3,"ngStyle"],["name","briefcase-outline"],[3,"ngStyle","click"],["name","mic-outline"],["name","apps-outline"],["name","add-outline"],["name","create-outline"],["name","trash-outline"],["name","save-outline"]],template:function(e,t){1&e&&(o.TgZ(0,"ion-toolbar"),o.TgZ(1,"ion-buttons"),o._UZ(2,"ion-menu-button"),o.TgZ(3,"ion-button",0),o.NdJ("click",function(){return t.closeTab()}),o._UZ(4,"ion-icon",1),o.qZA(),o.qZA(),o.TgZ(5,"ion-buttons",2),o.YNc(6,d,3,4,"ion-button",3),o.YNc(7,h,3,4,"ion-button",3),o.YNc(8,u,3,4,"ion-button",3),o.YNc(9,C,3,4,"ion-button",3),o.TgZ(10,"ion-button",4),o.NdJ("click",function(){return t.CancelClicked()}),o._uU(11,"Cancel "),o._UZ(12,"ion-icon",5),o.qZA(),o.TgZ(13,"ion-button",6),o._uU(14,"More "),o._UZ(15,"ion-icon",7),o.qZA(),o.TgZ(16,"ion-button",8),o.NdJ("click",function(){return t.VoiceClicked()}),o._uU(17,"Voice "),o._UZ(18,"ion-icon",9),o.qZA(),o.TgZ(19,"ion-button",8),o.NdJ("click",function(){return t.CompressButtonClick()}),o._UZ(20,"ion-icon",10),o.qZA(),o.qZA(),o.qZA()),2&e&&(o.xp6(5),o.Q6J("ngStyle",o.VKq(10,a,t.CrudDisplay.All?"block":"none")),o.xp6(1),o.Q6J("ngIf",t.CrudDisplay.New),o.xp6(1),o.Q6J("ngIf",t.CrudDisplay.Edit),o.xp6(1),o.Q6J("ngIf",t.CrudDisplay.Delete),o.xp6(1),o.Q6J("ngIf",t.CrudDisplay.Save),o.xp6(1),o.Q6J("ngStyle",o.VKq(12,a,t.srvDevice.IsCompressMode?"none":""))("disabled",!t.IsFormActive),o.xp6(3),o.Q6J("ngStyle",o.VKq(14,a,t.srvDevice.IsCompressMode?"none":"")),o.xp6(3),o.Q6J("ngStyle",o.VKq(16,a,t.srvDevice.IsCompressMode&&"1"==t.bhSetting.IsRecordVoice?"none":"")),o.xp6(3),o.Q6J("ngStyle",o.VKq(18,a,t.srvDevice.IsCompressMode?"":"none")))},directives:[r.sr,r.Sm,r.fG,r.YG,r.gu,l.PC,l.O5],styles:[""]}),e})()},1883:(e,t,i)=>{"use strict";i.d(t,{v:()=>r});var o=i(8583),s=i(7823),n=i(8720);let r=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[o.ez,s.Pc]]}),e})()},9137:(e,t,i)=>{"use strict";i.d(t,{h:()=>o});var o=(()=>(function(e){e[e.View=1]="View",e[e.Add=2]="Add",e[e.Edit=3]="Edit",e[e.Delete=4]="Delete"}(o||(o={})),o))()},7528:(e,t,i)=>{"use strict";i.d(t,{S:()=>C});var o=i(9137),s=i(8720),n=i(2156),r=i(7823),c=i(8583),l=i(6440);function a(e,t){if(1&e&&(s.TgZ(0,"ion-col",3),s.TgZ(1,"ion-text"),s._uU(2),s.qZA(),s.qZA()),2&e){const e=t.$implicit;s.Udp("display",e.Hidden?"none":"block"),s.Q6J("appBorderControl","Grid,head"),s.xp6(2),s.Oqu(e.Title)}}function d(e,t){if(1&e&&(s.TgZ(0,"ion-col",3),s.TgZ(1,"ion-text"),s._uU(2),s.qZA(),s.qZA()),2&e){const e=t.$implicit,i=s.oxw().$implicit;s.Udp("display",e.Hidden?"none":"block"),s.Q6J("appBorderControl","Grid,row"),s.xp6(2),s.Oqu(i[e.Name])}}function h(e,t){if(1&e){const e=s.EpF();s.TgZ(0,"ion-row",0),s.NdJ("click",function(){const t=s.CHM(e).index;return s.oxw().RowGridClick(t)}),s.YNc(1,d,3,4,"ion-col",1),s.qZA()}if(2&e){const e=s.oxw();s.xp6(1),s.Q6J("ngForOf",e.Columns)}}let u=(()=>{class e{constructor(e,t){this.selectCtrl=e,this.mdCtrl=t,this.ListData=[],this.Columns=[],this.currentRowIndex=0}ngOnInit(){if(!this.lovData)throw new Error("LovData not set for Lov");if(!this.lovData.SelectName&&!this.lovData.SelectQuery)throw new Error("you have to set SelectName or SelectQuery in LovData");if(!this.lovData.SourceRow)throw new Error("Source row have to set");if(!this.lovData.TablesInfo)throw new Error("TablesInfo have to set");if(!this.lovData.ColumnsConfig)throw new Error("ColumnsConfig have to set");this.Columns=this.lovData.ColumnsConfig;let e={};this.lovData.SelectQuery?e.SelectQuery=this.lovData.SelectQuery:e.SelectName=this.lovData.SelectName,e.CrudType=4,e.TablesInfo=this.lovData.TablesInfo,e.SelectFunctionInSuccess=e=>{for(const t of e)this.ListData.push(t);this.lovData.myApp&&this.lovData.myApp.tick()},this.selectCtrl.SelectData(e)}RowGridClick(e){this.currentRowIndex=e}lovClick(e){"Cancel"==e&&this.mdCtrl.dismiss(null,"Cancel"),"Ok"==e&&this.mdCtrl.dismiss(this.ListData[this.currentRowIndex],"Ok")}}return e.\u0275fac=function(t){return new(t||e)(s.Y36(n.H),s.Y36(r.IN))},e.\u0275cmp=s.Xpm({type:e,selectors:[["app-lov"]],inputs:{lovData:"lovData"},decls:11,vars:2,consts:[[3,"click"],[3,"appBorderControl","display",4,"ngFor","ngForOf"],[3,"click",4,"ngFor","ngForOf"],[3,"appBorderControl"]],template:function(e,t){1&e&&(s.TgZ(0,"ion-header"),s.TgZ(1,"ion-button",0),s.NdJ("click",function(){return t.lovClick("Ok")}),s._uU(2,"Ok"),s.qZA(),s.TgZ(3,"ion-button",0),s.NdJ("click",function(){return t.lovClick("Cancel")}),s._uU(4,"Cancel"),s.qZA(),s._UZ(5,"ion-text"),s.qZA(),s.TgZ(6,"ion-content"),s.TgZ(7,"ion-grid"),s.TgZ(8,"ion-row"),s.YNc(9,a,3,4,"ion-col",1),s.qZA(),s.YNc(10,h,2,1,"ion-row",2),s.qZA(),s.qZA()),2&e&&(s.xp6(9),s.Q6J("ngForOf",t.Columns),s.xp6(1),s.Q6J("ngForOf",t.ListData))},directives:[r.Gu,r.YG,r.yW,r.W2,r.jY,r.Nd,c.sg,r.wI,l.L],styles:[""]}),e})();class C{constructor(){this._isFormActive=!1,this.MasterKeyList=["Id"],this.TablesInfo=[]}FormModeChanged(e){this._currentFormMode=e,this._isFormActive=e==o.h.Add||e==o.h.Edit}get IsFormActive(){return this._isFormActive}NewMasterClicked(){this.MasterRow&&(this.oldMasterRow=this.MasterRow);for(const e of Object.keys(this.MasterRow))this.MasterKeyList.includes(e)?this.MasterRow[e]="number"==typeof this.MasterRow[e]?-1:"":"number"==typeof this.MasterRow[e]?this.MasterRow[e]=0:"string"==typeof this.MasterRow[e]?this.MasterRow[e]="":"object"==typeof this.MasterRow[e]&&Array.isArray(this.MasterRow[e])&&(this.MasterRow[e].length=0)}EditClicked(){if(this.oldMasterRow={},this.MasterRow)for(const e in this.MasterRow)if(Object.prototype.hasOwnProperty.call(this.MasterRow,e)){const t=this.MasterRow[e];if(Array.isArray(t)){this.oldMasterRow[e]=[];for(const i of t)this.oldMasterRow[e].push(Object.assign({},i))}else this.oldMasterRow[e]=t}}CancelClicked(){if(this.oldMasterRow)for(const e in this.oldMasterRow)if(Object.prototype.hasOwnProperty.call(this.oldMasterRow,e)){const t=this.oldMasterRow[e];if(Array.isArray(t)){this.MasterRow[e]=[];for(const i of t)this.MasterRow[e].push(Object.assign({},i))}else this.MasterRow[e]=t}}GoToPage(e,t){this.SelectNavJsonData.CurrentRowIndex=e,t.SelectData(this.SelectNavJsonData)}SetEnabledForNextPage(e,t,i){i.CanNextPage=!(e.length<t.NavigatorPageSize)}saveForm(e){let t=Object.assign({},this.MasterRow);t.TablesInfo=this.TablesInfo,t.CrudType=this._currentFormMode==o.h.Add?1:2,this._currentFormMode==o.h.Add?(t.FunctionInInsertSuccess=this.FunctionInInsertSuccess,e.SaveNewData(t)):(t.FunctionInUpdateSuccess=this.FunctionInUpdateSuccess,e.SaveEditedData(t,this.oldMasterRow))}DeleteForm(e){let t=Object.assign({},this.MasterRow);t.TablesInfo=this.TablesInfo,t.CrudType=3,t.FunctionInDeleteSuccess=this.FunctionInDeleteSuccess,e.DeleteData(t)}ShowDialog(e,t){e.create({component:u,componentProps:{lovData:t}}).then(e=>(e.present(),e.onDidDismiss())).then(e=>{if("Ok"==e.role)for(const i of t.ColumnsConfig)i.MapToSource&&(t.SourceRow[i.MapToSource]=e.data[i.Name])})}RunLovSilently(e,t){e.SelectData({TablesInfo:t.TablesInfo,CrudType:4,SelectName:t.SelectName,SelectCondition:t.SelectCondition,SelectFunctionInSuccess:e=>{let i=e[0];for(const o of t.ColumnsConfig)t.SourceRow[o.MapToSource]=i?i[o.Name]:null;t.myApp&&t.myApp.tick()}})}getTextVoiceAndDo(e,t){let i=Object.getOwnPropertyNames(this.MasterRow);if(e.startsWith("go to"))e=(e=e.substring(5).trim()).replace("record","").trim(),Number(e)&&this.GoToPage(Number(e)-1,t);else{let o=e.split(" ");if("new"==o[0]&&this.NewMasterClicked(),"edit"==o[0]&&this.EditClicked(),"cancel"==o[0]&&this.CancelClicked(),"new"==o[0]||"edit"==o[0]){for(const t of i){let i=e.indexOf(t);if(i>=0){let o=e.indexOf(" ",i+t.length)>=0?e.indexOf(" ",i+t.length+1):e.length,s=e.substring(i+t.length,o).trim();this.MasterRow[t]=s}}e.includes("save")&&this.saveForm(t)}}}}},6440:(e,t,i)=>{"use strict";i.d(t,{L:()=>n});var o=i(8720),s=i(282);let n=(()=>{class e{constructor(e,t,i){this.elRef=e,this.rendrer=t,this.srvUser=i}ngOnInit(){let e,t,i,o;this.appBorderControl&&!this.appBorderControl.startsWith("Grid")||(this.appBorderControl.endsWith(",head")&&this.srvUser.GridBorderHeaderSetting?(e=this.srvUser.GridBorderHeaderSetting.BorderWidth,i=this.srvUser.GridBorderHeaderSetting.BorderStyle,t=this.srvUser.GridBorderHeaderSetting.BorderColor,o=this.srvUser.GridHeaderBackColor):this.appBorderControl.endsWith(",row")&&this.srvUser.GridBorderRowSetting?(e=this.srvUser.GridBorderRowSetting.BorderWidth,i=this.srvUser.GridBorderRowSetting.BorderStyle,t=this.srvUser.GridBorderRowSetting.BorderColor,o=this.srvUser.GridRowsBackColor):(e=this.srvUser.GridBorderSetting.BorderWidth,i=this.srvUser.GridBorderSetting.BorderStyle,t=this.srvUser.GridBorderSetting.BorderColor,o="")),this.rendrer.setStyle(this.elRef.nativeElement,"borderWidth",e),this.rendrer.setStyle(this.elRef.nativeElement,"borderStyle",i),this.rendrer.setStyle(this.elRef.nativeElement,"borderColor",t),o&&this.rendrer.setStyle(this.elRef.nativeElement,"backgroundColor",o)}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(o.SBq),o.Y36(o.Qsj),o.Y36(s.B))},e.\u0275dir=o.lG2({type:e,selectors:[["","appBorderControl",""]],inputs:{appBorderControl:"appBorderControl"}}),e})()}}]);