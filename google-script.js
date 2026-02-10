// Google Apps Script Code
// This goes in your Google Apps Script project (script.google.com)

// Replace with your actual Google Sheet ID
const SHEET_ID = '1iMni95O6dGVR2ByTRwi4QnNp5U55e8aGizadScT4hP8';
const SHEET_NAME = 'Responses';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(SHEET_ID);
    let sheet = doc.getSheetByName(SHEET_NAME);

    // Create sheet if missing
    if (!sheet) {
      sheet = doc.insertSheet(SHEET_NAME);
    }

    const data = JSON.parse(e.postData.contents);

    // Get headers from the sheet (1st row)
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1).getValues()[0];
    const newHeaders = [...headers];

    // Check incoming keys against existing headers
    const row = [];
    const keys = Object.keys(data);

    // Ensure 'Timestamp' is always first if not present
    if (newHeaders.length === 0 || (newHeaders.length === 1 && newHeaders[0] === "")) {
      newHeaders[0] = "Timestamp";
    }

    // Map data to headers, adding new headers if found
    keys.forEach(key => {
      let index = newHeaders.indexOf(key);
      if (index === -1) {
        // New column found, add it
        newHeaders.push(key);
        index = newHeaders.length - 1;
      }
    });

    // Update headers in sheet if new ones were added
    if (newHeaders.length > headers.length) {
      sheet.getRange(1, 1, 1, newHeaders.length).setValues([newHeaders]);
    }

    // Construct the row data based on final headers
    newHeaders.forEach(header => {
      // formatted date for Timestamp
      if (header === 'Timestamp') {
        row.push(new Date());
      } else {
        row.push(data[header] || '');
      }
    });

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("WebApp is running.");
}
