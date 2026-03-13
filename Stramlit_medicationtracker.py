import streamlit as st
import pandas as pd
from datetime import datetime
import json
from pathlib import Path

# Page configuration
st.set_page_config(
    page_title="Medication Tracker",
    page_icon="💊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
    <style>
    .main {
        padding: 20px;
    }
    .medication-card {
        border-radius: 10px;
        padding: 15px;
        background-color: #f0f2f6;
        margin: 10px 0;
    }
    .stats-container {
        display: flex;
        gap: 20px;
        margin: 20px 0;
    }
    </style>
    """, unsafe_allow_html=True)

# Initialize session state
if 'medications' not in st.session_state:
    st.session_state.medications = []
if 'dose_history' not in st.session_state:
    st.session_state.dose_history = []

# Load data from JSON file if it exists
DATA_FILE = Path('medications_data.json')

def load_data():
    if DATA_FILE.exists():
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
            st.session_state.medications = data.get('medications', [])
            st.session_state.dose_history = data.get('dose_history', [])

def save_data():
    data = {
        'medications': st.session_state.medications,
        'dose_history': st.session_state.dose_history
    }
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

# Load existing data
load_data()

# Sidebar
st.sidebar.title("📋 Navigation")
page = st.sidebar.radio("Select a page:", [
    "Dashboard",
    "Add Medication",
    "Track Doses",
    "History",
    "Analytics"
])

st.sidebar.markdown("---")
st.sidebar.markdown("### Repository Info")
st.sidebar.markdown("""
**MedicationTracker**
- Owner: SJagadeesh1117
- Repo ID: 1041881350

**Language Composition:**
- 🔵 JavaScript: 62.3%
- 🟡 Python: 36.9%
- ⚪ Other: 0.8%
""")

# Main content based on page selection
if page == "Dashboard":
    st.title("💊 Medication Tracker Dashboard")
    
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Medications", len(st.session_state.medications))
    with col2:
        st.metric("Total Doses Logged", len(st.session_state.dose_history))
    with col3:
        today_doses = sum(1 for dose in st.session_state.dose_history 
                         if dose['date'] == str(datetime.now().date()))
        st.metric("Doses Today", today_doses)
    
    st.markdown("---")
    st.subheader("📌 Active Medications")
    
    if st.session_state.medications:
        for idx, med in enumerate(st.session_state.medications):
            with st.container():
                col1, col2, col3 = st.columns([3, 2, 1])
                with col1:
                    st.write(f"**{med['name']}**")
                    st.caption(f"Dosage: {med['dosage']} | Frequency: {med['frequency']}")
                with col2:
                    st.write(f"Start: {med['start_date']}")
                with col3:
                    if st.button("Edit", key=f"edit_{idx}"):
                        st.session_state.page = "edit"
            st.markdown("---")
    else:
        st.info("No medications added yet. Start by adding a new medication!")

elif page == "Add Medication":
    st.title("➕ Add New Medication")
    
    with st.form("add_med_form"):
        name = st.text_input("Medication Name")
        dosage = st.text_input("Dosage (e.g., 500mg)")
        frequency = st.selectbox("Frequency", 
                                 ["Once daily", "Twice daily", "Three times daily", 
                                  "Four times daily", "As needed"])
        start_date = st.date_input("Start Date")
        notes = st.text_area("Notes (optional)")
        
        submitted = st.form_submit_button("Add Medication")
        
        if submitted:
            if name and dosage:
                medication = {
                    'name': name,
                    'dosage': dosage,
                    'frequency': frequency,
                    'start_date': str(start_date),
                    'notes': notes,
                    'id': len(st.session_state.medications) + 1
                }
                st.session_state.medications.append(medication)
                save_data()
                st.success(f"✅ {name} added successfully!")
                st.balloons()
            else:
                st.error("Please fill in all required fields")

elif page == "Track Doses":
    st.title("📝 Track Medication Doses")
    
    if not st.session_state.medications:
        st.warning("No medications added yet. Please add a medication first.")
    else:
        with st.form("track_dose_form"):
            col1, col2 = st.columns(2)
            
            with col1:
                medication = st.selectbox(
                    "Select Medication",
                    [f"{med['name']} ({med['dosage']})" for med in st.session_state.medications],
                    key="med_select"
                )
                dose_date = st.date_input("Date", value=datetime.now().date())
            
            with col2:
                dose_time = st.time_input("Time Taken")
                taken = st.radio("Dose Taken?", ["Yes", "No"], horizontal=True)
            
            notes = st.text_area("Notes")
            submitted = st.form_submit_button("Log Dose")
            
            if submitted:
                dose_record = {
                    'medication': medication,
                    'date': str(dose_date),
                    'time': str(dose_time),
                    'taken': taken == "Yes",
                    'notes': notes,
                    'timestamp': datetime.now().isoformat()
                }
                st.session_state.dose_history.append(dose_record)
                save_data()
                st.success("✅ Dose logged successfully!")

elif page == "History":
    st.title("📚 Medication History")
    
    if not st.session_state.dose_history:
        st.info("No dose history recorded yet.")
    else:
        # Create DataFrame for better visualization
        history_df = pd.DataFrame(st.session_state.dose_history)
        
        # Filter options
        col1, col2 = st.columns(2)
        with col1:
            selected_med = st.selectbox(
                "Filter by Medication",
                ["All"] + list(set([dose['medication'] for dose in st.session_state.dose_history]))
            )
        
        with col2:
            status_filter = st.selectbox("Filter by Status", ["All", "Taken", "Missed"])
        
        # Apply filters
        filtered_history = st.session_state.dose_history.copy()
        
        if selected_med != "All":
            filtered_history = [d for d in filtered_history if d['medication'] == selected_med]
        
        if status_filter == "Taken":
            filtered_history = [d for d in filtered_history if d['taken']]
        elif status_filter == "Missed":
            filtered_history = [d for d in filtered_history if not d['taken']]
        
        # Display history
        for dose in reversed(filtered_history):
            status = "✅ Taken" if dose['taken'] else "❌ Missed"
            st.write(f"{dose['date']} {dose['time']} | {dose['medication']} | {status}")
            if dose['notes']:
                st.caption(f"Notes: {dose['notes']}")
            st.markdown("---")
        
        # Export button
        st.subheader("Export Data")
        csv = pd.DataFrame(filtered_history).to_csv(index=False)
        st.download_button(
            label="Download as CSV",
            data=csv,
            file_name="medication_history.csv",
            mime="text/csv"
        )

elif page == "Analytics":
    st.title("📊 Analytics & Statistics")
    
    if not st.session_state.dose_history:
        st.info("No data available for analytics yet.")
    else:
        # Medication adherence
        st.subheader("💉 Medication Adherence")
        
        adherence_data = {}
        for dose in st.session_state.dose_history:
            med = dose['medication']
            if med not in adherence_data:
                adherence_data[med] = {'taken': 0, 'missed': 0}
            
            if dose['taken']:
                adherence_data[med]['taken'] += 1
            else:
                adherence_data[med]['missed'] += 1
        
        adherence_df = pd.DataFrame([
            {
                'Medication': med,
                'Taken': data['taken'],
                'Missed': data['missed'],
                'Adherence %': round(data['taken'] / (data['taken'] + data['missed']) * 100, 1)
            }
            for med, data in adherence_data.items()
        ])
        
        st.dataframe(adherence_df, use_container_width=True)
        
        # Charts
        col1, col2 = st.columns(2)
        
        with col1:
            st.subheader("Adherence Rate")
            chart_data = adherence_df.set_index('Medication')[['Adherence %']]
            st.bar_chart(chart_data)
        
        with col2:
            st.subheader("Doses Taken vs Missed")
            doses_summary = adherence_df.set_index('Medication')[['Taken', 'Missed']]
            st.bar_chart(doses_summary)
        
        # Language composition info
        st.markdown("---")
        st.subheader("📈 Repository Language Composition")
        
        lang_data = {
            'Language': ['JavaScript', 'Python', 'Other'],
            'Percentage': [62.3, 36.9, 0.8]
        }
        lang_df = pd.DataFrame(lang_data)
        
        col1, col2 = st.columns(2)
        with col1:
            st.bar_chart(lang_df.set_index('Language')['Percentage'])
        with col2:
            st.write("### Language Breakdown")
            for _, row in lang_df.iterrows():
                st.progress(row['Percentage'] / 100, text=f"{row['Language']}: {row['Percentage']}%")

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center'>
    <p>MedicationTracker © 2026 | Built with Streamlit</p>
    <p><small>Repository: SJagadeesh1117/MedicationTracker</small></p>
</div>
""", unsafe_allow_html=True)
