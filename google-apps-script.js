// Google Apps Script code to paste into script.google.com
// This handles form submissions and writes to Google Sheets

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet()
    
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
    
    // Prepare row data (data is already formatted as strings)
    const rowData = [
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
      data.deviceInfo || ''
    ]
    
    // Add header row if this is the first submission
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'Session ID', 'Postal Code', 'Name', 'Email', 'Industry',
        'Education Level', 'Job Function Level', 'Company Size', 'Primary Goal',
        'Connection Types', 'Work Environment', 'Collaboration Preferences',
        'Networking Window', 'Day of Week', 'Experience', 'Communication',
        'Interests', 'Challenges', 'Additional Info', 'Device Info'
      ]
      sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    }
    
    // Append the new row
    sheet.appendRow(rowData)
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
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

// Optional: Function to set up the spreadsheet headers
function setupHeaders() {
  const sheet = SpreadsheetApp.getActiveSheet()
  const headers = [
    'Timestamp', 'Session ID', 'Postal Code', 'Name', 'Email', 'Industry',
    'Education Level', 'Job Function Level', 'Company Size', 'Primary Goal',
    'Connection Types', 'Work Environment', 'Collaboration Preferences',
    'Networking Window', 'Day of Week', 'Experience', 'Communication',
    'Interests', 'Challenges', 'Additional Info', 'Device Info'
  ]
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
}
