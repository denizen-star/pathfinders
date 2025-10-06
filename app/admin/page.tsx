'use client'

import { useState, useEffect } from 'react'
import AdminLogin from '@/components/AdminLogin'
import { verifyAuthToken } from '@/lib/auth'

interface Submission {
  id: string
  postalCode: string
  name: string
  email: string
  industry: string
  educationLevel: string
  jobFunctionLevel: string
  companySize: string
  primaryGoal: string
  connectionTypes: string[]
  workEnvironment: string
  collaborationPreferences: string[]
  networkingWindow: string
  dayOfWeek: string
  additionalInfo: string
  submittedAt: string
}

interface Step1Data {
  sessionId: string
  postalCode: string
  deviceInfo: any
  submittedAt: string
  ipAddress: string
}

interface Step2Data {
  sessionId: string
  name: string
  email: string
  postalCode: string
  deviceInfo: any
  submittedAt: string
  ipAddress: string
}

interface Step3ProgressData {
  sessionId: string
  questionNumber: number
  questionId: string
  questionLabel: string
  answer: any
  submittedAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [step1Data, setStep1Data] = useState<Step1Data[]>([])
  const [step2Data, setStep2Data] = useState<Step2Data[]>([])
  const [step3Progress, setStep3Progress] = useState<Step3ProgressData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem('admin-auth-token')
    if (token && verifyAuthToken(token)) {
      setIsAuthenticated(true)
      fetchAllData()
    } else {
      // Clear invalid token
      localStorage.removeItem('admin-auth-token')
      setLoading(false)
    }
  }, [])

  const handleLogin = (token: string) => {
    setIsAuthenticated(true)
    fetchAllData()
  }

  const fetchAllData = async () => {
    try {
      setLoading(true)
      
      // Fetch all data in parallel
      const [submissionsRes, step1Res, step2Res, step3ProgressRes] = await Promise.all([
        fetch('/api/submit'),
        fetch('/api/admin/step1'),
        fetch('/api/admin/step2'),
        fetch('/api/admin/step3-progress')
      ])
      
      const [submissionsData, step1Data, step2Data, step3ProgressData] = await Promise.all([
        submissionsRes.json(),
        step1Res.json(),
        step2Res.json(),
        step3ProgressRes.json()
      ])
      
      setSubmissions(submissionsData.submissions || [])
      setStep1Data(step1Data.data || [])
      setStep2Data(step2Data.data || [])
      setStep3Progress(step3ProgressData.data || [])
      
    } catch (err) {
      setError('Failed to load data')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (submissions.length === 0) return

    const headers = [
      'ID', 'Name', 'Email', 'Postal Code', 'Industry', 'Education Level',
      'Job Function Level', 'Company Size', 'Primary Goal', 'Connection Types',
      'Work Environment', 'Collaboration Preferences', 'Networking Window',
      'Day of Week', 'Additional Info', 'Submitted At'
    ]

    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        sub.id,
        `"${sub.name}"`,
        sub.email,
        sub.postalCode,
        `"${sub.industry}"`,
        `"${sub.educationLevel}"`,
        `"${sub.jobFunctionLevel}"`,
        sub.companySize,
        `"${sub.primaryGoal}"`,
        `"${Array.isArray(sub.connectionTypes) ? sub.connectionTypes.join('; ') : sub.connectionTypes}"`,
        `"${sub.workEnvironment}"`,
        `"${Array.isArray(sub.collaborationPreferences) ? sub.collaborationPreferences.join('; ') : sub.collaborationPreferences}"`,
        `"${sub.networkingWindow}"`,
        `"${sub.dayOfWeek}"`,
        `"${sub.additionalInfo || ''}"`,
        sub.submittedAt
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pathfinders-submissions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const calculateAnalytics = () => {
    const totalSessions = new Set(step1Data.map(s => s.sessionId)).size
    const completedStep1 = step1Data.length
    const completedStep2 = step2Data.length
    const completedStep3 = submissions.length
    
    // Calculate drop-off rates
    const step1ToStep2Rate = completedStep1 > 0 ? ((completedStep2 / completedStep1) * 100).toFixed(1) : '0'
    const step2ToStep3Rate = completedStep2 > 0 ? ((completedStep3 / completedStep2) * 100).toFixed(1) : '0'
    const overallCompletionRate = completedStep1 > 0 ? ((completedStep3 / completedStep1) * 100).toFixed(1) : '0'
    
    // Question completion analysis
    const questionCompletion = {}
    step3Progress.forEach(progress => {
      if (!questionCompletion[progress.questionNumber]) {
        questionCompletion[progress.questionNumber] = 0
      }
      questionCompletion[progress.questionNumber]++
    })
    
    return {
      totalSessions,
      completedStep1,
      completedStep2,
      completedStep3,
      step1ToStep2Rate,
      step2ToStep3Rate,
      overallCompletionRate,
      questionCompletion
    }
  }

  const analytics = calculateAnalytics()

  const handleLogout = () => {
    localStorage.removeItem('admin-auth-token')
    setIsAuthenticated(false)
    setSubmissions([])
    setStep1Data([])
    setStep2Data([])
    setStep3Progress([])
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pathfinders-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchSubmissions}
            className="bg-pathfinders-blue text-white px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-pathfinders-blue mb-2">
                Pathfinders Data Collection - Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Complete analytics and data tracking
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={fetchAllData}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Refresh All Data
              </button>
              <button
                onClick={exportToCSV}
                disabled={submissions.length === 0}
                className="bg-pathfinders-blue text-white px-4 py-2 rounded-md hover:bg-blue-800 disabled:bg-gray-400"
              >
                Export CSV
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800">Total Sessions</h3>
              <p className="text-2xl font-bold text-blue-900">{analytics.totalSessions}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">Step 1 Completed</h3>
              <p className="text-2xl font-bold text-green-900">{analytics.completedStep1}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-yellow-800">Step 2 Completed</h3>
              <p className="text-2xl font-bold text-yellow-900">{analytics.completedStep2}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-800">Step 3 Completed</h3>
              <p className="text-2xl font-bold text-purple-900">{analytics.completedStep3}</p>
            </div>
          </div>

          {/* Conversion Rates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-700">Step 1 → Step 2</h3>
              <p className="text-xl font-bold text-gray-900">{analytics.step1ToStep2Rate}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-700">Step 2 → Step 3</h3>
              <p className="text-xl font-bold text-gray-900">{analytics.step2ToStep3Rate}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-700">Overall Completion</h3>
              <p className="text-xl font-bold text-gray-900">{analytics.overallCompletionRate}%</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', count: submissions.length },
                { id: 'step1', label: 'Step 1 Data', count: step1Data.length },
                { id: 'step2', label: 'Step 2 Data', count: step2Data.length },
                { id: 'step3-progress', label: 'Step 3 Progress', count: step3Progress.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-pathfinders-blue text-pathfinders-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              {submissions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No submissions yet</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Submissions will appear here once users complete the form
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Postal Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Industry
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Goal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {submissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {submission.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {submission.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {submission.postalCode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {submission.industry}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {submission.primaryGoal}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'step1' && (
            <div>
              {step1Data.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No Step 1 data yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Session ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Postal Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Device
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {step1Data.map((data, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                            {data.sessionId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {data.postalCode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {data.deviceInfo?.platform || 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(data.submittedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'step2' && (
            <div>
              {step2Data.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No Step 2 data yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Session ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Postal Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {step2Data.map((data, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                            {data.sessionId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {data.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {data.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {data.postalCode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(data.submittedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'step3-progress' && (
            <div>
              {step3Progress.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No Step 3 progress data yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Session ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Question
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Answer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {step3Progress.map((data, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                            {data.sessionId}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="font-medium">Q{data.questionNumber}</div>
                            <div className="text-xs text-gray-500">{data.questionLabel}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {Array.isArray(data.answer) ? data.answer.join(', ') : String(data.answer || '')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(data.submittedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
