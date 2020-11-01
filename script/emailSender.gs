function sendVerificationEmail() {
  
  var EMAIL_SENT = 'EMAIL_SENT';
  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getLastRow();
  var values = sheet.getRange(row, 2, 1, 5).getValues();
  var admin = 'admin.example@example.com';
  
  var stemNo = setStemNo(sheet);
  var refNo = finnishReferenceNumber(stemNo);
  sheet.getRange(row, 7).setValue(refNo);
  
  var template = HtmlService.createTemplateFromFile('emailMessage');
  template.name = values[0][0];
  template.address = values[0][2];
  template.badges = values[0][3];
  template.sum = Number(values[0][3])*3 + 2;
  template.refNo = refNo;
  
  var message = template.evaluate().getContent();
  
  if (values[0][4] !== EMAIL_SENT) {
    
    MailApp.sendEmail(admin, 'Notification email', 'This email notifies the admins.');
    
    MailApp.sendEmail({
      to: values[0][1],
      replyTo: admin,
      subject: 'Confirmation email',
      htmlBody: message
    });
    
    sheet.getRange(row, 6).setValue(EMAIL_SENT);
    SpreadsheetApp.flush();
  }
}


function setStemNo(sheet) {
  var stem = (Number(sheet.getRange(2, 9).getValue())+1).toString();
  sheet.getRange(2, 9).setValue(stem);
  return stem;
}


function finnishReferenceNumber(stem) {
  var sum = 0;
  var numbers = [7,3,1];
  for (var i = 0; i<stem.length; i++) {
    sum += Number(stem[stem.length-1-i])*numbers[i%3];
  }
  
  var checksum = Math.ceil(sum/10)*10 - sum;
  return stem + checksum;
}