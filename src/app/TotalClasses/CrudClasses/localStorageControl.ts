import { _support } from "localforage-cordovasqlitedriver";
import { FormContext } from "./FormContext";

export class LocalStorageControl {

    private tableDataList: TableDataRepository;
    //#region browser

    private db;
    constructor() {
        this.tableDataList = new TableDataRepository();
    }

    public ControlBrowser() {
        if ('openDatabase' in window) {
            return true;
        } else {
            return false;
        }
    }

    public InitialDatabase() {
        this.db = window.openDatabase('Kasiandb', '3', 'Kasian database', 5 * 1021 * 1021, this.SetDatabaseObject)
    }



    public DataControl(jsonData: any, jsonOldData: any = null) {

        let _result: any;
        

        if (!jsonData.TablesInfo
            || !Array.isArray(jsonData.TablesInfo)
            || jsonData.TablesInfo.length == 0) {
            throw new Error("TablesInfo is not find or it is not array or it is empty");
        }
        if (jsonData.TablesInfo.length == 1) {
            jsonData.TablesInfo[0].IsMaster = true;
        } else {
            let _find = jsonData.TablesInfo.filter(x => x.IsMaster == true);
            if (!_find) {
                throw new Error("you have to set master table in multi table change");
            }
        }
        if (!jsonData.CrudType || typeof jsonData.CrudType != 'number') {
            throw new Error("Crud type not seted or it is not number");
        }

        let crudType: number = jsonData.CrudType;//1=Insert,2=Update,3=Delete,4=Select
        switch (crudType) {
            case 1:
                this.CreateRecord(jsonData, jsonData.TablesInfo)
                break;
            case 2:
                this.UpdateRecord(jsonData, jsonOldData, jsonData.TablesInfo);
                break;
            case 3:
                this.DeleteRecord(jsonData, jsonData.TablesInfo);
                break;
            case 4:
                _result = this.SelectRecord(jsonData, jsonData.TablesInfo);
                break;
            default:
                throw new Error("crud type not valid");

                break;
        }
    }

    private CreateRecord(jsonData: any, TablesInfo: [FormContext]) {
        if (TablesInfo.length == 1) {
            this.CreateMaster(jsonData, TablesInfo[0]);
        } else {
            let _isSubDtl = TablesInfo.find(x => x.LevelNumber == 3);
            if (!_isSubDtl) {
                this.CreateDetailRows(jsonData, TablesInfo);
            }
        }

        /*for (const TableInfo of TablesInfo) {
            let tableColumns = this.tableDataList.ColumnListForTables.find(x => x.TableName == TableInfo.TableName);
            if (!tableColumns) {
                throw new Error("Column list not set for this table: " + TableInfo.TableName);
            }
            if (!jsonData.FunctionInInsertSuccess) {
                throw new Error("FunctionInInsertSuccess must be enter");
            }
            for (const column of tableColumns.Columns) {
                ColumnList += column + ',';
                if (jsonData[column]) {
                    ColumnValues += ((typeof jsonData[column] == 'string') ? "'" : "") + jsonData[column] + ((typeof jsonData[column] == 'string') ? "'" : "") + ',';
                } else {
                    ColumnValues += 'NULL,';
                }
            }
            ColumnList = ColumnList.substring(0, ColumnList.length - 1);
            ColumnValues = ColumnValues.substring(0, ColumnValues.length - 1);
            QueryStatement = "INSERT INTO  " + TableInfo.TableName + " (" + ColumnList + ") VALUES (" + ColumnValues + ");";

            this.db.transaction(function (tx) {
                tx.executeSql(QueryStatement, [], function (tr, results) {
                    jsonData.FunctionInInsertSuccess(results.insertId);
                });
            })
        }*/
    }

    private UpdateRecord(jsonData: any, jsonOldData: any, TablesInfo: [FormContext]) {
        let msrTableName: string = TablesInfo.find(x => x.IsMaster == true).TableName;
        if (TablesInfo.length == 1) {
            this.UpdateMaster(jsonData, jsonOldData, msrTableName);
        } else {
            let _isSubDtl = TablesInfo.find(x => x.LevelNumber == 3);
            if (!_isSubDtl) {
                this.UpdateMasterAndDetail(jsonData, jsonOldData, TablesInfo);
            }
        }


    }

    private DeleteRecord(jsonData: any, TablesInfo: [FormContext]) {
        let _conditionForDelete: string, QueryStatement: string[] = [];
        /*for (const tableInfo of TablesInfo) {
            _conditionForDelete = this.SetConditionForDeleteAndUpdate(jsonData, tableInfo.TableName, 3);
            if (!_conditionForDelete || _conditionForDelete.length == 0) {
                throw new Error("Delete condition not set and can not delete data");
            }
            QueryStatement.push("DELETE FROM " + tableInfo.TableName + " WHERE " + _conditionForDelete);
        }

        this.db.transaction(function (tx) {
            for (const currentQuery of QueryStatement) {
                tx.executeSql(QueryStatement, [], jsonData.FunctionInDeleteSuccess)
            }

        });*/
        if (TablesInfo.length == 1) {
            QueryStatement.push(this.DeleteMaster(jsonData, TablesInfo[0]));
        } else {
            let _isSubDtl = TablesInfo.find(x => x.LevelNumber == 3);
            if (!_isSubDtl) {
                QueryStatement = this.DeleteMasterAndDetail(jsonData, TablesInfo);
            }
        }
        this.db.transaction(function (tx) {
            for (const currentQuery of QueryStatement) {
                tx.executeSql(currentQuery, []);
            }
        }, this.getError, jsonData.FunctionInDeleteSuccess);
    }

