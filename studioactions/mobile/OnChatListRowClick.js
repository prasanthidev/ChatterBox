function OnChatListRowClick(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_j8950880e16f4463a6a46549e38ef608(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_j8950880e16f4463a6a46549e38ef608(eventobject, sectionNumber, rowNumber) {
    recieverid = frmChatListKA.segChatListKA.selectedRowItems[0].id;
    alert(recieverid);
    var options = {};
    var wc = "( senderid = " + userId + " AND recieverid = " + recieverid + " ) OR ( senderid = " + recieverid + " AND recieverid = " + userId + " )";
    options["whereConditionAsAString"] = wc;
    alert(wc);
    getMessageRecords(options);
}