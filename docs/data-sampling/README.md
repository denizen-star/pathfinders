# Data Sampling

This directory contains sample data and data generation scripts for testing and development.

## 📁 Contents

### Data Generation Script
**[generate_sample_data.py](./generate_sample_data.py)**
- Python script to generate realistic sample submissions
- Creates test data for all three steps
- Useful for testing data visualization and analytics

### Sample Data Files

#### [pathfinders_step1_submissions.csv](./pathfinders_step1_submissions.csv)
Sample Step 1 submissions containing:
- Session IDs
- Postal codes (FSA)
- Timestamps
- Device information

#### [pathfinders_step2_submissions.csv](./pathfinders_step2_submissions.csv)
Sample Step 2 submissions containing:
- Names
- Email addresses
- Contact information
- Session IDs linking to Step 1

#### [pathfinders_step3_submissions.csv](./pathfinders_step3_submissions.csv)
Sample Step 3 submissions containing:
- Professional background
- Networking goals
- Preferences
- Complete profile data

## 🎯 Usage

### Generating Sample Data

```bash
# Run the Python script to generate new sample data
python3 generate_sample_data.py

# This will create/update the CSV files with fresh sample data
```

### Importing to Google Sheets

1. Open your Pathfinders Google Sheets
2. Import each CSV file to appropriate sheet
3. Use for testing analytics and dashboards

### Use Cases

- **Testing**: Verify data submission flow
- **Analytics**: Test data visualization
- **Demos**: Show stakeholders example data
- **Development**: Local testing without real submissions

## ⚠️ Important Notes

### Privacy
- This is **sample/fake data** only
- Do not use real user information
- Safe to share and commit to repository

### Data Structure
Sample data matches the production schema:
- Same column names
- Same data types
- Realistic value ranges
- Valid Canadian FSA codes

## 🔧 Customization

### Modify Sample Data

Edit `generate_sample_data.py` to:
- Change number of samples generated
- Adjust data distributions
- Add new fields
- Modify value ranges

### Data Characteristics

Current sample data includes:
- 50-100 submissions per step
- Mix of industries and roles
- Diverse networking goals
- Realistic FSA codes (Toronto area focus)
- Varied preferences and availability

---

## 📊 Sample Data Statistics

| Step | Records | Fields | File Size |
|------|---------|--------|-----------|
| Step 1 | ~75 | 5 | ~15 KB |
| Step 2 | ~65 | 7 | ~18 KB |
| Step 3 | ~50 | 20+ | ~45 KB |

---

**Last Updated**: October 10, 2025  
**Purpose**: Testing and Development  
**Status**: Active ✅