    private SelectRecord(jsonData: any, TablesInfo: [FormContext]) {
        let selectCondition: string = '', QueryStatement: string = '', MainTableName: string = '';
        let _result = [];
        if (!jsonData.SelectFunctionInSuccess) {
            throw new Error("SelectFunctionInSuccess is not seted");
        }
        let _isSelectChild = jsonData["IsSelectChild"];
        let _masterTable = TablesInfo.find(x => x.IsMaster == true);
        if (!_masterTable && _isSelectChild) {
            throw new Error("Master table must selected in SelectChild mode");
        }
        if (_masterTable) {
            MainTableName = _masterTable.TableName;
        } else {
            MainTableName = TablesInfo[0].TableName;
        }
        if (jsonData.SelectQuery && typeof jsonData.SelectQuery == 'string' && jsonData.SelectQuery.toLowerCase().startsWith('select')) {
            QueryStatement = jsonData.SelectQuery;
        } else {

            let _findSelect = this.tableDataList.SelectQueries.find(x => x.TableName == MainTableName);
            if (!jsonData.SelectName || typeof jsonData.SelectName != 'string') {
                throw new Error("you should set SelectQuery in jsonData or SelectName or SelectName not a string");
            }
            let _findSelectQuery = _findSelect.Queries.find(x => x.SelectName == jsonData.SelectName);
            if (!_findSelectQuery) {
                throw new Error("SelectName is not valid");
            }
            QueryStatement = _findSelectQuery.Query;
        }

        for (const TableInfo of TablesInfo) {

            if (_isSelectChild && TableInfo.IsMaster == false) {
                //create join query
            }

        }//end for tablesInfo

        
        QueryStatement = this.SetConditionForSelectStatement(jsonData, QueryStatement);
        QueryStatement = this.SetSelectFieldAndGroupListStatement(jsonData,QueryStatement);
        if(_masterTable && jsonData["NavigatorPageSize"]
           && jsonData["NavigatorPageSize"]>0){
            if(jsonData["CurrentRowIndex"] == undefined){
                jsonData["CurrentRowIndex"] = 0;
            }
            QueryStatement += " LIMIT " + jsonData["NavigatorPageSize"] + " OFFSET " + (jsonData["CurrentRowIndex"] * jsonData["NavigatorPageSize"])
        }
        this.db.readTransaction(function (tx) {


            tx.executeSql(QueryStatement, [], function (tr, results) {
                jsonData.SelectFunctionInSuccess(results.rows);
            });

        }, this.getError);
    }

