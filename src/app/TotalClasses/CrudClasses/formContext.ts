export class FormContext{
    TableName: string;
    ParentTableName:string;
    LevelNumber:number;
    IsMaster: boolean = false;
    FkParentName:string = '';
    
    constructor(tableName:string,parentTableName:string,levelNumer:number,isMaster: boolean = false){
        this.TableName = tableName;
        this.ParentTableName = parentTableName;
        this.LevelNumber = levelNumer;
        this.IsMaster = isMaster;
    }
}