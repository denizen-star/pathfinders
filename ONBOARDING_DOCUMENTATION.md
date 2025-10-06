# Pathfinders Onboarding Documentation

**Version**: 2.0.0  
**Last Updated**: January 2025  
**Status**: Production Ready

## 📋 Table of Contents

1. [User Path - Complete Onboarding Journey](#1-user-path---complete-onboarding-journey)
2. [Admin Path - Data Management & Analytics](#2-admin-path---data-management--analytics)
3. [Managing the App Path - System Administration](#3-managing-the-app-path---system-administration)
4. [Installation Guide - Cross-Platform Setup](#4-installation-guide---cross-platform-setup)

---

## 1. User Path - Complete Onboarding Journey

### 🎯 Overview
The Pathfinders onboarding process is a 4-step journey designed to collect professional networking data and create meaningful connections.

### 📱 Step-by-Step User Experience

#### **Step 1: Location & Introduction**
- **Purpose**: Collect geographic data and introduce the platform
- **Data Collected**: 
  - Postal Code (FSA - first 3 characters)
  - Session ID (unique identifier)
  - Device information
- **Validation**: Canadian postal code format (letter-number-letter)
- **User Action**: Enter postal code and click "Continue"
- **Data Storage**: Real-time submission to Google Sheets (Step1 sheet)

#### **Step 2: Contact Information**
- **Purpose**: Collect basic contact details for follow-up
- **Data Collected**:
  - Full Name
  - Email Address
- **Validation**: Email format validation, required fields
- **User Options**: 
  - Continue to detailed questionnaire
  - Skip to summary (if they prefer minimal data collection)
- **Data Storage**: Real-time submission to Google Sheets (Step2 sheet)

#### **Step 3: Professional Profile (15 Questions)**
- **Purpose**: Comprehensive professional assessment for matchmaking
- **Structure**: 3 categories with 5 questions each
- **Categories**:
  1. **Professional Background & Experience** (5 questions)
     - Industry selection
     - Education level
     - Job function level
     - Company size (slider: 1-10 to 500+)
     - Years of experience (slider: 0-2 to 16+ years)
  
  2. **Networking Goals & Needs** (4 questions)
     - Primary networking goals (multi-select, max 5)
     - Connection types sought (multi-select, max 5)
     - Professional interests (multi-select, max 3)
     - Current challenges (multi-select, max 3)
  
  3. **Environmental & Style Preferences** (6 questions)
     - Work environment preferences (multi-select, max 2)
     - Collaboration preferences (multi-select, max 3)
     - Communication style (multi-select, max 2)
     - Networking time preferences
     - Day of week preferences
     - Additional information (optional text area)

- **User Options**:
  - Complete all questions and continue
  - Skip to summary (partial data collection)
- **Data Storage**: Real-time submission to Google Sheets (Step3 sheet)

#### **Step 4: Confirmation & Next Steps**
- **Purpose**: Confirm submission and set expectations
- **Features**:
  - Complete data summary review
  - Next steps explanation
  - Privacy promise
  - Contact information
- **User Experience**: Read-only confirmation page

### 🔄 Data Flow & Persistence

#### **Real-time Data Collection**
- **Primary**: Google Sheets API integration
- **Fallback**: Local storage for offline persistence
- **Session Management**: Unique session IDs for user journey tracking
- **Action Tracking**: Continue/Skip/Finish actions recorded

#### **Data Validation**
- **Client-side**: Real-time validation with helpful error messages
- **Server-side**: Google Sheets API validation
- **Error Handling**: Graceful fallback to local storage

#### **User Experience Features**
- **Progress Tracking**: Visual progress bar (4 steps)
- **Skip Functionality**: Users can skip Steps 2 & 3
- **Session Persistence**: Data persists across browser sessions
- **Mobile Optimization**: Responsive design for all devices

---

## 2. Admin Path - Data Management & Analytics

### 🔐 Admin Access
- **URL**: `https://pathfinders.kervinapps.com/admin`
- **Password**: `1ndustr1M@tch`
- **Session Duration**: 24 hours
- **Security**: Token-based authentication

### 📊 Admin Dashboard Features

#### **Real-time Status Monitoring**
- **Google Sheets Connection**: Live connection testing
- **Submission Statistics**: Total and recent submission counts
- **Error Tracking**: Failed submission monitoring
- **Configuration Validation**: System setup verification

#### **Data Access & Management**
- **Direct Google Sheets Links**: One-click access to all data sheets
- **Step 1 Data**: Postal codes and location information
- **Step 2 Data**: Contact information and names
- **Step 3 Data**: Professional questionnaire responses
- **Export Capabilities**: CSV download from Google Sheets

#### **Analytics & Insights**
- **Completion Rates**: Step-by-step conversion tracking
- **User Engagement**: Session duration and skip patterns
- **Data Quality**: Submission success rates and validation errors
- **Geographic Distribution**: FSA-based user distribution
- **Professional Demographics**: Industry and role analysis
- **Networking Preferences**: Goals and connection types
- **Matchmaking Data**: Compatibility factors for events

### 🔧 Admin Tools

#### **Status Checking**
- **Refresh Status**: Manual connection testing
- **Real-time Updates**: Live status monitoring
- **Error Reporting**: Specific error messages and troubleshooting
- **Configuration Health**: System setup validation

#### **Data Management**
- **Google Sheets Integration**: Direct access to all data
- **Local Storage Backup**: Fallback data access
- **Session Tracking**: User journey analysis
- **Export Functions**: Data download capabilities

---

## 3. Managing the App Path - System Administration

### 🚀 Deployment Management

#### **Production Deployment**
- **Platform**: Netlify (Serverless)
- **Domain**: `pathfinders.kervinapps.com`
- **SSL**: Automatic HTTPS
- **CDN**: Global content delivery
- **Auto-deployment**: Git push triggers automatic deployment

#### **Environment Configuration**
- **Node.js Version**: 20.x
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Environment Variables**: 
  - `NODE_ENV=production`
  - `NEXT_PUBLIC_APP_VERSION=2.0.0`

### 🔧 System Administration

#### **Google Sheets Integration**
- **Setup Required**: Google Apps Script deployment
- **Script Location**: `google-apps-script.js`
- **Configuration**: Update URL in `lib/googleSheets.ts`
- **Testing**: Verify connection with sample submission

#### **Data Collection Management**
- **Primary Storage**: Google Sheets (3 sheets: Step1, Step2, Step3)
- **Backup Storage**: Local storage fallback
- **Session Management**: Unique session IDs
- **Error Handling**: Graceful fallback mechanisms

#### **Performance Monitoring**
- **Build Status**: Automatic build verification
- **Error Tracking**: Real-time error monitoring
- **Performance Metrics**: Core Web Vitals tracking
- **User Analytics**: Completion rates and engagement

### 🛠️ Maintenance Tasks

#### **Daily**
- Monitor error logs
- Check data collection status
- Review user feedback

#### **Weekly**
- Analyze completion rates
- Review data quality
- Check performance metrics
- Monitor Google Sheets integration

#### **Monthly**
- Update dependencies
- Review user feedback
- Optimize performance
- Analyze user demographics

#### **Quarterly**
- Security updates
- Feature enhancements
- Performance optimization
- User experience improvements

---

## 4. Installation Guide - Cross-Platform Setup

### 🖥️ Development Environment Setup

#### **Prerequisites**
- **Node.js**: Version 20.x or higher
- **npm**: Package manager
- **Git**: Version control
- **Code Editor**: VS Code recommended

#### **Installation Steps**

1. **Clone Repository**
   ```bash
   git clone https://github.com/denizen-star/pathfinders.git
   cd pathfinders
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   - **Main App**: `http://localhost:3000`
   - **Admin Dashboard**: `http://localhost:3000/admin`

### 🚀 Production Deployment

#### **Netlify Deployment (Recommended)**

1. **Connect to Netlify**
   ```bash
   npm install -g netlify-cli
   netlify login
   ```

2. **Deploy to Production**
   ```bash
   netlify deploy --prod
   ```

3. **Configure Custom Domain**
   - Add custom domain in Netlify dashboard
   - Configure DNS settings
   - Enable SSL certificate

#### **Alternative Deployment Options**

##### **Vercel Deployment**
```bash
npm install -g vercel
vercel --prod
```

##### **AWS Amplify**
```bash
npm install -g @aws-amplify/cli
amplify init
amplify publish
```

##### **Google Cloud Platform**
```bash
gcloud app deploy
```

##### **Azure Static Web Apps**
```bash
az staticwebapp create
```

### 🔧 Google Sheets Integration Setup

#### **Step 1: Create Google Sheets Document**
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet
3. Add three sheets: "Step1", "Step2", "Step3"
4. Set up headers for each sheet

#### **Step 2: Deploy Google Apps Script**
1. Go to [Google Apps Script](https://script.google.com)
2. Create new project
3. Copy code from `google-apps-script.js`
4. Deploy as web app
5. Set permissions to "Anyone"

#### **Step 3: Configure Application**
1. Update `lib/googleSheets.ts` with your Google Apps Script URL
2. Test connection with sample submission
3. Verify data appears in Google Sheets

### 📱 Mobile Development

#### **React Native (Future)**
```bash
npx react-native init PathfindersApp
cd PathfindersApp
npm install
```

#### **Flutter (Future)**
```bash
flutter create pathfinders_app
cd pathfinders_app
flutter run
```

#### **Progressive Web App (PWA)**
- Already configured with Next.js
- Offline functionality via service workers
- Mobile-optimized responsive design

### 🔒 Security Configuration

#### **Environment Variables**
```bash
# Production
NODE_ENV=production
NEXT_PUBLIC_APP_VERSION=2.0.0
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your_script_url

# Development
NODE_ENV=development
NEXT_PUBLIC_APP_VERSION=2.0.0-dev
```

#### **Security Headers**
- **X-Frame-Options**: DENY
- **X-Content-Type-Options**: nosniff
- **Referrer-Policy**: origin-when-cross-origin
- **HTTPS**: Automatic SSL certificates

### 🧪 Testing & Quality Assurance

#### **Local Testing**
```bash
npm run build
npm run start
```

#### **Linting & Code Quality**
```bash
npm run lint
```

#### **Type Checking**
```bash
npx tsc --noEmit
```

#### **End-to-End Testing**
1. Test complete user flow
2. Verify data collection
3. Test admin dashboard access
4. Validate Google Sheets integration

### 📊 Monitoring & Analytics

#### **Performance Monitoring**
- **Core Web Vitals**: Automatic tracking
- **Page Load Times**: Real-time monitoring
- **Error Rates**: Automatic error tracking
- **User Engagement**: Session analytics

#### **Data Analytics**
- **Completion Rates**: Step-by-step conversion
- **User Demographics**: Professional profiles
- **Geographic Distribution**: FSA-based analysis
- **Networking Preferences**: Goals and interests

### 🔄 Backup & Recovery

#### **Code Backup**
- **Git Repository**: GitHub automatic backup
- **Version Control**: Git history and branches
- **Release Tags**: Production version tracking

#### **Data Backup**
- **Google Sheets**: Automatic Google backup
- **Local Storage**: Browser-based fallback
- **Export Functions**: Manual data export

#### **Disaster Recovery**
- **Code Recovery**: Git repository restoration
- **Data Recovery**: Google Sheets restoration
- **Configuration Recovery**: Environment variable backup

---

## 📞 Support & Troubleshooting

### 🆘 Common Issues

#### **Google Sheets Not Updating**
- Verify Google Apps Script URL is correct
- Check Google Apps Script deployment status
- Ensure proper sheet headers are set up
- Test with manual submission

#### **Admin Dashboard Access Issues**
- Verify password: `1ndustr1M@tch`
- Clear browser cache and localStorage
- Check browser console for errors
- Ensure proper authentication flow

#### **Mobile Display Issues**
- Test on various mobile devices
- Check responsive design breakpoints
- Verify touch target sizes
- Test QR code scanning flow

#### **Performance Issues**
- Monitor bundle size
- Check for memory leaks
- Optimize image loading
- Review caching strategy

### 📞 Support Contacts

- **Technical Issues**: Development team
- **Data Access**: Admin dashboard users
- **User Support**: Pathfinders team
- **Emergency**: Direct contact with deployment team

---

## 🎯 Success Metrics

### 📈 Key Performance Indicators

#### **User Experience**
- **Completion Rate**: Target 80%+ overall completion
- **Step Conversion**: Step 1 → Step 2 → Step 3 → Step 4
- **Session Duration**: Average 5-10 minutes
- **Mobile Usage**: 70%+ mobile completion rate

#### **Data Quality**
- **Submission Success**: 95%+ successful data submissions
- **Data Completeness**: 90%+ complete professional profiles
- **Validation Errors**: <2% validation error rate
- **Geographic Coverage**: FSA distribution across target areas

#### **Technical Performance**
- **Page Load Times**: <3 seconds
- **Error Rates**: <1% error rate
- **Uptime**: 99.9% availability
- **Google Sheets API**: <2 second response time

---

**Documentation Version**: 2.0.0  
**Last Updated**: January 2025  
**Status**: Production Ready ✅
