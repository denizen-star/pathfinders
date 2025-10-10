// Google Apps Script code to paste into script.google.com
// This handles form submissions and writes to Google Sheets

function doPost(e) {
  try {
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    
    // Get form data (handles both JSON and FormData)
    let data = {}
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents)
      } catch (jsonError) {
        // If not JSON, treat as form data
        data = e.parameter
      }
    } else if (e.parameter) {
      data = e.parameter
    }
    
    // Determine which sheet to use based on stepType
    const stepType = data.stepType || 'Step3' // Default to Step3 for backward compatibility
    let sheetName = ''
    let rowData = []
    let headers = []
    
    switch(stepType) {
      case 'Step1':
        sheetName = 'Step 1 Data'
        rowData = [
          data.timestamp || new Date().toISOString(),
          data.sessionId || '',
          data.postalCode || '',
          data.deviceInfo || ''
        ]
        headers = ['Timestamp', 'Session ID', 'Postal Code', 'Device Info']
        break
        
      case 'Step2':
        sheetName = 'Step 2 Data'
        rowData = [
          data.timestamp || new Date().toISOString(),
          data.sessionId || '',
          data.postalCode || '',
          data.name || '',
          data.email || '',
          data.deviceInfo || '',
          data.action || '' // 'Continue' or 'Skip'
        ]
        headers = ['Timestamp', 'Session ID', 'Postal Code', 'Name', 'Email', 'Device Info', 'Action']
        break
        
      case 'Step3':
      default:
        sheetName = 'Step 3 Data'
        rowData = [
          data.timestamp || new Date().toISOString(),
          data.sessionId || '',
          data.postalCode || '',
          data.name || '',
          data.email || '',
          data.industry || '',
          data.educationLevel || '',
          data.jobFunctionLevel || '',
          data.companySize || '',
          data.primaryGoal || '',
          data.connectionTypes || '',
          data.workEnvironment || '',
          data.collaborationPreferences || '',
          data.networkingWindow || '',
          data.dayOfWeek || '',
          data.experience || '',
          data.communication || '',
          data.interests || '',
          data.challenges || '',
          data.additionalInfo || '',
          data.deviceInfo || '',
          data.action || '' // 'Finish' or 'Skip'
        ]
        headers = [
          'Timestamp', 'Session ID', 'Postal Code', 'Name', 'Email', 'Industry',
          'Education Level', 'Job Function Level', 'Company Size', 'Primary Goal',
          'Connection Types', 'Work Environment', 'Collaboration Preferences',
          'Networking Window', 'Day of Week', 'Experience', 'Communication',
          'Interests', 'Challenges', 'Additional Info', 'Device Info', 'Action'
        ]
        break
    }
    
    // Get or create the target sheet
    let sheet = spreadsheet.getSheetByName(sheetName)
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName)
    }
    
    // Clear existing data and add header row if this is the first submission to this sheet
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    }
    
    // Ensure we have the right number of columns for the data
    const requiredColumns = headers.length
    const currentColumns = sheet.getLastColumn()
    if (currentColumns < requiredColumns) {
      sheet.insertColumns(currentColumns + 1, requiredColumns - currentColumns)
    }
    
    // Append the new row
    sheet.appendRow(rowData)
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        sheetName: sheetName,
        stepType: stepType 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// Function to handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Google Apps Script is working!',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
}

// Function to set up headers for Step 1 Data sheet
function setupStep1Headers() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = spreadsheet.getSheetByName('Step 1 Data')
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Step 1 Data')
  }
  const headers = ['Timestamp', 'Session ID', 'Postal Code', 'Device Info']
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
}

// Function to set up headers for Step 2 Data sheet
function setupStep2Headers() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = spreadsheet.getSheetByName('Step 2 Data')
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Step 2 Data')
  }
  const headers = ['Timestamp', 'Session ID', 'Postal Code', 'Name', 'Email', 'Device Info', 'Action']
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
}

// Function to set up headers for Step 3 Data sheet
function setupStep3Headers() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = spreadsheet.getSheetByName('Step 3 Data')
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Step 3 Data')
  }
  const headers = [
    'Timestamp', 'Session ID', 'Postal Code', 'Name', 'Email', 'Industry',
    'Education Level', 'Job Function Level', 'Company Size', 'Primary Goal',
    'Connection Types', 'Work Environment', 'Collaboration Preferences',
    'Networking Window', 'Day of Week', 'Experience', 'Communication',
    'Interests', 'Challenges', 'Additional Info', 'Device Info', 'Action'
  ]
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
}

// Function to set up all headers at once
function setupAllHeaders() {
  setupStep1Headers()
  setupStep2Headers()
  setupStep3Headers()
}
