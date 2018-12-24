//Type your code here
//Type your code here

var objUser;
var objMessages;

var objSvcUsers;

function setup() {
  
  //Enable logger..
  kony.logger.activatePersistors(kony.logger.consolePersistor);
  kony.logger.currentLogLevel = kony.logger.logLevel.TRACE;
  
  var setupSuccess = function() {
    
    try {
      
      objSvcUsers = new kony.sdk.KNYObjSvc("User");
      objUser = objSvcUsers.getSdkObjectByName("user");
      
      objSvcMessages = new kony.sdk.KNYObjSvc("Messages");
      objMessages = objSvcMessages.getSdkObjectByName("messages");
      
      syncExpenseOS();
      frmChatListKA.show();
      
    } catch (exp) {
      kony.print("Exception in creating the object or object service.");
    }
  };
  
  var setupFailure = function(error) {
    kony.print("Setup failure! Error : " + JSON.stringify(error));
  };
  
  kony.sdk.currentInstance.OfflineObjects.setup({}, setupSuccess, setupFailure);
}


function drop() {
  
  var dropSuccess = function() {
    kony.print("Drop success!");
    
    objUser = null;
    objMessages = null;
  };
  
  var dropFailure = function(error) {
    kony.print("Drop failure! Error : " + JSON.stringify(error));
  };
  
  kony.sdk.currentInstance.OfflineObjects.drop({}, dropSuccess, dropFailure);
}


function reset() {
  
  var resetSuccess = function() {
    kony.print("Reset success!");
    
    try {
      
      objSvcUsers = new kony.sdk.KNYObjSvc("User");
      objUser = objSvcUsers.getSdkObjectByName("user");
      
      objSvcMessages = new kony.sdk.KNYObjSvc("Messages");
      objMessages = objSvcMessages.getSdkObjectByName("messages");
      
      syncExpenseOS();
      
    } catch (exp) {
      kony.print("Exception in creating the object or object service.");
    }
  };
  
  var resetFailure = function(error) {
    kony.print("Reset failure! Error : " + JSON.stringify(error));
  };
  
  kony.sdk.currentInstance.OfflineObjects.reset({}, resetSuccess, resetFailure);
}

function syncExpenseOS() {
  var syncSuccess = function(records) {
    populateDataInDashboardForm();
  };
  
  var syncFailure = function(err) {
    
  };
  
  var syncProgress = function(err) {
    
  };
  
  objSvcUsers.startSync({}, syncSuccess, syncFailure, syncProgress);
}