// Production-safe admin page - shows message instead of admin interface
export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pathfinders-blue mb-2">
              Pathfinders Admin
            </h1>
            <p className="text-gray-600">
              Admin access is only available in development environment
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              🔒 Security Notice
            </h3>
            <p className="text-blue-700 text-sm">
              For security reasons, the admin dashboard is only accessible during local development. 
              All data collection functionality remains fully operational.
            </p>
          </div>
          
          <div className="mt-6">
            <a
              href="/"
              className="bg-pathfinders-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors inline-block"
            >
              Return to Main App
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
