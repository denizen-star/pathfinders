#!/usr/bin/env python3
"""
Generate realistic sample CSV files for Pathfinders Submissions
Creates 3 CSV files with proper:
1. Column order matching Google Sheets production format
2. Device Info as JSON string (single column)
3. Consistent session tracking across all steps

Usage:
    python3 generate_sample_data.py

Output:
    - pathfinders_step1_submissions.csv (1000 submissions)
    - pathfinders_step2_submissions.csv (~900 submissions, 90% of Step 1)
    - pathfinders_step3_submissions.csv (~725 submissions, 80% of Step 2)
"""

import csv
import random
import string
from datetime import datetime, timedelta
from faker import Faker
import json

# Initialize Faker for realistic data
fake = Faker(['en_CA', 'en_US'])
Faker.seed(42)
random.seed(42)

# Constants
NUM_SUBMISSIONS = 1000

# Canadian Postal Code FSAs (First 3 characters) - Sample from major cities
CANADIAN_FSA = [
    # Toronto
    'M5V', 'M6J', 'M4Y', 'M5A', 'M5B', 'M5C', 'M5E', 'M5G', 'M5H', 'M5J',
    'M5K', 'M5L', 'M5N', 'M5P', 'M5R', 'M5S', 'M5T', 'M5W', 'M5X', 'M6G',
    'M6H', 'M6K', 'M6P', 'M6R', 'M6S', 'M4E', 'M4K', 'M4L', 'M4M', 'M4N',
    # Vancouver
    'V5K', 'V6B', 'V6C', 'V6E', 'V6G', 'V6H', 'V6J', 'V6K', 'V6L', 'V6M',
    'V6N', 'V6P', 'V6R', 'V6S', 'V6T', 'V6Z', 'V7Y',
    # Montreal
    'H2X', 'H2Y', 'H2Z', 'H3A', 'H3B', 'H3C', 'H3G', 'H3H', 'H3J', 'H3K',
    'H3L', 'H3N', 'H3S', 'H3T', 'H3V', 'H3W', 'H3X', 'H3Y', 'H3Z', 'H4A',
    # Ottawa
    'K1A', 'K1N', 'K1P', 'K1R', 'K1S', 'K1Y', 'K1Z', 'K2P',
    # Calgary
    'T2G', 'T2P', 'T2R', 'T2S', 'T3A', 'T3B', 'T3C', 'T3E', 'T3G', 'T3H',
    # Edmonton
    'T5J', 'T5K', 'T5N', 'T5P', 'T6E', 'T6G', 'T6H', 'T6J', 'T6K',
    # Mississauga
    'L5B', 'L5G', 'L5H', 'L5J', 'L5K', 'L5L', 'L5M', 'L5N', 'L5R', 'L5T'
]

# Form options from documentation
INDUSTRIES = [
    'Arts', 'Business', 'Civil Service', 'Creative Arts', 'Education',
    'Executive', 'Finance', 'Government', 'Healthcare', 'Law',
    'Marketing', 'Medicine', 'NGO', 'Professional', 'Public Sector',
    'Retail', 'Science', 'Service', 'Student', 'Tech', 'Trade'
]

EDUCATION_LEVELS = ['Graduate', "Bachelor's", 'Some College', 'Professional', 'High School']

JOB_FUNCTION_LEVELS = [
    'Junior IC', 'Mid-level IC', 'Senior IC', 'Manager', 'Senior Manager',
    'Director', 'VP', 'C-Suite', 'Founder'
]

COMPANY_SIZES = ['1-10', '11-50', '50-200', '200-500', '500+']

EXPERIENCE_LEVELS = ['0-2 years', '3-5 years', '6-10 years', '11-15 years', '16+ years']

PRIMARY_GOALS = [
    'Build Community', 'Business Development', 'Career Advancement', 'Career Transition',
    'Collaborate on Projects', 'Creative Collaboration', 'Cultural Integration',
    'Establish Network', 'Find Co-founder', 'Find Mentor', 'Gain Clients',
    'Investment Opportunities', 'Job Opportunities', 'Market Expansion',
    'Professional Development', 'Secure Funding', 'Skill Development',
    'Strategic Partnerships', 'Thought Leadership'
]

