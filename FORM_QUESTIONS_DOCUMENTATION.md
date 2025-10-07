# Pathfinders Form Questions Documentation

This document provides a comprehensive overview of all questions and possible answers in the Pathfinders networking form.

## Form Structure

The Pathfinders form consists of 3 main steps plus a summary:

- **Step 1**: Location Information
- **Step 2**: Contact Information  
- **Step 3**: Professional Profile (15 questions across 3 categories)
- **Step 4**: Summary & Confirmation

---

## Step 1: Location Information

### Question 1: Postal Code
- **Type**: Text Input
- **Label**: "Enter 3 first digits of your Postal Code (FSA)"
- **Placeholder**: "e.g., M6J"
- **Validation**: Canadian postal code FSA format (3 characters: letter-number-letter)
- **Required**: Yes
- **Example**: M6J 2Y7 → M6J

---

## Step 2: Contact Information

### Question 1: Full Name
- **Type**: Text Input
- **Label**: "Full Name*"
- **Placeholder**: "Enter your full name"
- **Required**: Yes

### Question 2: Email Address
- **Type**: Email Input
- **Label**: "Email Address*"
- **Placeholder**: "Enter your email address"
- **Validation**: Standard email format
- **Required**: Yes

---

## Step 3: Professional Profile

### Category 1: Professional Background & Experience (1/3)

#### Question 1: Industry
- **Type**: Searchable Dropdown (Single Select)
- **Label**: "What industry do you work in?"
- **Placeholder**: "Search and select your industry..."
- **Required**: Yes
- **Options** (21 total):
  - Arts
  - Business
  - Civil Service
  - Creative Arts
  - Education
  - Executive
  - Finance
  - Government
  - Healthcare
  - Law
  - Marketing
  - Medicine
  - NGO
  - Professional
  - Public Sector
  - Retail
  - Science
  - Service
  - Student
  - Tech
  - Trade

#### Question 2: Education Level
- **Type**: Single Select Pills
- **Label**: "What is your education level?"
- **Required**: Yes
- **Options** (5 total):
  - Graduate
  - Bachelor's
  - Some College
  - Professional
  - High School

#### Question 3: Job Function Level
- **Type**: Single Select Pills
- **Label**: "What is your job function level?"
- **Required**: Yes
- **Options** (9 total):
  - Junior IC
  - Mid-level IC
  - Senior IC
  - Manager
  - Senior Manager
  - Director
  - VP
  - C-Suite
  - Founder

#### Question 4: Company Size
- **Type**: Slider
- **Label**: "What size company do you work for?"
- **Required**: Yes
- **Options** (5 levels):
  - 1-10 employees
  - 11-50 employees
  - 50-200 employees
  - 200-500 employees
  - 500+ employees

#### Question 5: Professional Experience
- **Type**: Slider
- **Label**: "How many years of professional experience do you have?"
- **Required**: Yes
- **Options** (5 levels):
  - 0-2 years
  - 3-5 years
  - 6-10 years
  - 11-15 years
  - 16+ years

### Category 2: Networking Goals & Needs (2/3)

#### Question 6: Primary Goal
- **Type**: Searchable Dropdown (Multi Select)
- **Label**: "What is your primary goal for networking?"
- **Max Selections**: 5
- **Required**: Yes
- **Options** (19 total):
  - Build Community
  - Business Development
  - Career Advancement
  - Career Transition
  - Collaborate on Projects
  - Creative Collaboration
  - Cultural Integration
  - Establish Network
  - Find Co-founder
  - Find Mentor
  - Gain Clients
  - Investment Opportunities
  - Job Opportunities
  - Market Expansion
  - Professional Development
  - Secure Funding
  - Skill Development
  - Strategic Partnerships
  - Thought Leadership

#### Question 7: Connection Types
- **Type**: Searchable Dropdown (Multi Select)
- **Label**: "What types of connections are you looking for? (Select all that apply)"
- **Max Selections**: 5
- **Required**: Yes
- **Options** (13 total):
  - C-Suite Exec
  - Career Coach
  - Co-founder
  - Community Leader
  - Creative Professional
  - Domain Expert
  - Industry Influencer
  - Investor/VC
  - Manager/Leader
  - Mentor
  - Peer Professional
  - Potential Client
  - Strategic Partner
  - Thought Leader

#### Question 8: Professional Interests
- **Type**: Searchable Dropdown (Multi Select)
- **Label**: "What are your main professional interests? (Select up to 3)"
- **Max Selections**: 3
- **Required**: Yes
- **Options** (12 total):
  - Technology Innovation
  - Business Strategy
  - Creative Arts
  - Data Science
  - Sustainability
  - Leadership
  - Entrepreneurship
  - Research
  - Design
  - Finance
  - Healthcare
  - Education
  - Social Impact