    private SetDatabaseObject(db) {

        let tPerson = 'CREATE TABLE "Person" ("Id" INTEGER,"Name" TEXT,"Family" TEXT,"Code" TEXT,PRIMARY KEY("Id" AUTOINCREMENT) );'
        let tRegard = 'CREATE TABLE "Regard" ("Id" INTEGER NOT NULL UNIQUE,"Code" TEXT NOT NULL,"Name" TEXT NOT NULL,PRIMARY KEY("Id" AUTOINCREMENT) );';
        let tCashDefine = 'CREATE TABLE "CashDefine" ("Id" INTEGER NOT NULL UNIQUE,"Name" TEXT NOT NULL,"Code" TEXT NOT NULL,PRIMARY KEY("Id" AUTOINCREMENT) );';
        let tBankDefine = 'CREATE TABLE "BankDefine" ("Id" INTEGER NOT NULL UNIQUE,"Name" TEXT NOT NULL,"AccountCode" TEXT,PRIMARY KEY("Id" AUTOINCREMENT) );';
        let tCashFirstCourse = 'CREATE TABLE "CashFirstCourse" ("Id" INTEGER NOT NULL UNIQUE,"CashDefineId" INTEGER NOT NULL,"Price" NUMERIC NOT NULL,PRIMARY KEY("Id" AUTOINCREMENT),FOREIGN KEY("CashDefineId") REFERENCES "CashDefine"("Id") );';
        let tBankFirstCourse = 'CREATE TABLE "BankFirstCourse" ("Id" INTEGER NOT NULL UNIQUE,"BankDefineId" INTEGER NOT NULL,"Price" NUMERIC NOT NULL,PRIMARY KEY("Id" AUTOINCREMENT),FOREIGN KEY("BankDefineId") REFERENCES "BankDefine"("Id") );';
        let tReceipt = 'CREATE TABLE "Receipt" ("Id" INTEGER NOT NULL UNIQUE,"Date" TEXT,"Serial" TEXT,"PersonId" INTEGER,"RegardId" INTEGER,"Description" TEXT,FOREIGN KEY("PersonId") REFERENCES "Person"("Id"),FOREIGN KEY("RegardId") REFERENCES "Regard"("Id"),PRIMARY KEY("Id" AUTOINCREMENT) );';
        let tReceiptDtl = `CREATE TABLE "ReceiptDtl" ("Id" INTEGER NOT NULL UNIQUE,"BankDefineId" INTEGER,"CashDefineId" INTEGER,"Price" NUMERIC,"Description" TEXT,"FkReceipt" INTEGER NOT NULL,FOREIGN KEY("CashDefineId") REFERENCES "CashDefine"("Id"),
        PRIMARY KEY("Id" AUTOINCREMENT),FOREIGN KEY("BankDefineId") REFERENCES "BankDefine"("Id") );`;
        let tPayment = 'CREATE TABLE "Payment" ("Id" INTEGER NOT NULL UNIQUE,"Date" TEXT,"Serial" TEXT,"PersonId" INTEGER,"RegardId" INTEGER,"Description" TEXT,FOREIGN KEY("PersonId") REFERENCES "Person"("Id"),FOREIGN KEY("RegardId") REFERENCES "Regard"("Id"),PRIMARY KEY("Id" AUTOINCREMENT) );';
        let tPaymentDtl = `CREATE TABLE "PaymentDtl" ("Id" INTEGER NOT NULL UNIQUE,"BankDefineId" INTEGER,"CashDefineId" INTEGER,"Price" NUMERIC,"Description" TEXT,"FkPayment" INTEGER NOT NULL,FOREIGN KEY("CashDefineId") REFERENCES "CashDefine"("Id"),
        PRIMARY KEY("Id" AUTOINCREMENT),FOREIGN KEY("BankDefineId") REFERENCES "BankDefine"("Id") );`;
        let trgReceipt = `CREATE TRIGGER tg_receipt AFTER INSERT on Receipt
        BEGIN
            UPDATE new
            set Serial=(SELECT ifnull(max(CAST(Serial as integer)),0)+1 from Receipt)
            ;
        END`;
        let trgPayment = `CREATE TRIGGER tg_payment AFTER INSERT on Payment
        BEGIN
            UPDATE Payment
            set Serial=(SELECT ifnull(max(CAST(Serial as integer)),0)+1 from Payment)
            WHERE Id=new.Id
            ;
        END`;
        let userGraphicalSetting:string = `CREATE TABLE "GraphicalUserSetting" ("Id" INTEGER,"DateDisplayFormat" TEXT,
 "GridHeaderBackColor" TEXT,"GridRowsBackColor" TEXT,"HeaderGridBorderColor" TEXT,"HeaderGridBorderWidth" TEXT,
 "HeaderGridBorderStyle" TEXT,"MiniGridBorderColor" TEXT,"MiniGridBorderWidth" TEXT,"MiniGridBorderStyle" TEXT,
 "RowsGridBorderColor" TEXT,"RowsGridBorderWidth" TEXT,"RowsGridBorderStyle" TEXT,"ReceiptSerialLength" INTEGER,
 "PaymentSerialLength" INTEGER,"BackgroundColor" TEXT,"TabLocation" TEXT,"LabelPositionStyle" TEXT,PRIMARY KEY("Id" AUTOINCREMENT));`
        let userBehaviorSetting:string = `CREATE TABLE "BehaviorUserSetting" ("Id" INTEGER,"SaveMode" INTEGER,"MainUrlAddress" TEXT,
 "NavigatorPageSize" INTEGER,"IsLoadNavigatorAfterNew" INTEGER,"IsLoadNavigatorAfterUpdate" INTEGER,"IsRecordVoice" INTEGER,PRIMARY KEY("Id" AUTOINCREMENT));`;
        db.transaction(function (tx) {
            tx.executeSql(tPerson);
            tx.executeSql(tRegard);
            tx.executeSql(tCashDefine);
            tx.executeSql(tBankDefine);
            tx.executeSql(tCashFirstCourse);
            tx.executeSql(tBankFirstCourse);
            tx.executeSql(tReceipt);
            tx.executeSql(tReceiptDtl);
            tx.executeSql(tPayment);
            tx.executeSql(tPaymentDtl);
            tx.executeSql(trgReceipt);
            tx.executeSql(trgPayment);
            tx.executeSql(userGraphicalSetting);
            tx.executeSql(userBehaviorSetting);
        }, function (er) {
            console.log(er);
        });

    }

