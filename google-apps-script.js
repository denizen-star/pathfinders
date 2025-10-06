// Google Apps Script code to paste into script.google.com
// This handles form submissions and writes to Google Sheets

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet()
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents)
    
    // Prepare row data
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
      Array.isArray(data.primaryGoal) ? data.primaryGoal.join('; ') : data.primaryGoal || '',
      Array.isArray(data.connectionTypes) ? data.connectionTypes.join('; ') : data.connectionTypes || '',
      Array.isArray(data.workEnvironment) ? data.workEnvironment.join('; ') : data.workEnvironment || '',
      Array.isArray(data.collaborationPreferences) ? data.collaborationPreferences.join('; ') : data.collaborationPreferences || '',
      Array.isArray(data.networkingWindow) ? data.networkingWindow.join('; ') : data.networkingWindow || '',
      Array.isArray(data.dayOfWeek) ? data.dayOfWeek.join('; ') : data.dayOfWeek || '',
      data.experience || '',
      data.communication || '',
      Array.isArray(data.interests) ? data.interests.join('; ') : data.interests || '',
      Array.isArray(data.challenges) ? data.challenges.join('; ') : data.challenges || '',
      data.additionalInfo || '',
      JSON.stringify(data.deviceInfo || {})
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
