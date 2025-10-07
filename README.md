# Pathfinders Networking Funnel v1.0.0

🚀 **Production-Ready Professional Networking Data Collection Platform**

A sophisticated 4-step data collection funnel built with Next.js 14, TypeScript, and modern web technologies. Designed for mobile-first professional networking data collection with enterprise-grade reliability.

## 🎯 Overview

**Live Application**: [pathfinders.kervinapps.com](https://pathfinders.kervinapps.com)

This production application is a comprehensive networking data collection system designed to gather professional demographic information through an intuitive, mobile-optimized funnel experience.

### Core Features
- ✅ **4-Step Data Collection Funnel**
- ✅ **Mobile-First Responsive Design** 
- ✅ **Real-time Google Sheets Integration**
- ✅ **Session Management & Data Persistence**
- ✅ **Admin Dashboard with Analytics**
- ✅ **Skip Functionality & User Flexibility**
- ✅ **Production Security & Performance**
- ✅ **Canadian Postal Code Validation**

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom Pathfinders branding
- **Data Layer**: Google Sheets API + Google Apps Script
- **Deployment**: Netlify with automatic CI/CD
- **Security**: bcrypt authentication, security headers
- **Performance**: SWC minification, compression, caching

### Data Flow
```
User Input → Validation → Google Sheets → Admin Dashboard
     ↓
Local Storage (Fallback) → Session Management
```

## 📊 Data Collection Structure

### Step 1: Postal Code Collection
- **Data**: Session ID, Canadian Postal Code (FSA), Device Information
- **Purpose**: Geographic targeting and session initialization
- **Validation**: Canadian postal code format validation

### Step 2: Contact Information  
- **Data**: Session ID, Postal Code, Full Name, Email Address, Device Info
- **Purpose**: Contact information for networking invitations
- **Features**: Email validation, privacy commitments, skip option

### Step 3: Professional Questionnaire
- **Data**: Complete demographic and professional profile
- **Questions**: 15 professionally relevant questions including:
  - Industry and education level
  - Job function and company size
  - Networking goals and preferences
  - Work environment and collaboration style
  - Time availability and challenges
- **Features**: Multi-select validation, progress tracking, skip option

### Step 4: Confirmation & Thank You
- **Purpose**: Data summary, thank you message, next steps
- **Features**: Privacy promise, networking event invitation details

## 🔧 Production Configuration

### Environment Setup
```bash
# Production Environment Variables
NODE_ENV=production
NEXT_PUBLIC_APP_VERSION=1.0.0

# Google Sheets Integration (Server-side only - SECURE)
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**⚠️ Security Note**: The Google Apps Script URL is now stored as a server-side environment variable and is no longer exposed to the client. This prevents unauthorized access to your Google Sheets endpoint.

### Security Features
- **Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Authentication**: Protected admin access with bcrypt
- **Data Protection**: No sensitive data exposure, secure transmission
- **Input Validation**: Comprehensive client and server-side validation
- **API Security**: Google Sheets integration secured behind server-side API routes
- **Environment Variables**: Sensitive credentials stored server-side only

### Performance Optimizations
- **Compression**: Gzip compression enabled
- **Caching**: Strategic caching for static assets
- **Minification**: SWC minification for optimal bundle size
- **Code Splitting**: Automatic code splitting for faster loads

## 🚀 Deployment

### Netlify (Production)
- **URL**: [pathfinders.kervinapps.com](https://pathfinders.kervinapps.com)
- **Build**: Automatic deployment on git push
- **Environment**: Node.js 20, production optimizations
- **CDN**: Global edge network for fast loading

### Local Development
```bash
git clone https://github.com/denizen-star/pathfinders.git
cd pathfinders
npm install
npm run dev
```

## 📱 Mobile Optimization

- **QR Code Access**: Designed for QR code scanning
- **Touch-Friendly**: Optimized button sizes and spacing
- **Responsive**: Seamless experience across all devices
- **Performance**: Fast loading on mobile networks

## 🔐 Admin Dashboard

**Access**: `/admin` | **Password**: `1ndustr1M@tch`

### Features
- Real-time data viewing
- Export capabilities
- Session tracking
- Completion analytics
- Data integrity monitoring

## 📈 Analytics & Monitoring

### Data Collection Metrics
- Step completion rates
- Drop-off analysis
- Session duration tracking
- Device and browser analytics
- Geographic distribution

### Google Sheets Integration
- **Real-time Updates**: Data appears instantly in Google Sheets
- **Three Separate Sheets**: Step 1 Data, Step 2 Data, Step 3 Data
- **Action Tracking**: Continue/Skip/Finish actions recorded
- **Fallback Storage**: Local storage backup for reliability

## 🛡️ Privacy & Compliance

### Privacy Commitments
- ✅ No marketing data collection
- ✅ Clear data usage explanations
- ✅ Secure data transmission
- ✅ Local storage fallback
- ✅ Admin access protection

### Data Handling
- **Purpose**: Professional networking experiment only
- **Retention**: Data stored securely in Google Sheets
- **Access**: Limited to authorized admin users
- **Sharing**: No third-party data sharing

## 📋 Project Structure

```
pathfinders/
├── app/                          # Next.js 14 App Router
│   ├── admin/                   # Protected admin dashboard
│   ├── globals.css              # Global Tailwind styles
│   ├── layout.tsx               # Root layout with SEO
│   └── page.tsx                 # Main funnel application
├── components/                  # React components
│   ├── ProgressBar.tsx          # Progress indicator
│   ├── Step1.tsx                # Postal code collection
│   ├── Step2.tsx                # Contact information
│   ├── Step3.tsx                # Professional questionnaire
│   └── Step4.tsx                # Confirmation & thank you
├── lib/                         # Utility libraries
│   ├── deviceInfo.ts            # Device & session management
│   ├── auth.ts                  # Authentication utilities
│   └── googleSheets.ts          # Google Sheets integration
├── public/                      # Static assets
│   └── Pathfinders-logo.jpeg    # Company branding
├── sxp_dropdown_options.json    # Question configuration
├── google-apps-script.js        # Google Apps Script code
├── netlify.toml                 # Netlify configuration
└── next.config.js               # Next.js production config
```

## 🔄 Version History

### v1.0.0 (Current - Production)
- ✅ Complete 4-step funnel implementation
- ✅ Google Sheets real-time integration
- ✅ Mobile-optimized responsive design
- ✅ Admin dashboard with analytics
- ✅ Skip functionality and user flexibility
- ✅ Production security and performance
- ✅ Comprehensive data validation
- ✅ Session management and persistence

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/denizen-star/pathfinders/issues)
- **Documentation**: This README
- **Live App**: [pathfinders.kervinapps.com](https://pathfinders.kervinapps.com)

---

**Built with ❤️ by denizen-star for Pathfinders Professional Networking**