CONNECTION_TYPES = [
    'C-Suite Exec', 'Career Coach', 'Co-founder', 'Community Leader',
    'Creative Professional', 'Domain Expert', 'Industry Influencer',
    'Investor/VC', 'Manager/Leader', 'Mentor', 'Peer Professional',
    'Potential Client', 'Strategic Partner', 'Thought Leader'
]

PROFESSIONAL_INTERESTS = [
    'Technology Innovation', 'Business Strategy', 'Creative Arts', 'Data Science',
    'Sustainability', 'Leadership', 'Entrepreneurship', 'Research', 'Design',
    'Finance', 'Healthcare', 'Education', 'Social Impact'
]

PROFESSIONAL_CHALLENGES = [
    'Finding the right opportunities', 'Building a network', 'Skill development',
    'Work-life balance', 'Industry transition', 'Leadership growth',
    'Finding mentors', 'Building confidence'
]

WORK_ENVIRONMENTS = [
    'Collaborative Space', 'Creative Space', 'Hybrid', 'Private Office',
    'Quiet/Focused', 'Social/Dynamic', 'Structured Environment'
]

COLLABORATION_PREFERENCES = [
    'Collaborative Workshops', 'Creative Brainstorms', 'Cultural Exchange Sessions',
    'Dynamic Sessions', 'Flexible Collaboration', 'Impromptu Brainstorms',
    'Planned Collaboration', 'Social Collaboration', 'Strategic Sessions', 'Structured Meetings'
]

COMMUNICATION_STYLES = ['Direct', 'Diplomatic', 'Analytical', 'Creative', 'Supportive']

NETWORKING_WINDOWS = ['Early Morning', 'Lunch', 'Afternoon', 'Post-Work', 'Evening', 'Late Evening']

DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

PLATFORMS = ['MacIntel', 'Win32', 'Linux x86_64', 'iPhone', 'iPad', 'Android']

BROWSERS = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
]

SCREEN_RESOLUTIONS = ['1920x1080', '2560x1440', '1366x768', '1440x900', '1536x864', '390x844', '768x1024', '360x640']

TIMEZONES = ['America/Toronto', 'America/Vancouver', 'America/Montreal', 'America/Edmonton', 'America/Winnipeg', 'America/Halifax']

LANGUAGES = ['en-US', 'en-CA', 'fr-CA', 'en-GB']

def generate_session_id():
    """Generate a random session ID similar to the format used in the app"""
    chars = string.ascii_lowercase + string.digits
    return ''.join(random.choices(chars, k=9)) + '-' + ''.join(random.choices(chars, k=8))

def generate_device_info_json():
    """Generate realistic device information as JSON string"""
    device_info = {
        'userAgent': random.choice(BROWSERS),
        'platform': random.choice(PLATFORMS),
        'language': random.choice(LANGUAGES),
        'screenResolution': random.choice(SCREEN_RESOLUTIONS),
        'timezone': random.choice(TIMEZONES),
        'timestamp': datetime.now().isoformat() + 'Z'
    }
    return json.dumps(device_info)

def generate_timestamp(base_date=None):
    """Generate a realistic timestamp within the past 30 days"""
    if base_date is None:
        base_date = datetime.now()
    days_ago = random.randint(0, 30)
    hours = random.randint(8, 22)  # Business hours mostly
    minutes = random.randint(0, 59)
    seconds = random.randint(0, 59)
    timestamp = base_date - timedelta(days=days_ago, hours=24-hours, minutes=minutes, seconds=seconds)
    return timestamp.isoformat() + 'Z'

def generate_realistic_name():
    """Generate a realistic full name"""
    return fake.name()

