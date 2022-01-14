export class MenuManager {

  private colorForLevel: string[] = ['rgb(163,167,175)','rgb(132,225,183)','rgb(147,221,99)','rgb(221,163,99)'];
  public get ColorForLevel(){
    return this.colorForLevel;
  }

  public GenerateMenu() {
    let listMenu: MenuMode[] = [new MenuMode('General', 'mnuGeneral', true, false, true, 1,1,-1)];
    listMenu.push(new MenuMode('Basic Informations', 'mnuGenBasicInformations', true, false, false, 2, 2, 1));
    listMenu.push(new MenuMode('Define Person', 'mnuGenBasDefinePerson', false, false, false, 3, 3, 2,'definePerson'));
    listMenu.push(new MenuMode('Define Regard', 'mnuGenBasDefineRegard', false, false, false, 3, 4, 2,'defineRegard'));
    listMenu.push(new MenuMode('Setting', 'mnuGenSetting', true, false, false, 2,6,1));
    listMenu.push(new MenuMode('Graphical user setting', 'mnuGenSttGraphicalUserSetting', false, false, false, 3,19,6,'graphicalSetting'));
    listMenu.push(new MenuMode('Behavior setting', 'mnuGenSttBehaviorSetting', false, true, false, 3,21,6,'behaviorSetting'));
    listMenu.push(new MenuMode('Vesion Information', 'mnuGenSttCompanySetting', false, false, false, 3,20,6,'companySetting'));
    listMenu.push(new MenuMode('Treasury', 'mnuTreasury', true, false, true, 1,10,-1));
    listMenu.push(new MenuMode('Basic Informations', 'mnuTrsBasicInformation', true, false, false, 2,11,10));
    listMenu.push(new MenuMode('Define Cash', 'mnuTrsDefineCash', false, false, false, 3,12,11,'defineCash'));
    listMenu.push(new MenuMode('Define Bank', 'mnuTrsDefineBank', false, true, false, 3,13,11,'defineBank'));
    listMenu.push(new MenuMode('Operators', 'mnuTrsOperators', true, false, false, 2,14,10));
    listMenu.push(new MenuMode('Cash first course', 'mnuTrsOprCashFirstCourse', false, false, false, 3,15,14,'cashFirstCourse'));
    listMenu.push(new MenuMode('Bank first course', 'mnuTrsOprBankFirstCourse', false, false, false, 3,16,14,'bankFirstCourse'));
    listMenu.push(new MenuMode('Receipt', 'mnuTrsOprReceipt', false, false, false, 3,17,14,'receipt'));
    listMenu.push(new MenuMode('Payment', 'mnuTrsOprPayment', false, true, false, 3,18,14,'payment'));
    listMenu.push(new MenuMode('Reports', 'mnuTrsReports', true, false, false, 2,22,10));
    listMenu.push(new MenuMode('Cash and Bank transactions', 'mnuTrsRptCashAndBankTransactions', false, true, false, 3,23,22,'cashAndBankTransactionsReport'));

    for (let indexModel = 0; indexModel < listMenu.length; indexModel++) {
      let _currentMode = listMenu[indexModel];
      for (var indexLevel = 0; indexLevel <_currentMode.levelNumber-1; indexLevel++) {
        _currentMode.SpaceCounter.push(indexLevel + 1);
      }
    }
    return listMenu;

  }//end GenerateMenu

  public ClickMenuHandler(menuItem: MenuMode,totalMenu:MenuMode[]) {
    if (!menuItem.menuUrl) {
      //it is sub menu
      let listChild = totalMenu.filter(x => x.FkParent == menuItem.Id);
      for (let submenu of listChild) {
        submenu.isVisible = !submenu.isVisible;
        if (totalMenu.filter(x => x.FkParent == submenu.Id && x.isVisible == true).length > 0) {
          this.ClickMenuHandler(submenu, totalMenu);
        }
      }
    }else{
        return menuItem;
    }
  }

  public SetIcon(menuItemId: number, menuList: MenuMode[]) {
    let _result: string;
    if (menuList.filter(x => x.FkParent == menuItemId && x.isVisible == true).length > 0) {
      _result = "chevron-down-outline"
    } else {
      _result = "chevron-forward-outline"
    }
    return _result;
  }

}//end MenuManager class

class MenuMode {

  SpaceCounter: number[];
  
  constructor(public menuTitle: string, public menuName: string, public isBeginChild: boolean, public isEndChild: boolean,
              public isVisible: boolean, public levelNumber: number,public Id:number,public FkParent:number,public menuUrl:string = '') {
    this.SpaceCounter = [];
    
  }
}
