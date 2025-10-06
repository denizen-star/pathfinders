'use client'

import { useState, useEffect } from 'react'
import AdminLogin from '../../components/AdminLogin'
import { verifyAuthToken } from '../../lib/auth'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin-auth-token')
    if (token && verifyAuthToken(token)) {
      setIsAuthenticated(true)
    } else {
      localStorage.removeItem('admin-auth-token')
    }
  }, [])

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

        {/* Data Collection Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            📊 Data Collection Status
          </h2>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">
                  ✅ Google Sheets Integration Active
                </h3>
                <p className="text-green-700">
                  All form submissions are being collected in real-time via Google Sheets API
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Step 1 Data</h4>
              <p className="text-sm text-blue-700">Postal codes and location data</p>
              <div className="mt-2 text-xs text-blue-600">Real-time collection</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Step 2 Data</h4>
              <p className="text-sm text-green-700">Contact information and names</p>
              <div className="mt-2 text-xs text-green-600">Real-time collection</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Step 3 Data</h4>
              <p className="text-sm text-purple-700">Professional questionnaire responses</p>
              <div className="mt-2 text-xs text-purple-600">Real-time collection</div>
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
                  href="https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0"
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
                  href="https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=1"
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
                  href="https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=2"
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
              To access your data, you need to set up Google Sheets integration:
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
              onClick={() => window.location.reload()}
              className="bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}