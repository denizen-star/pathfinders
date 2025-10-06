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

        {/* Data Collection Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
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
                  ✅ Data Collection Active
                </h3>
                <p className="text-green-700">
                  All form submissions are being collected via Netlify Forms
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📋 How to Access Your Data
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ol className="list-decimal list-inside space-y-2 text-blue-800">
                  <li>
                    <strong>Go to Netlify Dashboard:</strong> Visit{' '}
                    <a 
                      href="https://app.netlify.com/projects/pathfinders-funnel" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      https://app.netlify.com/projects/pathfinders-funnel
                    </a>
                  </li>
                  <li>
                    <strong>Navigate to Forms:</strong> Click "Forms" in the left sidebar
                  </li>
                  <li>
                    <strong>View Submissions:</strong> Click on "pathfinders-submission" form
                  </li>
                  <li>
                    <strong>Export Data:</strong> Download submissions as CSV or view individual entries
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📈 What Data is Collected
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Basic Information</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Session ID</li>
                    <li>• Postal Code (FSA)</li>
                    <li>• Full Name</li>
                    <li>• Email Address</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Questionnaire Data</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Industry & Education</li>
                    <li>• Job Function & Company Size</li>
                    <li>• Networking Goals & Preferences</li>
                    <li>• Work Environment & Collaboration</li>
                    <li>• Time Preferences</li>
                    <li>• Professional Challenges</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🔧 Technical Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Form Name:</strong> pathfinders-submission</li>
                  <li>• <strong>Data Collection:</strong> Automatic via Netlify Forms</li>
                  <li>• <strong>Storage:</strong> Secure Netlify infrastructure</li>
                  <li>• <strong>Export Format:</strong> CSV download available</li>
                  <li>• <strong>Real-time:</strong> Data appears immediately after submission</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🚀 Quick Actions
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://app.netlify.com/projects/pathfinders-funnel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pathfinders-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors"
                >
                  Open Netlify Dashboard
                </a>
                <a
                  href="https://pathfinders.kervinapps.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pathfinders-orange text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition-colors"
                >
                  Test the Funnel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}