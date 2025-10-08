# Pathfinders Data Sampling

This folder contains sample CSV files and the generator script used to create realistic test data for the Pathfinders networking form.

## 📁 Contents

### CSV Files (Sample Data)
- **pathfinders_step1_submissions.csv** (1000 submissions)
  - Location information with Canadian postal codes (FSA)
  - Device information as JSON string
  
- **pathfinders_step2_submissions.csv** (900 submissions)
  - Contact information (name, email)
  - 90% of Step 1 users who continued
  - Includes Action column (Continue/Skip)
  
- **pathfinders_step3_submissions.csv** (725 submissions)
  - Complete professional profiles with all 15 questions
  - 80.6% of Step 2 users who completed the form
  - Overall completion rate: 72.5% (Step 1 → Step 3)

### Generator Script
- **generate_sample_data.py**
  - Python script that generates all three CSV files
  - Requires: `faker` library (`pip3 install faker`)
  
## 🎯 Features

### 1. Production-Ready Column Order
All CSV files match the exact column order used in Google Sheets production:

**Step 1:** `Timestamp, Session ID, Postal Code, Device Info`

**Step 2:** `Timestamp, Session ID, Postal Code, Name, Email, Device Info, Action`

**Step 3:** `Timestamp, Session ID, Postal Code, Name, Email, Industry, Education Level, Job Function Level, Company Size, Primary Goal, Connection Types, Work Environment, Collaboration Preferences, Networking Window, Day of Week, Experience, Communication, Interests, Challenges, Additional Info, Device Info, Action`

### 2. Device Info as JSON
Device information is stored as a single JSON string column containing:
```json
{
  "userAgent": "Mozilla/5.0...",
  "platform": "MacIntel",
  "language": "en-US",
  "screenResolution": "1920x1080",
  "timezone": "America/Toronto",
  "timestamp": "2025-10-06T14:17:45.060Z"
}
```

### 3. Consistent Session Tracking
- Every user journey maintains the same Session ID across all steps
- All Step 2 sessions exist in Step 1
- All Step 3 sessions exist in both Step 2 and Step 1
- Enables complete user journey analysis and funnel tracking

## 🚀 Usage

### Regenerate Sample Data

```bash
cd "Data Sampling"
python3 generate_sample_data.py
```

This will create/overwrite the three CSV files with new randomized data.

### Requirements

```bash
pip3 install faker
```

## 📊 Data Characteristics

### Geographic Distribution
- **80+ Canadian FSA codes** from major cities:
  - Toronto (M5V, M6J, M4Y, etc.)
  - Vancouver (V5K, V6B, V6C, etc.)
  - Montreal (H2X, H3A, H3B, etc.)
  - Ottawa (K1A, K1N, K1P, etc.)
  - Calgary (T2G, T2P, T3A, etc.)
  - Edmonton (T5J, T5K, T6E, etc.)

### Professional Data
- **Weighted distributions** favor common scenarios:
  - Industries: Tech, Business, Finance, Healthcare, Education (more common)
  - Education: Graduate and Bachelor's degrees (most common)
  - Job Levels: Bell curve centered on mid-level roles
  - Experience: Realistic correlation with job level

### Behavioral Patterns
- **Multi-select fields** respect maximum limits
- **Optional fields** (Additional Info) are 70% empty
- **Timestamps** spread across 30 days during business hours (8 AM - 10 PM)
- **Time progression** realistic across steps (5 seconds to 5 minutes between steps)

### Device Mix
- Desktop: Mac, Windows, Linux
- Mobile: iPhone, Android
- Tablet: iPad
- Various browsers: Chrome, Safari, Firefox
- Different screen resolutions and timezones

## 📈 Completion Funnel

```
Step 1 (Location)     1000 users (100%)
       ↓
Step 2 (Contact)       900 users ( 90%)
       ↓
Step 3 (Profile)       725 users ( 81% of Step 2, 73% overall)
```

## 🔍 Use Cases

- **Testing data visualization dashboards**
- **Load testing import/export functionality**
- **Analyzing user behavior patterns**
- **Training matching algorithms**
- **Creating demo presentations**
- **Validating session tracking logic**
- **Testing conversion funnel analytics**

## 📝 Notes

- All data is randomly generated using the Faker library
- Names, emails, and other personal information are completely fictional
- Data distributions are designed to be realistic but not based on actual user data
- Seed values are set for reproducibility (same output each time)

## 🔄 Version History

- **v1.0** - Initial version with proper column order, JSON device info, and session tracking
