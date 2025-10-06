# Pathfinders - Professional Networking Data Collection Funnel

A bulletproof, mobile-first data collection funnel designed for professional networking experiments. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

Pathfinders is an experimental networking platform that collects professional data through a 4-step funnel:
1. **Canadian Postal Code Collection** - Geographic targeting
2. **Name & Email Collection** - Contact information
3. **15-Question Professional Questionnaire** - Detailed networking preferences
4. **Summary & Thank You** - Data review and next steps

## 🚀 Features

### Core Functionality
- **Mobile-First Design** - Optimized for QR code access on phones
- **Progressive Data Collection** - Step-by-step form with progress tracking
- **Real-time Analytics** - Comprehensive admin dashboard with conversion tracking
- **Session Management** - Unique session IDs with device tracking
- **Data Export** - CSV export functionality for analysis

### Security & Privacy
- **Password-Protected Admin** - Secure dashboard access
- **Privacy-First Approach** - No marketing data usage pledge
- **Session Tracking** - Complete user journey analytics
- **Device Information** - Platform, browser, and location data

### Advanced Analytics
- **Step-by-Step Tracking** - Individual question progress monitoring
- **Conversion Rate Analysis** - Drop-off point identification
- **Device Analytics** - Platform and browser insights
- **Geographic Distribution** - Postal code analysis

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: JSON files (local development)
- **Authentication**: Custom token-based system
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
pathfinders/
├── app/
│   ├── admin/              # Password-protected admin dashboard
│   ├── api/                # API endpoints for data collection
│   │   ├── step1/          # Postal code collection
│   │   ├── step2/          # Name/email collection
│   │   ├── step3-progress/ # Question-by-question tracking
│   │   └── submit/         # Final submission
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main funnel application
├── components/
│   ├── AdminLogin.tsx      # Authentication component
│   ├── ProgressBar.tsx     # Step progress indicator
│   ├── Step1.tsx           # Postal code collection
│   ├── Step2.tsx           # Name/email collection
│   ├── Step3.tsx           # 15-question questionnaire
│   └── Step4.tsx           # Summary and thank you
├── data-collection/        # JSON data storage
│   ├── step1/              # Step 1 submissions
│   ├── step2/              # Step 2 submissions
│   ├── step3/              # Final submissions
│   └── step3-progress/     # Question progress tracking
├── lib/
│   ├── auth.ts             # Authentication utilities
│   └── deviceInfo.ts       # Device information collection
└── sxp_dropdown_options.json # Question options configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/denizen-star/pathfinders.git
   cd pathfinders
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create data directories**
   ```bash
   mkdir -p data-collection/step1 data-collection/step2 data-collection/step3 data-collection/step3-progress
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Main funnel: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin
   - Admin password: `1ndustr1M@tch`

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Set custom domain**
   - In Vercel dashboard, go to your project settings
   - Add custom domain: `pathfinders.kervinapps.com`
   - Configure DNS as instructed by Vercel

3. **Environment Variables** (if needed)
   - No environment variables required for basic functionality
   - Admin password is hardcoded for security

### Alternative: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `out` folder to Netlify
   - Configure custom domain in Netlify settings

## 📊 Admin Dashboard

Access the admin dashboard at `/admin` with password: `1ndustr1M@tch`

### Features
- **Analytics Overview** - Conversion rates and completion statistics
- **Step-by-Step Data** - Individual step submissions and progress
- **Export Functionality** - CSV download of all collected data
- **Real-time Tracking** - Live updates of user progress
- **Device Analytics** - Platform and browser insights

### Data Collection Points
1. **Step 1 Data** - Postal codes with device information
2. **Step 2 Data** - Names and emails with session tracking
3. **Step 3 Progress** - Individual question responses
4. **Final Submissions** - Complete questionnaire data

## 🔒 Security Features

- **Password Protection** - Encrypted admin access
- **Session Management** - 24-hour token expiration
- **Data Validation** - Input sanitization and validation
- **Privacy Compliance** - No marketing data usage
- **Secure Storage** - Local JSON file system

## 📱 Mobile Optimization

- **Responsive Design** - Works on all screen sizes
- **Touch-Friendly** - Large buttons and touch targets
- **Fast Loading** - Optimized for mobile networks
- **QR Code Ready** - Designed for easy QR code access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support or questions:
- Email: hello@pathfinders.com
- GitHub Issues: [Create an issue](https://github.com/denizen-star/pathfinders/issues)

## 🎯 Roadmap

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Email automation for matches
- [ ] Advanced matching algorithms
- [ ] User dashboard for participants
- [ ] Integration with calendar systems
- [ ] Analytics dashboard improvements

---

**Built with ❤️ for professional networking experiments**