    private SetConditionForDeleteAndUpdate(jsonData: any, tableName: string, crudType: 2 | 3) {
        let _result: string = "";
        if ((jsonData.DeleteConditions && crudType == 2)
            || (jsonData.UpdateConditions && crudType == 3)) {
            if (crudType == 2) {
                _result = jsonData.DeleteConditions
            } else {
                _result = jsonData.UpdateConditions
            }
        }
        if (this.tableDataList && this.tableDataList.ConditionList) {
            let _currentTable = this.tableDataList.ConditionList.find(x => x.TableName == tableName);
            if (_currentTable &&
                _currentTable.Conditions.length > 0) {
                for (let condition of _currentTable.Conditions) {
                    _result += condition.FieldName + " = " + condition.FieldValue;
                }
            } else {
                SetIdCondition();
            }
        } else {
            SetIdCondition();
        }
        function SetIdCondition() {
            if (!jsonData.Id) {
                throw new Error("you do not set Id for delete or update");
            }
            _result = "Id = " + jsonData.Id
        }

        return _result;
    }

    private getError(trx) {
        console.log(trx);
        throw new Error(trx.message);

    }


    private CreateMaster(jsonData: any, TableInfo: FormContext) {
        let QueryStatement: string = '';
        QueryStatement = this.GenerateInsertStatement(jsonData, TableInfo);

        this.db.transaction(function (tx) {
            tx.executeSql(QueryStatement, [], function (tr, results) {
                jsonData.FunctionInInsertSuccess(results.insertId);
            });
        });
    }

    private CreateDetailRows(jsonData: any, TablesInfo: [FormContext]) {
        let msrContext = TablesInfo.find(x => x.IsMaster == true)
        let QueryStatement: string = this.GenerateInsertStatement(jsonData, msrContext);

        let MsrKey: number = -1;
        this.db.transaction(function (tx) {
            tx.executeSql(QueryStatement, [], function (tr, results) {
                MsrKey = results.insertId;
                let _dtlTables = TablesInfo.filter(x => x.IsMaster == false);
                let tableDataList = new TableDataRepository();
                for (const tableInfo of _dtlTables) {
                    let tableColumns = tableDataList.ColumnListForTables.find(x => x.TableName == tableInfo.TableName);
                    if (!tableColumns) {
                        throw new Error("Column list not set for this table: " + msrContext.TableName);
                    }
                    let _dtlRows = jsonData[tableInfo.TableName];
                    let ColumnList = tableColumns.Columns.join(',');
                    for (const currentRow of _dtlRows) {
                        let ColumnValues = '';
                        for (const column of tableColumns.Columns) {
                            if (column == tableInfo.FkParentName) {
                                ColumnValues += MsrKey + ",";
                            } else {
                                if (currentRow[column]) {
                                    ColumnValues += ((typeof currentRow[column] == 'string') ? "'" : "") + currentRow[column] + ((typeof currentRow[column] == 'string') ? "'" : "") + ',';
                                } else {
                                    ColumnValues += 'NULL,';
                                }
                            }

                        }
                        ColumnValues = ColumnValues.substring(0, ColumnValues.length - 1);
                        QueryStatement = "INSERT INTO  " + tableInfo.TableName + " (" + ColumnList + ") VALUES (" + ColumnValues + ");";
                        tx.executeSql(QueryStatement, []);
                    }
                }
            });

        }, this.getError, function () {
            jsonData.FunctionInInsertSuccess(MsrKey);
        });
    }

    private UpdateMaster(jsonData: any, jsonOldData: any, MasterTableName: string) {

        let _updateStatement = this.GenerateUpdateStatement(jsonData, jsonOldData, MasterTableName);

        this.db.transaction(function (tx) {
            tx.executeSql(_updateStatement, [], jsonData.FunctionInUpdateSuccess);
        }, this.getError);
    }

    private UpdateMasterAndDetail(jsonData: any, jsonOldData: any, TablesInfo: [FormContext]) {
        let _masterTable = TablesInfo.find(x => x.IsMaster == true).TableName;
        let UpdateStatementList: string[] = [];
        let _updateStatementForMaster = this.GenerateUpdateStatement(jsonData, jsonOldData, _masterTable);
        if (_updateStatementForMaster.length > 0) {
            UpdateStatementList.push(_updateStatementForMaster);
        }

        let _detailsList = TablesInfo.filter(x => x.IsMaster == false);
        for (const dtlTable of _detailsList) {
            let _currentDtlRows = jsonData[dtlTable.TableName];
            for (const currentDtlRow of _currentDtlRows) {
                let oldRow = jsonOldData[dtlTable.TableName].find(x => x.Id == currentDtlRow.Id);
                if (oldRow) {
                    let _updtlRow = this.GenerateUpdateStatement(currentDtlRow, oldRow, dtlTable.TableName);
                    if (_updtlRow.length > 0) {
                        UpdateStatementList.push(_updtlRow);
                    }
                } else {
                    let _insDtlRow = this.GenerateInsertStatement(currentDtlRow, dtlTable, jsonData.Id);
                    UpdateStatementList.push(_insDtlRow);
                }
            }
            let _currentDtlOldRows = jsonOldData[dtlTable.TableName];
            for (const currentDtlOldRow of _currentDtlOldRows) {
                let _hasCurrentRow = jsonData[dtlTable.TableName].find(x => x.Id == currentDtlOldRow.Id);
                if (!_hasCurrentRow) {
                    let _delRow = this.GenerateDeleteStatement(currentDtlOldRow, dtlTable);
                    UpdateStatementList.push(_delRow);
                }
            }
        }
        this.db.transaction(function (tx) {
            for (const queryStatement of UpdateStatementList) {
                tx.executeSql(queryStatement, []);
            }
        }, this.getError, jsonData.FunctionInUpdateSuccess);
    }

