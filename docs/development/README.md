# Development Documentation

This directory contains technical documentation for developers working on Pathfinders.

## 📁 Available Documentation

### [DESIGN_IMPLEMENTATION_GUIDE.md](./DESIGN_IMPLEMENTATION_GUIDE.md)
**Comprehensive design and implementation guide** covering:
- UI/UX design principles
- Component architecture
- Styling guidelines (Tailwind CSS)
- Color palette and branding
- Responsive design patterns
- Accessibility standards

**Use this for**: Understanding design system and implementing new features

---

### [FORM_QUESTIONS_DOCUMENTATION.md](./FORM_QUESTIONS_DOCUMENTATION.md)
**Complete questionnaire documentation** covering:
- All 15 professional questions
- Question types and validation
- Multi-select limits and behavior
- Dropdown options and configuration
- Data structure and schema
- Answer validation rules

**Use this for**: Modifying questionnaire or adding new questions

---

## 🛠️ Development Quick Start

### Setup Development Environment
```bash
# 1. Clone repository
git clone https://github.com/denizen-star/pathfinders.git
cd pathfinders

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
open http://localhost:3000
```

### Project Structure
```
pathfinders/
├── app/                  # Next.js App Router
│   ├── api/             # API routes
│   ├── admin/           # Admin dashboard
│   ├── page.tsx         # Main application
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Step0.tsx        # Landing page
│   ├── Step1.tsx        # Location step
│   ├── Step2.tsx        # Contact step
│   ├── Step3.tsx        # Questionnaire
│   └── Step4.tsx        # Confirmation
├── lib/                 # Utility functions
│   ├── auth.ts          # Authentication
│   ├── dataSubmission.ts # Data handling
│   └── deviceInfo.ts    # Device detection
├── public/              # Static assets
└── docs/                # Documentation
```

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--cyan-400: #22D3EE     /* Primary accent */
--blue-600: #2563EB     /* Secondary accent */

/* Neutral Colors */
--black: #000000        /* Background */
--white: #FFFFFF        /* Text */
--gray-800: #1F2937     /* Secondary background */

/* Status Colors */
--green-500: #10B981    /* Success */
--red-500: #EF4444      /* Error */
--orange-500: #F97316   /* Warning */
```

### Typography
- **Font**: System font stack (optimized for performance)
- **Headings**: Bold, large sizes for hierarchy
- **Body**: Base size 16px, line-height 1.5

### Spacing
- Uses Tailwind spacing scale (4px base)
- Consistent padding and margins
- Responsive breakpoints: sm, md, lg, xl

---

## 📦 Component Architecture

### Step Components
Each step is a self-contained component with:
- Local state management
- Form validation
- Data submission
- Error handling
- Progress tracking

### Shared Components
- **Form Inputs**: Reusable styled inputs
- **Buttons**: Primary, secondary, muted variants
- **Progress Indicators**: Visual feedback
- **Dropdowns**: Searchable and multi-select

### Component Best Practices
1. Keep components focused and single-purpose
2. Use TypeScript for type safety
3. Implement proper error boundaries
4. Follow React hooks best practices
5. Optimize for performance

---

## 🔧 Development Workflow

### Making Changes
```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Make changes and test
npm run dev

# 3. Run linter
npm run lint

# 4. Build for production
npm run build

# 5. Commit changes
git add .
git commit -m "feat: your feature description"

# 6. Push and create PR
git push origin feature/your-feature-name
```

### Code Style
- **Linting**: ESLint configured for Next.js
- **Formatting**: Follow existing code style
- **TypeScript**: Full type coverage required
- **Comments**: Document complex logic

### Testing
- Manual testing on all steps
- Cross-browser testing (Chrome, Safari, Firefox)
- Mobile responsive testing
- Form validation testing

---

## 📊 Data Flow

### User Journey
```
Step 0 (Landing) → Step 1 (FSA) → Step 2 (Contact) → Step 3 (Profile) → Step 4 (Confirmation)
```

### Data Submission
```
Component → dataSubmission.ts → Google Sheets API → Storage
                              → Local Storage (fallback)
```

### State Management
- Local component state (useState)
- Form data passed between steps
- Session persistence via localStorage
- Device info captured on mount

---

## 🔍 Key Files Reference

### Critical Files
| File | Purpose | Edit Frequency |
|------|---------|----------------|
| `components/Step3.tsx` | Main questionnaire | Often |
| `lib/dataSubmission.ts` | Data handling | Rarely |
| `app/globals.css` | Styles | Occasionally |
| `sxp_dropdown_options.json` | Dropdown data | Rarely |

### Configuration Files
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind customization
- `tsconfig.json` - TypeScript settings
- `netlify.toml` - Deployment configuration

---

## 🐛 Debugging

### Common Issues

**Issue**: Build fails
- Check Node.js version (v20.x required)
- Clear `.next` folder and rebuild
- Verify all imports are correct

**Issue**: Styles not applying
- Check Tailwind classes are valid
- Ensure globals.css is imported
- Clear browser cache

**Issue**: Data not submitting
- Check Google Sheets API configuration
- Verify network connectivity
- Check browser console for errors

### Debug Tools
```bash
# Check TypeScript errors
npx tsc --noEmit

# Analyze bundle size
npm run build -- --analyze

# Check for unused dependencies
npx depcheck
```

---

## 📚 Additional Resources

### External Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Internal Links
- [Release Notes](../releases/)
- [Deployment Guide](../deployment/DEPLOYMENT.md)
- [User Guides](../guides/)

---

## 🤝 Contributing

### Pull Request Process
1. Create descriptive branch name
2. Write clear commit messages
3. Update documentation if needed
4. Test thoroughly
5. Request review from team
6. Address feedback
7. Merge when approved

### Code Review Checklist
- [ ] Code follows style guidelines
- [ ] TypeScript types are correct
- [ ] No linter errors
- [ ] Tested on multiple devices
- [ ] Documentation updated
- [ ] Performance impact minimal

---

**Last Updated**: October 10, 2025  
**Current Version**: v4.0.0  
**Development Status**: Active ✅

