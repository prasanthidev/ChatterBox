var binaryUserID = null;
var binaryColumnName = "profilepic";
var detailViewPreviousForm = null;

function loadUserDetails(userID, previousForm) {
  
  frmUserDetailsKA.lblUserNameKA.text = "";
  frmUserDetailsKA.lblNumberKA.text = "";
  detailViewPreviousForm = previousForm;
  var readUserSuccess = function(records) {
    if(records.length > 0) {
    	frmUserDetailsKA.lblUserNameKA.text = records[0]["name"];
	    frmUserDetailsKA.lblNumberKA.text = records[0]["status"]; 
    } else {
        frmUserDetailsKA.lblUserNameKA.text = "User details not found.";
        frmUserDetailsKA.lblNumberKA.text = ""; 
    }
    binaryUserID = userID;
    frmUserDetailsKA.show();
  };
  
  var readUserFailure = function(error) {
    kony.print("Couldn't fetch records. Error : " + JSON.stringify(error));
    alert("Couldn't get user detail now. Retry later.");
  };
  
  var options = {};
  var primaryKeys = {"id":userID};
  
  options.primaryKeys = primaryKeys;
  objUser.get(options, readUserSuccess, readUserFailure);
}

function onClickBackOnUserDetail() {
  detailViewPreviousForm.show();
}

function invokeGetBinaryStatus(successCallback, failureCallback) {
    var options = {"download":{
            "columnName":binaryColumnName,
            "queryType":
                kony.sdk.OfflineObjects.BinaryStatus.pending |
                kony.sdk.OfflineObjects.BinaryStatus.completed |
                kony.sdk.OfflineObjects.BinaryStatus.errored}
    };
    objUser.getBinaryStatus(options, successCallback, failureCallback);
}

function invokeGetBinary(onFileDownloadCompletedApp, onDownloadFailureApp) {
    var options = {};
    options.primaryKeys = {"id": binaryUserID};
    options.columnName = binaryColumnName;
    options.fileId = "pic" + binaryUserID;

    function onFileDownloadStartedApp(response ){
        kony.print("Object onFileDownloadStarted" + JSON.stringify(response));
    }
    function onStreamDownloadCompletedApp(response){
        //Not Supported in the current version
    }
    function onChunkDownloadCompletedApp (response){
        //Not Supported in the current version
    }
    objUser.getBinary(options, onFileDownloadStartedApp, onStreamDownloadCompletedApp,
        onChunkDownloadCompletedApp, onFileDownloadCompletedApp, onDownloadFailureApp);
}

function onClickDownloadProfilePic() {

    function onFileDownloadCompletedApp(response){
        alert("Download complete.");
        kony.print("File path: " + response.filePath);

        frmUserDetailsKA.imgPicKA.src = response.filePath;
        frmUserDetailsKA.show();
    }

    function onDownloadFailureApp (error){
        alert("Download failed: " + error.message);
        kony.print("Download failed: " + JSON.stringify(error));
    }

    invokeGetBinary(binaryUserID, onFileDownloadCompletedApp, onDownloadFailureApp);
}

function onClickStatusOfProfilePicDownload() {
    function successCallback(result) {
        var status = getBinaryDownloadStatusFromSuccessCallbackResut(result, binaryColumnName, binaryUserID);
        alert("Status: " + status);
    }

    function failureCallback(error) {
        alert("Get binary status failed: " + error.message);
        kony.print("Couldn't get binary download status due to: " + JSON.stringify(error));
    }

    invokeGetBinaryStatus(successCallback, failureCallback);
}

function getBinaryDownloadStatusFromSuccessCallbackResut(result, primaryKeyName, primaryKeyValue) {
    var isFound = false;
    var status = "Not found";

    if(!kony.sdk.isNullOrUndefined(result.download)) {
        var download = result.download;

        if(!kony.sdk.isNullOrUndefined(download.pending)) {
            var pending = download.pending;

            isFound = isPrimaryKeyFoundInResultArray(primaryKeyName, primaryKeyValue, pending);
            if(isFound) {
                status = "Pending";
            }
        }
        if(!(isFound || kony.sdk.isNullOrUndefined(download.completed))) {
            var completed = download.completed;

            isFound = isPrimaryKeyFoundInResultArray(primaryKeyName, primaryKeyValue, completed);
            if(isFound) {
                status = "Completed";
            }
        }
        if(!(isFound || kony.sdk.isNullOrUndefined(download.errored))) {
            var errored = download.errored;

            isFound = isPrimaryKeyFoundInResultArray(primaryKeyName, primaryKeyValue, errored);
            if(isFound) {
                status = "Errored";
            }
        }
    }
    return status;
}

function isPrimaryKeyFoundInResultArray(primaryKeyName, primaryKeyValue, resultArray) {
    var isFound = false;

    if(!kony.sdk.isNullOrUndefined(resultArray)) {
        var length = resultArray.length;

        for(var i=0; i<length; i++) {
            if(resultArray[i][primaryKeyName] === primaryKeyValue) {

                isFound = true;
                break;
            }
        }
    }

    return isFound;
}