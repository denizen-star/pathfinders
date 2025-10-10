# Scripts

This directory contains utility scripts and automation tools for Pathfinders.

## 📁 Available Scripts

### [google-apps-script.js](./google-apps-script.js)
**Google Sheets Integration Script**

This script is deployed to Google Apps Script to handle data submission from the Pathfinders form to Google Sheets.

**Features:**
- Receives POST requests from the application
- Writes data to designated Google Sheets
- Handles different submission types (Step1, Step2, Step3)
- Logs submission metadata

**Deployment:**
1. Open Google Apps Script Editor
2. Create new project
3. Copy contents of `google-apps-script.js`
4. Deploy as web app
5. Update app with deployment URL

**Configuration:**
- Requires Google Sheets API access
- Must be deployed as web app with "Anyone" access
- Spreadsheet ID must be configured in script

---

## 🔧 Usage

### Google Apps Script

```javascript
// Endpoint URL format:
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

// Used in: lib/dataSubmission.ts
```

### Adding New Scripts

When adding new scripts to this directory:
1. Create the script file
2. Add entry to this README
3. Document purpose and usage
4. Include configuration instructions
5. Add to project documentation

---

## 📋 Script Guidelines

### Naming Convention
- Use kebab-case: `script-name.js`
- Descriptive names: `google-sheets-integration.js`
- Include file extension

### Documentation
Each script should include:
- Header comments explaining purpose
- Configuration requirements
- Usage examples
- Dependencies

### Security
- Never commit API keys or secrets
- Use environment variables
- Document required permissions

---

**Last Updated**: October 10, 2025  
**Maintained By**: Development Team

