// Google Apps Script Code
// This goes in your Google Apps Script project (script.google.com)

// Replace with your actual Google Sheet ID
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      const headers = [
        'Timestamp',
        'Participant ID',
        'Age',
        'Gender',
        'Question 1',
        'Question 2',
        'Activities',
        'Question 4'
        // Add more headers for your 30 questions
      ];
      sheet.appendRow(headers);
    }
    
    // Prepare the row data
    const rowData = [
      data.timestamp,
      data.participantId,
      data.age,
      data.gender,
      data.question1,
      data.question2,
      data.activities,
      data.question4
      // Add more fields for your 30 questions
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'row': sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Questionnaire API is running');
}

// Function to export data as CSV (run this manually from Script Editor)
function exportToCSV() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    Logger.log('No sheet found');
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  let csv = '';
  
  data.forEach(row => {
    csv += row.map(cell => {
      // Escape quotes and wrap in quotes if contains comma
      const cellStr = String(cell);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return '"' + cellStr.replace(/"/g, '""') + '"';
      }
      return cellStr;
    }).join(',') + '\n';
  });
  
  // Create a blob and download
  const blob = Utilities.newBlob(csv, 'text/csv', 'questionnaire_responses.csv');
  
  // Save to Google Drive
  DriveApp.createFile(blob);
  Logger.log('CSV exported to Google Drive');
}
