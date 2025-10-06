# Deployment Guide - Pathfinders

This guide will help you deploy your Pathfinders funnel to `pathfinders.kervinapps.com` using Vercel.

## 🚀 Quick Deploy to Vercel

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Pathfinders funnel"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/denizen-star/pathfinders.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Follow the prompts**:
   - Link to existing project? No
   - Project name: `pathfinders`
   - Directory: `./` (current directory)
   - Override settings? No

### Step 3: Configure Custom Domain

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your `pathfinders` project

2. **Add Custom Domain**:
   - Go to Settings → Domains
   - Add domain: `pathfinders.kervinapps.com`
   - Follow DNS configuration instructions

3. **Configure DNS** (at your domain provider):
   ```
   Type: CNAME
   Name: pathfinders
   Value: cname.vercel-dns.com
   ```

### Step 4: Verify Deployment

1. **Test the funnel**: Visit `https://pathfinders.kervinapps.com`
2. **Test admin access**: Visit `https://pathfinders.kervinapps.com/admin`
   - Password: `1ndustr1M@tch`

## 🔄 Automatic Deployments

Once connected to GitHub, Vercel will automatically deploy:
- **Main branch pushes** → Production deployment
- **Pull requests** → Preview deployments

## 📊 Monitoring & Analytics

### Vercel Analytics
- Built-in performance monitoring
- Real-time user analytics
- Core Web Vitals tracking

### Application Analytics
- Admin dashboard at `/admin`
- Step-by-step conversion tracking
- Device and browser analytics
- Geographic distribution data

## 🛠️ Environment Configuration

### Production Settings
- **Framework**: Next.js
- **Node.js Version**: 18.x
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### No Environment Variables Required
The application runs without additional environment variables. All configuration is built-in.

## 🔒 Security Considerations

### Admin Access
- Password-protected admin dashboard
- 24-hour session tokens
- Automatic logout on token expiration

### Data Storage
- JSON files stored in Vercel's serverless functions
- No database required
- Automatic backups through Git

### HTTPS
- Automatic SSL certificates via Vercel
- Secure data transmission
- HSTS headers enabled

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**:
   ```bash
   # Check build locally
   npm run build
   
   # Fix any TypeScript errors
   npm run lint
   ```

2. **Domain Not Working**:
   - Check DNS propagation (can take 24-48 hours)
   - Verify CNAME record points to `cname.vercel-dns.com`
   - Check Vercel domain settings

3. **Admin Access Issues**:
   - Clear browser cache and localStorage
   - Verify password: `1ndustr1M@tch`
   - Check console for JavaScript errors

### Performance Optimization

1. **Image Optimization**:
   - Use Next.js Image component
   - Optimize file sizes
   - Enable WebP conversion

2. **Code Splitting**:
   - Automatic with Next.js
   - Lazy load components when needed

## 📈 Scaling Considerations

### Current Limitations
- JSON file storage (suitable for <1000 submissions)
- Serverless function timeouts (30 seconds max)

### Future Upgrades
- **Database Integration**: PostgreSQL or MongoDB
- **File Storage**: AWS S3 or Vercel Blob
- **Caching**: Redis for session management
- **CDN**: Global edge caching

## 🔄 Updates & Maintenance

### Regular Updates
1. **Code Changes**: Push to GitHub → Automatic deployment
2. **Dependencies**: Update package.json → Vercel rebuilds
3. **Domain Changes**: Update in Vercel dashboard

### Backup Strategy
- **Code**: Git repository (GitHub)
- **Data**: Export via admin dashboard
- **Configuration**: Version controlled in repository

## 📞 Support

- **Vercel Issues**: [Vercel Support](https://vercel.com/support)
- **Application Issues**: [GitHub Issues](https://github.com/denizen-star/pathfinders/issues)
- **Domain Issues**: Contact your domain provider

---

**Your Pathfinders funnel is now live at `https://pathfinders.kervinapps.com`! 🎉**
