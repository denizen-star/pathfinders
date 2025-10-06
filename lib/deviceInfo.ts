// Device information collection utility
export interface DeviceInfo {
  userAgent: string
  platform: string
  language: string
  screenResolution: string
  timezone: string
  timestamp: string
}

export function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return {
      userAgent: 'Server-side',
      platform: 'Unknown',
      language: 'en',
      screenResolution: 'Unknown',
      timezone: 'UTC',
      timestamp: new Date().toISOString()
    }
  }

  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform || 'Unknown',
    language: navigator.language || 'en',
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString()
  }
}

export function generateSessionId(): string {
  return Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36)
}
