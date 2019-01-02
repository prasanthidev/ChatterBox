//Type your code here
//Type your code here

var objUser;
var objMessages;

var objSvcUsers;
var userId;
var userName;
var recieverid;
function setup() {
  
  //Enable logger..
  kony.logger.activatePersistors(kony.logger.consolePersistor);
  kony.logger.currentLogLevel = kony.logger.logLevel.TRACE;
   
  var setupSuccess = function(result) {
    objUser = new kony.sdk.KNYObj("user");
    objMessages = new kony.sdk.KNYObj("messages");
    ApplicationSync();
  }
  
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

function ApplicationSync() {
  function onSuccess(data) {
    userId = Number(frmLoginKA.userId.text);
    var options = {};
    var pk = {};
    pk["id"] = userId;
    options["primaryKeys"] = pk;
    getUserRecords(options, getUserSuccess, onFailure);
  }
  
  function onFailure(err) {
    alert(JSON.stringify(err));
  }
  
  function getUserSuccess(data) {
    alert("success");
    if(data.length > 0) {
      userName = data[0].name;
      getUserRecords({}, getUserSuccess1, onFailure);
    } else {
      alert("Invalid UserID");
    }
  }
  
  function getUserSuccess1(data) {
    alert("success1");
    frmChatListKA.segChatListKA.widgetDataMap = {"lblHeading" : "id", "lblDescription" : "name"};
    frmChatListKA.segChatListKA.data = data;
    frmChatListKA.show();
  }
  var options = {};
  options["objectServicesOptions"] = {"Users" : {"getSyncStats" : {}},
									  "Messages" : {"getSyncStats" : true}};
  KNYMobileFabric.OfflineObjects.startSync(options, onSuccess, onFailure, null);
}