    private DeleteMaster(jsonData: any, TableInfo: FormContext) {
        let _conditionForDelete: string, QueryStatement: string = '';
        _conditionForDelete = this.SetConditionForDeleteAndUpdate(jsonData, TableInfo.TableName, 3);
        if (!_conditionForDelete || _conditionForDelete.length == 0) {
            throw new Error("Delete condition not set and can not delete data");
        }
        QueryStatement = "DELETE FROM " + TableInfo.TableName + " WHERE " + _conditionForDelete;
        return QueryStatement;
    }

    private DeleteMasterAndDetail(jsonData: any, TablesInfo: [FormContext]) {
        let QueryStatements: string[] = [];
        let _tblList = TablesInfo.sort((a, b) => {
            if (a.LevelNumber > b.LevelNumber) { return -1; }
            else {
                if (a.LevelNumber == b.LevelNumber) { return 0; }
                else { return 1; }
            }
        });
        for (const currentTable of _tblList) {
            if (currentTable.IsMaster) {
                QueryStatements.push(this.DeleteMaster(jsonData, currentTable));
            } else {
                let _deleteCondition = currentTable.FkParentName + ' = ' + jsonData.Id;
                QueryStatements.push(this.GenerateDeleteStatement(jsonData[currentTable.TableName][0], currentTable, _deleteCondition))
            }

        }
        return QueryStatements;
    }

    private GenerateUpdateStatement(newJsonData: any, oldJsonData: any, TableName: string): string {
        let _conditionForUpdate: string;
        _conditionForUpdate = this.SetConditionForDeleteAndUpdate(newJsonData, TableName, 2);
        let QueryStatement: string = '', ColumnAndValuePair: string = '';
        let tableInfo = this.tableDataList.ColumnListForTables.find(x => x.TableName == TableName);
        if (!tableInfo) {
            throw new Error("column list not seted for this table");
        }
        for (const column of tableInfo.Columns) {
            if ((newJsonData[column] != undefined &&
                oldJsonData[column] != undefined && newJsonData[column] != oldJsonData[column]) ||
                (newJsonData[column] != undefined && !oldJsonData[column])) {
                ColumnAndValuePair += column + " = " + ((typeof newJsonData[column] == 'string') ? "'" : "") + newJsonData[column] + ((typeof newJsonData[column] == 'string') ? "'" : "") + ","
            }
        }
        ColumnAndValuePair = ColumnAndValuePair.substring(0, ColumnAndValuePair.length - 1);
        if (ColumnAndValuePair) {
            QueryStatement = "UPDATE " + TableName + " SET " + ColumnAndValuePair + " WHERE " + _conditionForUpdate;
        } else {
            QueryStatement = '';
        }

        return QueryStatement;
    }

    private GenerateInsertStatement(jsonData: any, TableInfo: FormContext, msrKey: number = -1): string {
        let ColumnList: string = '', ColumnValues: string = '', QueryStatement: string = '';
        let tableDataList = new TableDataRepository()
        let tableColumns = tableDataList.ColumnListForTables.find(x => x.TableName == TableInfo.TableName);
        if (!tableColumns) {
            throw new Error("Column list not set for this table: " + TableInfo.TableName);
        }
        if (!jsonData.FunctionInInsertSuccess && msrKey == -1) {
            throw new Error("FunctionInInsertSuccess must be enter");
        }
        for (const column of tableColumns.Columns) {
            if (column == TableInfo.FkParentName) {
                ColumnValues += msrKey + ",";
            } else {
                if (jsonData[column]) {
                    ColumnValues += ((typeof jsonData[column] == 'string') ? "'" : "") + jsonData[column] + ((typeof jsonData[column] == 'string') ? "'" : "") + ',';
                } else {
                    ColumnValues += 'NULL,';
                }
            }

        }
        ColumnList = tableColumns.Columns.join(',');
        ColumnValues = ColumnValues.substring(0, ColumnValues.length - 1);
        QueryStatement = "INSERT INTO  " + TableInfo.TableName + " (" + ColumnList + ") VALUES (" + ColumnValues + ");";

        return QueryStatement;
    }

    private GenerateDeleteStatement(row: any, TableInfo: FormContext, deleteCondition: string = '') {
        let _conditionForDelete: string, QueryDeleted: string = '';
        if (deleteCondition.length == 0) {
            _conditionForDelete = this.SetConditionForDeleteAndUpdate(row, TableInfo.TableName, 3);
        }
        else {
            _conditionForDelete = deleteCondition;
        }
        if ((!_conditionForDelete || _conditionForDelete.length == 0) && deleteCondition.length == 0) {
            throw new Error("Delete condition not set and can not delete data");
        }
        QueryDeleted = 'DELETE FROM ' + TableInfo.TableName + ' WHERE ' + _conditionForDelete;
        return QueryDeleted;
    }

