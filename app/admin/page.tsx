'use client'

import { useState, useEffect } from 'react'
import AdminLogin from '../../components/AdminLogin'
import { verifyAuthToken } from '../../lib/auth'

// Status checking interfaces
interface ConnectionStatus {
  isConnected: boolean
  lastChecked: string
  error?: string
}

interface SubmissionStatus {
  totalSubmissions: number
  recentSubmissions: number
  lastSubmission?: string
  errors: number
}

interface ConfigurationStatus {
  googleScriptUrl: string
  isConfigured: boolean
  hasValidUrl: boolean
}

export default function AdminPage() {
  // Production safety check - block admin access in production
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <div className="text-red-600 text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">
              Admin access is not available in production environment.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    lastChecked: 'Never'
  })
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    totalSubmissions: 0,
    recentSubmissions: 0,
    errors: 0
  })
  const [configurationStatus, setConfigurationStatus] = useState<ConfigurationStatus>({
    googleScriptUrl: '',
    isConfigured: false,
    hasValidUrl: false
  })
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin-auth-token')
    if (token && verifyAuthToken(token)) {
      setIsAuthenticated(true)
      // Check status when authenticated
      checkAllStatus()
    } else {
      localStorage.removeItem('admin-auth-token')
    }
  }, [])

  // Check Google Sheets connection
  const checkGoogleSheetsConnection = async (): Promise<ConnectionStatus> => {
    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxP8H-qh4r4uEN5Ea2xBXa__YjXFlJ30h7F4_kebDna3HEMlbz_WqG8H8pWBRhp2rSx/exec'
      
      // Test connection with a simple ping
      const testData = new FormData()
      testData.append('test', 'connection')
      testData.append('timestamp', new Date().toISOString())
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: testData
      })
      
      return {
        isConnected: true,
        lastChecked: new Date().toLocaleString(),
        error: undefined
      }
    } catch (error) {
      return {
        isConnected: false,
        lastChecked: new Date().toLocaleString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Check local storage for submissions
  const checkLocalSubmissions = (): SubmissionStatus => {
    try {
      const submissions = JSON.parse(localStorage.getItem('pathfinders-submissions') || '[]')
      const now = new Date()
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      
      const recentSubmissions = submissions.filter((sub: any) => {
        const submissionTime = new Date(sub.timestamp)
        return submissionTime > oneDayAgo
      }).length
      
      const lastSubmission = submissions.length > 0 ? submissions[submissions.length - 1]?.timestamp : undefined
      
      return {
        totalSubmissions: submissions.length,
        recentSubmissions,
        lastSubmission,
        errors: 0 // We can't easily track errors from localStorage
      }
    } catch (error) {
      return {
        totalSubmissions: 0,
        recentSubmissions: 0,
        errors: 1
      }
    }
  }

  // Check configuration
  const checkConfiguration = (): ConfigurationStatus => {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxP8H-qh4r4uEN5Ea2xBXa__YjXFlJ30h7F4_kebDna3HEMlbz_WqG8H8pWBRhp2rSx/exec'
    
    return {
      googleScriptUrl: GOOGLE_SCRIPT_URL,
      isConfigured: GOOGLE_SCRIPT_URL.includes('script.google.com'),
      hasValidUrl: GOOGLE_SCRIPT_URL.length > 50
    }
  }

  // Check all status
  const checkAllStatus = async () => {
    setIsCheckingStatus(true)
    
    try {
      // Check connection
      const connection = await checkGoogleSheetsConnection()
      setConnectionStatus(connection)
      
      // Check submissions
      const submissions = checkLocalSubmissions()
      setSubmissionStatus(submissions)
      
      // Check configuration
      const config = checkConfiguration()
      setConfigurationStatus(config)
    } catch (error) {
      console.error('Error checking status:', error)
    } finally {
      setIsCheckingStatus(false)
    }
  }

  const handleLogin = (token: string) => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin-auth-token')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-pathfinders-blue">
                Pathfinders Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Data Collection Management
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Real-time Data Collection Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              📊 Real-time Data Collection Status
            </h2>
            <button
              onClick={checkAllStatus}
              disabled={isCheckingStatus}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isCheckingStatus ? 'Checking...' : 'Refresh Status'}
            </button>
          </div>
          
          {/* Connection Status */}
          <div className={`border rounded-lg p-4 mb-6 ${
            connectionStatus.isConnected 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                connectionStatus.isConnected ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {connectionStatus.isConnected ? (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${
                  connectionStatus.isConnected ? 'text-green-800' : 'text-red-800'
                }`}>
                  {connectionStatus.isConnected ? '✅ Google Sheets Connected' : '❌ Google Sheets Disconnected'}
                </h3>
                <p className={`text-sm ${
                  connectionStatus.isConnected ? 'text-green-700' : 'text-red-700'
                }`}>
                  {connectionStatus.isConnected 
                    ? `Last checked: ${connectionStatus.lastChecked}` 
                    : connectionStatus.error || 'Connection failed'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Submission Statistics */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Total Submissions</h4>
              <p className="text-2xl font-bold text-blue-900">{submissionStatus.totalSubmissions}</p>
              <p className="text-xs text-blue-600">All time</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Recent (24h)</h4>
              <p className="text-2xl font-bold text-green-900">{submissionStatus.recentSubmissions}</p>
              <p className="text-xs text-green-600">Last 24 hours</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Last Submission</h4>
              <p className="text-sm font-bold text-purple-900">
                {submissionStatus.lastSubmission 
                  ? new Date(submissionStatus.lastSubmission).toLocaleString()
                  : 'None'
                }
              </p>
              <p className="text-xs text-purple-600">Most recent</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">Errors</h4>
              <p className="text-2xl font-bold text-orange-900">{submissionStatus.errors}</p>
              <p className="text-xs text-orange-600">Failed submissions</p>
            </div>
          </div>

          {/* Configuration Status */}
          <div className={`border rounded-lg p-4 ${
            configurationStatus.isConfigured 
              ? 'bg-green-50 border-green-200' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 ${
              configurationStatus.isConfigured ? 'text-green-800' : 'text-yellow-800'
            }`}>
              {configurationStatus.isConfigured ? '✅ Configuration Valid' : '⚠️ Configuration Issues'}
            </h3>
            <div className="text-sm space-y-1">
              <p className={configurationStatus.isConfigured ? 'text-green-700' : 'text-yellow-700'}>
                <strong>Google Script URL:</strong> {configurationStatus.googleScriptUrl ? 'Configured' : 'Not configured'}
              </p>
              <p className={configurationStatus.hasValidUrl ? 'text-green-700' : 'text-yellow-700'}>
                <strong>URL Format:</strong> {configurationStatus.hasValidUrl ? 'Valid' : 'Invalid format'}
              </p>
            </div>
          </div>
        </div>

        {/* Google Sheets Access */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            📋 Google Sheets Data Access
          </h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              🔗 Direct Access to Your Data
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white rounded-lg p-3 border">
                <div>
                  <h4 className="font-semibold text-gray-800">Step 1 Data Sheet</h4>
                  <p className="text-sm text-gray-600">Postal codes and location information</p>
                </div>
                <a
                  href="https://docs.google.com/spreadsheets/d/1vC_aOEOsk4eu9BmDbaZSUYUqfBnrZCwQ6kqodLztl3s/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  Open Sheet
                </a>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg p-3 border">
                <div>
                  <h4 className="font-semibold text-gray-800">Step 2 Data Sheet</h4>
                  <p className="text-sm text-gray-600">Contact information and names</p>
                </div>
                <a
                  href="https://docs.google.com/spreadsheets/d/1vC_aOEOsk4eu9BmDbaZSUYUqfBnrZCwQ6kqodLztl3s/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                >
                  Open Sheet
                </a>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg p-3 border">
                <div>
                  <h4 className="font-semibold text-gray-800">Step 3 Data Sheet</h4>
                  <p className="text-sm text-gray-600">Professional questionnaire responses</p>
                </div>
                <a
                  href="https://docs.google.com/spreadsheets/d/1vC_aOEOsk4eu9BmDbaZSUYUqfBnrZCwQ6kqodLztl3s/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors"
                >
                  Open Sheet
                </a>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              ⚠️ Setup Required
            </h3>
            <p className="text-yellow-700 mb-3">
              If connectivity breaks. To access your data, you need to set up Google Sheets integration:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-yellow-800 text-sm">
              <li>Create a Google Sheets document with three sheets: "Step1", "Step2", "Step3"</li>
              <li>Deploy the Google Apps Script from <code>google-apps-script.js</code></li>
              <li>Update the Google Sheets URL in <code>lib/googleSheets.ts</code></li>
              <li>Test the integration with a sample submission</li>
            </ol>
          </div>
        </div>

        {/* Data Collection Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            📈 Data Collection Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📊 What Data is Collected
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Basic Information</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Session ID (unique identifier)</li>
                    <li>• Postal Code (FSA - first 3 characters)</li>
                    <li>• Full Name</li>
                    <li>• Email Address</li>
                    <li>• Device Information</li>
                    <li>• Timestamp</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Professional Profile</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Industry & Education Level</li>
                    <li>• Job Function & Company Size</li>
                    <li>• Years of Experience</li>
                    <li>• Networking Goals & Preferences</li>
                    <li>• Work Environment & Collaboration Style</li>
                    <li>• Time Preferences & Availability</li>
                    <li>• Professional Interests & Challenges</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🔧 Technical Implementation
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>Primary:</strong> Google Sheets API integration</li>
                  <li>• <strong>Fallback:</strong> Local storage for offline persistence</li>
                  <li>• <strong>Real-time:</strong> Data appears immediately in sheets</li>
                  <li>• <strong>Session Tracking:</strong> Unique IDs for user journeys</li>
                  <li>• <strong>Action Tracking:</strong> Continue/Skip/Finish actions</li>
                  <li>• <strong>Device Info:</strong> Browser and device details</li>
                  <li>• <strong>Validation:</strong> Client and server-side validation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics and Insights */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            📊 Analytics & Insights
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📈 Key Metrics to Track
              </h3>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-800">Completion Rates</h4>
                  <p className="text-sm text-blue-700">Step 1 → Step 2 → Step 3 → Step 4 conversion rates</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <h4 className="font-semibold text-green-800">User Engagement</h4>
                  <p className="text-sm text-green-700">Session duration, skip patterns, device usage</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <h4 className="font-semibold text-purple-800">Data Quality</h4>
                  <p className="text-sm text-purple-700">Submission success rates, validation errors</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <h4 className="font-semibold text-orange-800">Geographic Distribution</h4>
                  <p className="text-sm text-orange-700">FSA-based user distribution and patterns</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🎯 Business Insights
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-800">Professional Demographics</h4>
                  <p className="text-sm text-gray-700">Industry distribution, job levels, company sizes</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-800">Networking Preferences</h4>
                  <p className="text-sm text-gray-700">Goals, connection types, collaboration styles</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-800">Matchmaking Data</h4>
                  <p className="text-sm text-gray-700">Compatibility factors for networking events</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-800">User Behavior</h4>
                  <p className="text-sm text-gray-700">Skip patterns, completion preferences, engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🚀 Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://pathfinders.kervinapps.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pathfinders-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors"
            >
              Test the Funnel
            </a>
            <a
              href="https://docs.google.com/spreadsheets/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              Open Google Sheets
            </a>
            <a
              href="https://script.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-700 transition-colors"
            >
              Google Apps Script
            </a>
            <button
              onClick={checkAllStatus}
              disabled={isCheckingStatus}
              className="bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isCheckingStatus ? 'Checking...' : 'Refresh Status'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}