def generate_realistic_email(name):
    """Generate a realistic email based on the name"""
    # Mix of email patterns
    patterns = [
        lambda n: f"{n.lower().replace(' ', '.')}@{fake.free_email_domain()}",
        lambda n: f"{n.split()[0].lower()}.{n.split()[-1].lower()}@{fake.free_email_domain()}",
        lambda n: f"{n.split()[0].lower()}{random.randint(1, 99)}@{fake.free_email_domain()}",
        lambda n: f"{n.split()[0][0].lower()}{n.split()[-1].lower()}@{fake.free_email_domain()}",
    ]
    pattern = random.choice(patterns)
    return pattern(name)

def weighted_choice(items, weights=None):
    """Choose an item with optional weights"""
    if weights:
        return random.choices(items, weights=weights, k=1)[0]
    return random.choice(items)

def generate_multi_select(options, min_count, max_count):
    """Generate a multi-select answer"""
    count = random.randint(min_count, max_count)
    return random.sample(options, min(count, len(options)))

def generate_additional_info():
    """Generate realistic additional information (optional)"""
    # 70% chance of being empty (as it's optional)
    if random.random() < 0.7:
        return ''
    
    templates = [
        "I'm particularly interested in {topic} and looking to expand my network in this area.",
        "Recently transitioned to {industry} and eager to connect with like-minded professionals.",
        "Available for coffee chats or virtual meetings. Always happy to share insights about {topic}.",
        "Open to mentoring opportunities and collaborative projects in {industry}.",
        "Looking forward to meeting people who share similar interests in {topic}.",
        "Happy to help others in {industry}. Let's connect!",
        "Passionate about {topic} and building meaningful professional relationships.",
        ""
    ]
    
    topics = ['innovation', 'sustainability', 'technology', 'leadership', 'entrepreneurship', 
              'social impact', 'design thinking', 'data science', 'creative arts', 'strategy']
    
    template = random.choice(templates)
    if '{topic}' in template:
        template = template.replace('{topic}', random.choice(topics))
    if '{industry}' in template:
        template = template.replace('{industry}', random.choice(INDUSTRIES).lower())
    
    return template