    private SetConditionForSelectStatement(jsonData: any, selectQuery: string) {
        let selectCondition: string = '';
        if (jsonData.SelectCondition) {
            for (const condition of jsonData.SelectCondition) {
                let _currentOperator: string='';
                if(!condition.Operator){
                    _currentOperator = (condition.FieldValue)?' = ': ' IS '
                }else{
                    _currentOperator = condition.Operator;
                }
                selectCondition += condition.FieldName + _currentOperator + ((typeof condition.FieldValue == 'string') ? "'" : "") + condition.FieldValue + ((typeof condition.FieldValue == 'string') ? "'" : "");
                if(condition.Operator && condition.Operator.trim() == 'BETWEEN'){
                    selectCondition += ' AND ' + ((typeof condition.FieldValue2 == 'string') ? "'" : "") + condition.FieldValue2 + ((typeof condition.FieldValue2 == 'string') ? "'" : "");
                }
                selectCondition += " AND ";
            }
            selectCondition = selectCondition.substring(0, selectCondition.length - 4);
        }
        if (selectCondition.length > 0) {

            selectCondition = " WHERE " + selectCondition;
        }
        if (selectQuery.indexOf('{|ConditionForSelect|}') == -1) {
            selectQuery += selectCondition;
        } else {
            while (selectQuery.indexOf('{|ConditionForSelect|}') != -1) {
                selectQuery = selectQuery.replace('{|ConditionForSelect|}', selectCondition);
            }
        }
        return selectQuery;
    }

    private SetSelectFieldAndGroupListStatement(jsonData: any, selectQuery: string) {

        let _selectColumns: string = ',',_selectColumnsOut: string=',';
        let _groupByList: string = '';
        if (jsonData.SelectList) {
            for (const currentCol of jsonData.SelectList) {
                switch (currentCol.FieldName) {
                  case 'Person':
                    _selectColumnsOut += 'PersonId,PersonName,'
                    _selectColumns += "PersonId,Person.Name || ' ' || Person.Family as PersonName,"
                  break;
                  case 'Regard':
                    _selectColumnsOut += 'RegardId,RegardName,'
                    _selectColumns += "RegardId,Regard.Name as RegardName,"
                  break;
                  case 'Bank':
                    _selectColumnsOut += 'BankDefineId,BankName,'
                    _selectColumns += "BankDefineId,BankDefine.Name as BankName,"
                  break;
                  case 'Cash':
                    _selectColumnsOut += 'CashDefineId,CashName,'
                    _selectColumns += "CashDefineId,CashDefine.Name as CashName,"
                  break;
                  case 'Date':
                    _selectColumnsOut += "Date,"
                    _selectColumns += "Date,"
                  break;
                  default:
                    _selectColumns += currentCol.FieldName + ",";
                  break;
                }
            }
            _selectColumns = _selectColumns.substring(0,_selectColumns.length - 1);
        }

        while (selectQuery.indexOf('{|SelectList|}') != -1) {
            if (_selectColumns == ',') {
                selectQuery = selectQuery.replace('{|SelectList|}', '');
            } else {
                selectQuery = selectQuery.replace('{|SelectList|}', _selectColumns);
            }

        }
        if (_selectColumnsOut) {
            _selectColumnsOut = _selectColumnsOut.substring(0,_selectColumnsOut.length - 1);
            selectQuery = selectQuery.replace('{|SelectListOut|}',_selectColumnsOut);
        }
        if(jsonData.GroupByList){
            for (const currentCol of jsonData.GroupByList) {
                switch (currentCol) {
                  case 'Person':
                    _groupByList += "PersonId,Person.Name,Person.Family,"
                  break;
                  case 'Regard':
                    _groupByList += "RegardId,Regard.Name,";
                  break;
                  case 'Bank':
                    _groupByList += "BankDefineId,BankDefine.Name,";
                  break;
                  case 'Cash':
                    _groupByList += "CashDefineId,CashDefine.Name,"
                  break;
                  case 'Date':
                    _groupByList += "Date,"
                  break;
                  default:
                    _groupByList += currentCol + ",";
                  break;
                }
            }
            if(_groupByList.length>1){
                _groupByList = "GROUP BY " + _groupByList.substring(0,_groupByList.length - 1);
            }
            
        }
        while (selectQuery.indexOf('{|GroupByListOut|}') != -1) {
            selectQuery = selectQuery.replace('{|GroupByListOut|}',((_selectColumnsOut == "," || _selectColumnsOut == "")?"":'GROUP BY ' + _selectColumnsOut.substring(1)));
        }
        while (selectQuery.indexOf('{|GroupByList|}') != -1) {
            selectQuery = selectQuery.replace('{|GroupByList|}', ((_groupByList == ",")?"":_groupByList));
        }
        return selectQuery;
    }

    //#endregion browser

}//end class

class TableDataRepository {

    public ConditionList: [{ TableName: string, Conditions: [{ FieldName: string, FieldValue: string }] }]

