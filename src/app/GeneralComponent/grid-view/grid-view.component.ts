import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { BehaviorUserSettingService } from 'src/app/TotalServices/GeneralServices/behavior-user-setting.service';
import { GridSetting } from './gridSetting';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
})
export class GridViewComponent implements OnInit {

  public gridStyle:{ display: string}={ display:'block' };
  public MinSize: number;

  @Input() GridSetting: GridSetting;

  @Output() PageClicked = new EventEmitter<number>();

  private currentPage: number = 0;

  constructor(public bhvSetting:BehaviorUserSettingService) { 
    
  }

  ngOnInit() {
     
  }

  PageClick(status: 'Next' | 'Previous'){
    if(status == 'Next'){
      this.currentPage += 1;
    }
    if (status == 'Previous') {
      this.currentPage -= 1;
    }
    this.currentPage = (this.currentPage<0)?0:this.currentPage;
    this.PageClicked.emit(this.currentPage);
  }
  /*ngOnChanges(changes:SimpleChanges){
    if(!changes.firstChange){
      this.SetMinimizSize();
    }
  } 

  private SetMinimizSize(){
    if(!this.GridSetting){
      return;
    }
    if(this.GridSetting.ColumnCount<=2){
      this.MinSize = 100;
    }
    else if(this.GridSetting.ColumnCount>2 && this.GridSetting.ColumnCount<4) {
      this.MinSize = 400;
    }else if(this.GridSetting.ColumnCount>=4 && this.GridSetting.ColumnCount<8){
      this.MinSize=1000;
    }else if(this.GridSetting.ColumnCount>=8 && this.GridSetting.ColumnCount<16){
      this.MinSize=2000;
    }
  }*/

}
