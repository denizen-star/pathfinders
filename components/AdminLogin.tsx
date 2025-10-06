'use client'

import { useState } from 'react'
import { verifyPassword, getAuthToken } from '../lib/auth'

interface AdminLoginProps {
  onLogin: (token: string) => void
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (verifyPassword(password)) {
        const token = getAuthToken()
        localStorage.setItem('admin-auth-token', token)
        onLogin(token)
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pathfinders-blue mb-2">
              Pathfinders Admin
            </h1>
            <p className="text-gray-600">
              Enter password to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Enter admin password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pathfinders-blue focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pathfinders-blue text-white py-3 px-4 rounded-md font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              This is a secure admin area for data collection management
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