#### Question 9: Professional Challenges
- **Type**: Multi Select Pills
- **Label**: "What is your biggest professional challenge right now?"
- **Max Selections**: 3
- **Required**: Yes
- **Options** (8 total):
  - Finding the right opportunities
  - Building a network
  - Skill development
  - Work-life balance
  - Industry transition
  - Leadership growth
  - Finding mentors
  - Building confidence

### Category 3: Environmental & Style Preferences (3/3)

#### Question 10: Work Environment
- **Type**: Multi Select Pills
- **Label**: "What type of work environment do you prefer?"
- **Max Selections**: 2
- **Required**: Yes
- **Options** (7 total):
  - Collaborative Space
  - Creative Space
  - Hybrid
  - Private Office
  - Quiet/Focused
  - Social/Dynamic
  - Structured Environment

#### Question 11: Collaboration Preferences
- **Type**: Searchable Dropdown (Multi Select)
- **Label**: "What collaboration preferences do you have? (Select all that apply)"
- **Max Selections**: 3
- **Required**: Yes
- **Options** (10 total):
  - Collaborative Workshops
  - Creative Brainstorms
  - Cultural Exchange Sessions
  - Dynamic Sessions
  - Flexible Collaboration
  - Impromptu Brainstorms
  - Planned Collaboration
  - Social Collaboration
  - Strategic Sessions
  - Structured Meetings

#### Question 12: Communication Style
- **Type**: Multi Select Pills
- **Label**: "What is your preferred communication style? (Select up to 2)"
- **Max Selections**: 2
- **Required**: Yes
- **Options** (5 total):
  - Direct
  - Diplomatic
  - Analytical
  - Creative
  - Supportive

#### Question 13: Networking Time Window
- **Type**: Multi Select Pills
- **Label**: "What time window works best for networking?"
- **Required**: Yes
- **Options** (6 total):
  - Early Morning
  - Lunch
  - Afternoon
  - Post-Work
  - Evening
  - Late Evening

#### Question 14: Networking Day of Week
- **Type**: Multi Select Pills
- **Label**: "What day of the week works best for networking?"
- **Required**: Yes
- **Options** (5 total):
  - Monday
  - Tuesday
  - Wednesday
  - Thursday
  - Friday

#### Question 15: Additional Information
- **Type**: Textarea
- **Label**: "Any additional information you'd like to share? (Optional)"
- **Placeholder**: "Tell us anything else that might help us find great matches for you..."
- **Required**: No
- **Max Length**: No limit specified

---

## Form Features

### Input Types Used:
1. **Text Input**: For name and postal code
2. **Email Input**: For email address
3. **Single Select Pills**: For single-choice questions with ≤10 options
4. **Searchable Dropdown**: For single-choice questions with >10 options
5. **Multi Select Pills**: For multi-choice questions with ≤10 options
6. **Searchable Multi-Select Dropdown**: For multi-choice questions with >10 options
7. **Slider**: For range-based selections (company size, experience)
8. **Textarea**: For open-ended responses

### Mobile Optimizations:
- **Viewport Meta Tag**: Prevents zoom on mobile devices
- **16px Font Size**: On mobile inputs to prevent iOS zoom
- **Touch-Friendly**: Large touch targets and smooth interactions
- **Responsive Design**: Adapts to all screen sizes

### Validation Rules:
- **Postal Code**: Must be 3 characters (letter-number-letter)
- **Email**: Standard email format validation
- **Required Fields**: Name, email, and all Step 3 questions
- **Max Selections**: Enforced for multi-select questions
- **Character Limits**: None specified for text inputs

### Data Collection:
- **Session Tracking**: Each submission gets a unique session ID
- **Device Information**: Collected for analytics
- **Timestamp**: Recorded for each step
- **Google Sheets Integration**: Data submitted to Google Sheets
- **Local Storage Backup**: Fallback if Google Sheets fails

---

## Summary

The Pathfinders form collects comprehensive professional networking data through:
- **17 total questions** across 3 steps
- **5 different input types** optimized for user experience
- **Mobile-first design** with zoom prevention
- **Searchable dropdowns** for questions with many options
- **Progressive disclosure** through categorized questions
- **Flexible multi-select** options with clear limits

This data is used to create meaningful professional connections through intelligent matching algorithms based on location, professional background, networking goals, and personal preferences.