def create_user_journeys():
    """
    Create user journeys with consistent session IDs across steps
    Returns: (step1_sessions, step2_sessions, step3_sessions)
    """
    # Generate 1000 unique sessions for Step 1
    step1_sessions = []
    for i in range(NUM_SUBMISSIONS):
        session_id = generate_session_id()
        timestamp = generate_timestamp()
        postal_code = random.choice(CANADIAN_FSA)
        device_info = generate_device_info_json()
        
        step1_sessions.append({
            'session_id': session_id,
            'timestamp': timestamp,
            'postal_code': postal_code,
            'device_info': device_info
        })
    
    # 90% of Step 1 users continue to Step 2 (900 users)
    step2_count = int(NUM_SUBMISSIONS * 0.90)
    step2_sessions = []
    
    for session in random.sample(step1_sessions, step2_count):
        # Generate slightly later timestamp (a few seconds to minutes later)
        base_time = datetime.fromisoformat(session['timestamp'].replace('Z', ''))
        seconds_later = random.randint(5, 180)  # 5 seconds to 3 minutes
        new_timestamp = (base_time + timedelta(seconds=seconds_later)).isoformat() + 'Z'
        
        name = generate_realistic_name()
        email = generate_realistic_email(name)
        
        # 95% continue, 5% skip at Step 2
        action = 'Continue' if random.random() < 0.95 else 'Skip'
        
        step2_sessions.append({
            'session_id': session['session_id'],
            'timestamp': new_timestamp,
            'postal_code': session['postal_code'],
            'device_info': session['device_info'],
            'name': name,
            'email': email,
            'action': action
        })
    
    # 85% of Step 2 'Continue' users proceed to Step 3
    step2_continue = [s for s in step2_sessions if s['action'] == 'Continue']
    step3_count = int(len(step2_continue) * 0.85)
    step3_sessions = []
    
    for session in random.sample(step2_continue, step3_count):
        # Generate slightly later timestamp
        base_time = datetime.fromisoformat(session['timestamp'].replace('Z', ''))
        seconds_later = random.randint(10, 300)  # 10 seconds to 5 minutes
        new_timestamp = (base_time + timedelta(seconds=seconds_later)).isoformat() + 'Z'
        
        # Generate professional profile with realistic distributions
        industry_weights = [1.5 if ind in ['Tech', 'Business', 'Finance', 'Healthcare', 'Education'] else 1 for ind in INDUSTRIES]
        industry = weighted_choice(INDUSTRIES, industry_weights)
        
        education_weights = [3, 3, 1.5, 1, 0.5]
        education = weighted_choice(EDUCATION_LEVELS, education_weights)
        
        job_level_weights = [1, 2, 2.5, 2, 1.5, 1, 0.5, 0.3, 0.5]
        job_level = weighted_choice(JOB_FUNCTION_LEVELS, job_level_weights)
        
        company_size_weights = [1.5, 2, 2.5, 1.5, 1]
        company_size = weighted_choice(COMPANY_SIZES, company_size_weights)
        
        experience_weights = [1, 2, 2.5, 1.5, 1]
        experience = weighted_choice(EXPERIENCE_LEVELS, experience_weights)
        
        primary_goals = generate_multi_select(PRIMARY_GOALS, 1, 5)
        connection_types = generate_multi_select(CONNECTION_TYPES, 1, 5)
        interests = generate_multi_select(PROFESSIONAL_INTERESTS, 1, 3)
        challenges = generate_multi_select(PROFESSIONAL_CHALLENGES, 1, 3)
        work_env = generate_multi_select(WORK_ENVIRONMENTS, 1, 2)
        collab_prefs = generate_multi_select(COLLABORATION_PREFERENCES, 1, 3)
        comm_styles = generate_multi_select(COMMUNICATION_STYLES, 1, 2)
        net_windows = generate_multi_select(NETWORKING_WINDOWS, 1, 4)
        days = generate_multi_select(DAYS_OF_WEEK, 1, 4)
        
        additional_info = generate_additional_info()
        
        # 98% complete, 2% skip at Step 3
        action = 'Finish' if random.random() < 0.98 else 'Skip'
        
        step3_sessions.append({
            'session_id': session['session_id'],
            'timestamp': new_timestamp,
            'postal_code': session['postal_code'],
            'device_info': session['device_info'],
            'name': session['name'],
            'email': session['email'],
            'industry': industry,
            'education': education,
            'job_level': job_level,
            'company_size': company_size,
            'experience': experience,
            'primary_goals': ', '.join(primary_goals),
            'connection_types': ', '.join(connection_types),
            'interests': ', '.join(interests),
            'challenges': ', '.join(challenges),
            'work_env': ', '.join(work_env),
            'collab_prefs': ', '.join(collab_prefs),
            'comm_styles': ', '.join(comm_styles),
            'net_windows': ', '.join(net_windows),
            'days': ', '.join(days),
            'additional_info': additional_info,
            'action': action
        })
    
    return step1_sessions, step2_sessions, step3_sessions

def save_to_csv(data, filename, headers):
    """Save data to CSV file"""
    if not data:
        print(f"No data to save for {filename}")
        return
    
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=headers)
        writer.writeheader()
        writer.writerows(data)
    
    print(f"✓ Created {filename} with {len(data)} submissions")

