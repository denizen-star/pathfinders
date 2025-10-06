// Simple password protection for admin page
const ADMIN_PASSWORD = '1ndustr1M@tch'

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function getAuthToken(): string {
  // Simple token generation for session management
  return btoa(`${ADMIN_PASSWORD}_${Date.now()}`)
}

export function verifyAuthToken(token: string): boolean {
  try {
    const decoded = atob(token)
    const [password, timestamp] = decoded.split('_')
    
    // Check if password is correct
    if (password !== ADMIN_PASSWORD) return false
    
    // Check if token is not older than 24 hours
    const tokenTime = parseInt(timestamp)
    const now = Date.now()
    const hours24 = 24 * 60 * 60 * 1000
    
    return (now - tokenTime) < hours24
  } catch {
    return false
  }
}
