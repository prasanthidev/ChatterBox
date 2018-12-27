

function createMessage() {
  
  var createMessageSuccess = function(record) {
    kony.print("Category '" + record.name + "' successfully created!");
    frmAddExpenseKA.show();
  };
  
  var createMessageFailure = function(error) {
    kony.print("Couldn't create category. Error : " + JSON.stringify(error));
    frmAddExpenseKA.show();
  };
  
  var recordUser = {};
  //recordUser.name = frmAddCategoryKA.tbxCategoryName.text;
  //recordUser.description = frmAddCategoryKA.tbxCategoryDesc.text;
  
  objMessages.create(recordUser, {}, createMessageSuccess, createMessageFailure);
}

function updateMessage(record) {
  
  var updateMessageSuccess = function(updated) {
    kony.print("Category '" + record.name + "' successfully updated!");
  };
  
  var updateMessageFailure = function(error) {
    kony.print("Couldn't update record. Error : " + JSON.stringify(error));
  };
  
  var recordUser = {};
  
  objMessages.updateByPK(recordUser, {"primaryKeys" : record.id}, updateMessageSuccess, updateMessageFailure);
}

function deleteMessage(record) {
  
  var deleteMessageSuccess = function(deleted) {
    kony.print("Category '" + record.name + "' successfully deleted!");
  };
  
  var deleteMessageFailure = function(error) {
    kony.print("Couldn't delete record. Error : " + JSON.stringify(error));
  };
  
  objMessages.deleteByPK({"primaryKeys" : record.id}, deleteMessageSuccess, deleteMessageFailure);
}

function getMessageRecords(successCallback, failureCallback) {
  
  var readMessageSuccess = function(records) {
    kony.print("Category records successfully fetched!");
    successCallback(records);
  };
  
  var readMessageFailure = function(error) {
    kony.print("Couldn't fetch records. Error : " + JSON.stringify(error));
    failureCallback(error);
  };
  
  objMessages.get({}, readMessageSuccess, readMessageFailure);
}