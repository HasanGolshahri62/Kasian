import { Component, OnInit } from '@angular/core';
import { BasicFormBase } from '../../../TotalClasses/FormBaseClasses/BasicFormBase';

@Component({
  selector: 'app-company-setting',
  templateUrl: './company-setting.page.html',
  styleUrls: ['./company-setting.page.scss'],
})
export class CompanySettingPage extends BasicFormBase implements OnInit {

  crudDisplay : { All: boolean,New: boolean,Edit:boolean,Delete:boolean,Save:boolean,More:boolean};
  toolbar = { TabInfo: { Id: 20, UrlAddress: 'companySetting', Title: 'Vesion Information' } };
  constructor() { 
    super();
    this.crudDisplay = { All: false, New: false, Edit: false, Delete: false, Save: false, More: false };
  }

  ngOnInit() {
  }

}
