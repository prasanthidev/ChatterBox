

function createMessage(recieverId) {
  
  var createMessageSuccess = function(record) {
    alert(JSON.stringify(record));
  };
  
  var createMessageFailure = function(error) {
    alert(JSON.stringify(error));
  };
  
  var message = {};
  message["content"] = frmChatKA.txtMessageKA.text;
  message["senderid"] = userId;
  message["recieverid"] = recieverId;
  message["status"] = false;
  
  objMessages.create(message, {}, createMessageSuccess, createMessageFailure);
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

function getMessageRecords(options) {
  
  var readMessageSuccess = function(records) {
    alert(JSON.stringify(records));
    frmChatKA.segChatKA.widgetDataMap = {"lblSubHeader" : "content", "lblHeader" : "senderid"};
    frmChatKA.segChatKA.data = records;
    frmChatKA.show();
  };
  
  var readMessageFailure = function(error) {
    alert(JSON.stringify(error));
  };
  
  objMessages.get(options, readMessageSuccess, readMessageFailure);
}