def main():
    """Main function to generate all CSV files"""
    print("=" * 80)
    print("Pathfinders Sample Data Generator")
    print("=" * 80)
    print(f"\nGenerating {NUM_SUBMISSIONS} realistic submissions with:")
    print("  ✓ Proper column order matching production")
    print("  ✓ Device Info as JSON string")
    print("  ✓ Consistent session tracking across steps")
    print()
    
    # Create user journeys with consistent sessions
    print("Creating user journeys with session tracking...")
    step1_sessions, step2_sessions, step3_sessions = create_user_journeys()
    
    # Step 1 Data - Headers: Timestamp, Session ID, Postal Code, Device Info
    print("\nGenerating Step 1 data (Location Information)...")
    step1_data = []
    step1_headers = ['Timestamp', 'Session ID', 'Postal Code', 'Device Info']
    
    for session in step1_sessions:
        step1_data.append({
            'Timestamp': session['timestamp'],
            'Session ID': session['session_id'],
            'Postal Code': session['postal_code'],
            'Device Info': session['device_info']
        })
    
    save_to_csv(step1_data, 'pathfinders_step1_submissions.csv', step1_headers)
    
    # Step 2 Data - Headers: Timestamp, Session ID, Postal Code, Name, Email, Device Info, Action
    print("Generating Step 2 data (Contact Information)...")
    step2_data = []
    step2_headers = ['Timestamp', 'Session ID', 'Postal Code', 'Name', 'Email', 'Device Info', 'Action']
    
    for session in step2_sessions:
        step2_data.append({
            'Timestamp': session['timestamp'],
            'Session ID': session['session_id'],
            'Postal Code': session['postal_code'],
            'Name': session['name'],
            'Email': session['email'],
            'Device Info': session['device_info'],
            'Action': session['action']
        })
    
    save_to_csv(step2_data, 'pathfinders_step2_submissions.csv', step2_headers)
    
    # Step 3 Data - Complete headers as per google-apps-script.js
    print("Generating Step 3 data (Professional Profile)...")
    step3_data = []
    step3_headers = [
        'Timestamp', 'Session ID', 'Postal Code', 'Name', 'Email', 'Industry',
        'Education Level', 'Job Function Level', 'Company Size', 'Primary Goal',
        'Connection Types', 'Work Environment', 'Collaboration Preferences',
        'Networking Window', 'Day of Week', 'Experience', 'Communication',
        'Interests', 'Challenges', 'Additional Info', 'Device Info', 'Action'
    ]
    
    for session in step3_sessions:
        step3_data.append({
            'Timestamp': session['timestamp'],
            'Session ID': session['session_id'],
            'Postal Code': session['postal_code'],
            'Name': session['name'],
            'Email': session['email'],
            'Industry': session['industry'],
            'Education Level': session['education'],
            'Job Function Level': session['job_level'],
            'Company Size': session['company_size'],
            'Primary Goal': session['primary_goals'],
            'Connection Types': session['connection_types'],
            'Work Environment': session['work_env'],
            'Collaboration Preferences': session['collab_prefs'],
            'Networking Window': session['net_windows'],
            'Day of Week': session['days'],
            'Experience': session['experience'],
            'Communication': session['comm_styles'],
            'Interests': session['interests'],
            'Challenges': session['challenges'],
            'Additional Info': session['additional_info'],
            'Device Info': session['device_info'],
            'Action': session['action']
        })
    
    save_to_csv(step3_data, 'pathfinders_step3_submissions.csv', step3_headers)
    
    print()
    print("=" * 80)
    print("✓ All files generated successfully!")
    print("=" * 80)
    print("\nSession Tracking Statistics:")
    print(f"  Step 1: {len(step1_sessions)} users started")
    print(f"  Step 2: {len(step2_sessions)} users ({len(step2_sessions)/len(step1_sessions)*100:.1f}% of Step 1)")
    print(f"  Step 3: {len(step3_sessions)} users ({len(step3_sessions)/len(step2_sessions)*100:.1f}% of Step 2)")
    print(f"\n  Completion Rate: {len(step3_sessions)/len(step1_sessions)*100:.1f}% (Step 1 → Step 3)")
    print("\nGenerated files:")
    print("  1. pathfinders_step1_submissions.csv - Location data")
    print("  2. pathfinders_step2_submissions.csv - Contact information")
    print("  3. pathfinders_step3_submissions.csv - Complete professional profiles")
    print("\n✓ All session IDs are properly tracked across steps")
    print("✓ Device Info is a JSON string (single column)")
    print("✓ Column order matches Google Sheets production format")
    print("=" * 80)

if __name__ == '__main__':
    main()
