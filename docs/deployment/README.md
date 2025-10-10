# Deployment Documentation

This directory contains all documentation related to deploying and maintaining Pathfinders in production.

## 📁 Available Documentation

### [DEPLOYMENT.md](./DEPLOYMENT.md)
**Primary deployment guide** covering:
- Initial setup and configuration
- Netlify deployment process
- Environment variables
- Domain configuration
- SSL/HTTPS setup
- Continuous deployment

**Use this for**: First-time deployment or major infrastructure changes

---

### [DEPLOYMENT_SUMMARY_v2.0.md](./DEPLOYMENT_SUMMARY_v2.0.md)
**Quick reference guide** for v2.0.0 deployment covering:
- Fast deployment steps
- Pre-deployment checklist
- Post-deployment verification
- Common issues and solutions

**Use this for**: Quick deployments and refreshers

---

### [PRODUCTION.md](./PRODUCTION.md)
**Production environment documentation** covering:
- Production configuration
- Performance optimization
- Monitoring and analytics
- Security best practices
- Maintenance procedures
- Troubleshooting

**Use this for**: Production operations and maintenance

---

## 🚀 Quick Start Deployment

### Prerequisites
```bash
- Node.js v20.x or higher
- npm v10.x or higher
- Netlify CLI installed globally
- GitHub repository access
- Netlify account
```

### Deploy to Production
```bash
# 1. Install dependencies
npm install

# 2. Build production version
npm run build

# 3. Deploy to Netlify
npm run deploy
```

### Verify Deployment
1. Visit https://pathfinders.kervinapps.com
2. Test all 4 steps of onboarding
3. Verify Google Sheets integration
4. Check mobile responsiveness
5. Review analytics dashboard

---

## 🔧 Deployment Workflows

### Standard Deployment (Main Branch)
```mermaid
Code Push → GitHub → Netlify Auto-Deploy → Production
```

### Manual Deployment
```mermaid
Local Build → npm run build → npm run deploy → Production
```

---

## 🌐 Environments

### Production
- **URL**: https://pathfinders.kervinapps.com
- **Branch**: `main`
- **Auto-deploy**: Enabled
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`

### Development
- **URL**: http://localhost:3000
- **Command**: `npm run dev`
- **Hot Reload**: Enabled

---

## 📋 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Linter errors resolved
- [ ] Build successful locally
- [ ] Environment variables configured
- [ ] Release notes updated
- [ ] Version number bumped
- [ ] Git committed and pushed
- [ ] Stakeholders notified

## 📊 Post-Deployment Verification

- [ ] Site loads successfully
- [ ] All pages render correctly
- [ ] Forms submit properly
- [ ] Data flows to Google Sheets
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Analytics tracking
- [ ] Performance metrics acceptable

---

## 🛠️ Deployment Commands

### Build Commands
```bash
# Development build
npm run dev

# Production build
npm run build

# Production build with environment
NODE_ENV=production npm run build

# Start production server locally
npm run start
```

### Deployment Commands
```bash
# Deploy to Netlify production
npm run deploy

# Deploy preview (branch deploy)
netlify deploy

# Check build status
netlify status
```

### Troubleshooting Commands
```bash
# Clear build cache
rm -rf .next node_modules
npm install
npm run build

# Check logs
netlify logs

# View site info
netlify sites:list
```

---

## 🔐 Security & Credentials

### Required Secrets
- `GOOGLE_SHEETS_API_KEY` - For data submission
- `ADMIN_PASSWORD` - For admin dashboard access
- `NETLIFY_AUTH_TOKEN` - For automated deployments

### Managing Secrets
1. Store in Netlify Environment Variables
2. Never commit to repository
3. Rotate regularly
4. Use different values for dev/prod

---

## 📈 Monitoring & Alerts

### Key Metrics to Monitor
- **Uptime**: Target 99.9%
- **Response Time**: < 2 seconds
- **Error Rate**: < 1%
- **Build Time**: < 3 minutes

### Monitoring Tools
- Netlify Analytics (built-in)
- Google Sheets submission logs
- Browser console monitoring
- User feedback channels

---

## 🆘 Troubleshooting

### Build Failures
- Check Node.js version compatibility
- Clear cache and reinstall dependencies
- Review build logs in Netlify dashboard

### Runtime Errors
- Check browser console
- Review Netlify function logs
- Verify environment variables

### Performance Issues
- Review Core Web Vitals
- Check image optimization
- Analyze bundle size

---

## 📞 Support

For deployment issues:
- **Technical**: Development team
- **Infrastructure**: DevOps team  
- **Emergency**: hello@pathfinders.com

---

**Last Updated**: October 10, 2025  
**Current Version**: v4.0.0  
**Deployment Status**: Production ✅

