
export class GridSetting{

    private _isManageColumn:boolean;

    constructor(isManageColumn:boolean = true){
        this._isManageColumn=isManageColumn;
    }

    public get IsManageColumn(){
        return this._isManageColumn;
    }
    
    FieldSetting:[{Name:string,MinSize:number,MaxSize:number,Visible?:boolean}];

    public get ColumnCount(){
        let _result:number=0;
        if(this.FieldSetting){
            _result = this.FieldSetting.filter(x => x.Visible == true).length;
        }
        return _result;
    }
    public CanNextPage: boolean = true;
    public IsDetail: boolean = false;
}