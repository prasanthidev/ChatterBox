
function createUser() {
  
  var createUserSuccess = function(record) {
    kony.print("Category '" + record.name + "' successfully created!");
    frmAddExpenseKA.show();
  };
  
  var createUserFailure = function(error) {
    kony.print("Couldn't create category. Error : " + JSON.stringify(error));
    frmAddExpenseKA.show();
  };
  
  var recordUser = {};
  //recordUser.name = frmAddCategoryKA.tbxCategoryName.text;
  //recordUser.description = frmAddCategoryKA.tbxCategoryDesc.text;
  
  objUser.create(recordUser, {}, createUserSuccess, createUserFailure);
}

function updateUser(record) {
  
  var updateUserSuccess = function(updated) {
    kony.print("Category '" + record.name + "' successfully updated!");
  };
  
  var updateUserFailure = function(error) {
    kony.print("Couldn't update record. Error : " + JSON.stringify(error));
  };
  
  var recordUser = {};
  
  objUser.updateByPK(recordUser, {"primaryKeys" : record.id}, updateUserSuccess, updateUserFailure);
}

function deleteUser(record) {
  
  var deleteUserSuccess = function(deleted) {
    kony.print("Category '" + record.name + "' successfully deleted!");
  };
  
  var deleteUserFailure = function(error) {
    kony.print("Couldn't delete record. Error : " + JSON.stringify(error));
  };
  
  objUser.deleteByPK({"primaryKeys" : record.id}, deleteUserSuccess, deleteUserFailure);
}

function getUserRecords(options, successCallback, failureCallback) {
  
  var readUserSuccess = function(records) {
    kony.print("Category records successfully fetched!");
    successCallback(records);
  };
  
  var readUserFailure = function(error) {
    kony.print("Couldn't fetch records. Error : " + JSON.stringify(error));
    failureCallback(error);
  };
  
  objUser.get(options, readUserSuccess, readUserFailure);
}