    public ColumnListForTables = [{ TableName: 'Person', Columns: ['Name', 'Family', 'Code'] },
    { TableName: 'Regard', Columns: ['Name', 'Code'] },
    { TableName: 'CashDefine', Columns: ['Name', 'Code'] },
    { TableName: 'BankDefine', Columns: ['Name', 'AccountCode'] },
    { TableName: 'CashFirstCourse', Columns: ['CashDefineId', 'Price'] },
    { TableName: 'BankFirstCourse', Columns: ['BankDefineId', 'Price'] },
    { TableName: 'Receipt', Columns: ['Date', 'Serial', 'PersonId', 'RegardId', 'Description'] },
    { TableName: 'ReceiptDtl', Columns: ['BankDefineId', 'CashDefineId', 'Price', 'Description', 'FkReceipt'] },
    { TableName: 'Payment', Columns: ['Date', 'Serial', 'PersonId', 'RegardId', 'Description'] },
    { TableName: 'PaymentDtl', Columns: ['BankDefineId', 'CashDefineId', 'Price', 'FkPayment', 'Description'] },
    { TableName: 'GraphicalUserSetting', Columns: ['DateDisplayFormat','GridHeaderBackColor','GridRowsBackColor',
        'HeaderGridBorderColor','HeaderGridBorderWidth','HeaderGridBorderStyle','MiniGridBorderColor','MiniGridBorderWidth','MiniGridBorderStyle',
        'RowsGridBorderColor','RowsGridBorderWidth','RowsGridBorderStyle','ReceiptSerialLength','PaymentSerialLength',
        'BackgroundColor','TabLocation','LabelPositionStyle']},
    { TableName: 'BehaviorUserSetting', Columns: ['SaveMode','MainUrlAddress','NavigatorPageSize','IsLoadNavigatorAfterNew',
    'IsLoadNavigatorAfterUpdate','IsRecordVoice']}
    ];

    private _queryForCashFirstCourseNav: string = `SELECT CashFirstCourse.Id,CashFirstCourse.CashDefineId,CashFirstCourse.Price
    ,CashDefine.Code as CashCode,CashDefine.Name as CashName
    FROM CashFirstCourse
    JOIN CashDefine ON CashFirstCourse.CashDefineId = CashDefine.Id`;;

    private _queryForBankFirstCourseSelNav: string = `SELECT BankFirstCourse.Id,BankFirstCourse.BankDefineId,BankFirstCourse.Price
    ,BankDefine.AccountCode as BankAccountCode,BankDefine.Name as BankName
    FROM BankFirstCourse
    JOIN BankDefine on BankFirstCourse.BankDefineId = BankDefine.Id`;

    private _queryForReceiptForm: string = `SELECT Receipt.Id,Receipt.[Date],Receipt.Description,Receipt.PersonId,Receipt.RegardId,Receipt.Serial,
        Person.Name || ' ' || Person.Family as PersonName,
        Regard.Name as RegardName,
	    ReceiptDtl.Id as ReceiptDtlId,ReceiptDtl.BankDefineId,ReceiptDtl.CashDefineId,
	    ReceiptDtl.Description as ReceiptDtlDescription,ReceiptDtl.Price,
	    BankDefine.Name as BankName,
	    CashDefine.Name as CashName
    FROM Receipt
    LEFT JOIN Person on Person.Id = Receipt.PersonId
    LEFT JOIN Regard on Regard.Id = Receipt.RegardId
    left JOIN ReceiptDtl on Receipt.Id=ReceiptDtl.FkReceipt
    LEFT JOIN BankDefine on ReceiptDtl.BankDefineId=BankDefine.Id
    LEFT JOIN CashDefine on ReceiptDtl.CashDefineId=CashDefine.Id`;

    private _queryForPaymentForm: string = `SELECT Payment.Id,Payment.[Date],Payment.Description,Payment.PersonId,Payment.RegardId,Payment.Serial,
        Person.Name || ' ' || Person.Family as PersonName,
        Regard.Name as RegardName,
	    PaymentDtl.Id as PaymentDtlId,PaymentDtl.BankDefineId,PaymentDtl.CashDefineId,
	    PaymentDtl.Description as PaymentDtlDescription,PaymentDtl.Price,
	    BankDefine.Name as BankName,
	    CashDefine.Name as CashName
    FROM Payment
    LEFT JOIN Person on Person.Id = Payment.PersonId
    LEFT JOIN Regard on Regard.Id = Payment.RegardId
    left JOIN PaymentDtl on Payment.Id=PaymentDtl.FkPayment
    LEFT JOIN BankDefine on PaymentDtl.BankDefineId=BankDefine.Id
    LEFT JOIN CashDefine on PaymentDtl.CashDefineId=CashDefine.Id`;

    private _queryForMasterReport: string = `SELECT sum(ReceiptPrice) as ReceiptPrice,sum(PaymentPrice) as PaymentPrice
    {|SelectListOut|}
    FROM(
    SELECT sum(price) as ReceiptPrice,0 as PaymentPrice {|SelectList|}
    FROM Receipt
    JOIN ReceiptDtl on Receipt.Id = ReceiptDtl.FkReceipt
    LEFT JOIN CashDefine on ReceiptDtl.CashDefineId = CashDefine.Id
    LEFT JOIN BankDefine on ReceiptDtl.BankDefineId = BankDefine.Id
    LEFT JOIN Person on Receipt.PersonId = Person.Id
    LEFT JOIN Regard on Receipt.RegardId = Regard.Id
    {|ConditionForSelect|}
    {|GroupByList|}
    UNION ALL
    SELECT 0 as ReceiptPrice,sum(PaymentDtl.Price) as PaymentPrice {|SelectList|}
    FROM Payment
    JOIN PaymentDtl on Payment.Id = PaymentDtl.FkPayment
    LEFT JOIN CashDefine on PaymentDtl.CashDefineId = CashDefine.Id
    LEFT JOIN BankDefine on PaymentDtl.BankDefineId = BankDefine.Id
    LEFT JOIN Person on Payment.PersonId = Person.Id
    LEFT JOIN Regard on Payment.RegardId = Regard.Id
    {|ConditionForSelect|}
    {|GroupByList|}
    ) as ReceiptAndPayment
    {|GroupByListOut|}`;

    private _queryForDetailReport: string = `SELECT 'Receipt' as Type,Receipt.Date,Receipt.Serial
    ,sum(ReceiptDtl.Price) as ReceiptPrice,0 as PaymentPrice
    FROM Receipt
    JOIN ReceiptDtl on Receipt.Id = ReceiptDtl.FkReceipt
    {|ConditionForSelect|}
    GROUP BY Receipt.Date,Receipt.Serial
    UNION ALL
    SELECT 'Payment' as Type,Payment.Date,Payment.Serial
    ,0 as ReceiptPrice,sum(PaymentDtl.Price) as PaymentPrice
    FROM Payment
    JOIN PaymentDtl on Payment.Id = PaymentDtl.FkPayment
    {|ConditionForSelect|}
    GROUP BY Payment.Date,Payment.Serial`;

    private userGraphicSettingSelect:string = `SELECT Id,DateDisplayFormat,GridHeaderBackColor,GridRowsBackColor,
    HeaderGridBorderColor,HeaderGridBorderWidth,HeaderGridBorderStyle,
    MiniGridBorderColor,MiniGridBorderWidth,MiniGridBorderStyle,
    RowsGridBorderColor,RowsGridBorderWidth,RowsGridBorderStyle,
    ReceiptSerialLength,PaymentSerialLength,TabLocation,LabelPositionStyle,BackgroundColor
   FROM GraphicalUserSetting`;

    public SelectQueries = [{
        TableName: 'Person', Queries: [{ SelectName: 'SelectForNav', Query: 'SELECT Id,Name,Family,Code FROM Person' },
        { SelectName: 'PersonLov', Query: "SELECT Id, Name || ' ' || Family as FullName, Code FROM Person" }]
    },
    { TableName: 'Regard', Queries: [{ SelectName: 'SelectForNav', Query: 'SELECT Id,Name,Code FROM Regard' }] },
    { TableName: 'BankDefine', Queries: [{ SelectName: 'SelectForNav', Query: 'SELECT Id,Name,AccountCode FROM BankDefine' }] },
    { TableName: 'CashDefine', Queries: [{ SelectName: 'SelectForNav', Query: 'SELECT Id,Name,Code FROM CashDefine' }] },
    { TableName: 'CashFirstCourse', Queries: [{ SelectName: 'SelectForNav', Query: this._queryForCashFirstCourseNav }] },
    { TableName: 'BankFirstCourse', Queries: [{ SelectName: 'SelectForNav', Query: this._queryForBankFirstCourseSelNav }] },
    {
        TableName: 'Receipt'
        , Queries: [{ SelectName: 'SelectForNav', Query: 'SELECT Id,Serial,Date FROM Receipt' },
        { SelectName: 'SelectForm', Query: this._queryForReceiptForm }]
    },
    {
        TableName: 'Payment'
        , Queries: [{ SelectName: 'SelectForNav', Query: 'SELECT Id,Serial,Date FROM Payment' },
        { SelectName: 'SelectForm', Query: this._queryForPaymentForm }]
    },{
        TableName: 'ReportTransactions'
        , Queries: [{SelectName:'TransactionMasterSelect',Query:this._queryForMasterReport},
                    {SelectName:'TransactionDetailSelect',Query:this._queryForDetailReport}]
    },
    { TableName: 'GraphicalUserSetting',Queries:[{ SelectName:'SelectForm',Query: this.userGraphicSettingSelect}]},
    { TableName: 'BehaviorUserSetting',Queries:[{ SelectName:'SelectForm',Query:'SELECT Id,SaveMode,MainUrlAddress,NavigatorPageSize,IsLoadNavigatorAfterNew,IsLoadNavigatorAfterUpdate,IsRecordVoice FROM BehaviorUserSetting'}]}
    ];

}