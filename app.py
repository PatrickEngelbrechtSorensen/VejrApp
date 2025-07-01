import streamlit as st
import json
import random
from datetime import datetime

# Set Streamlit page config for better mobile experience
st.set_page_config(layout="wide")

# Custom CSS to make buttons and radar map responsive
st.markdown("""
    <style>
        @media (max-width: 800px) {
            .responsive-col {width: 100% !important; display: block !important;}
            iframe {width: 100% !important;}
        }
        .responsive-btn {width: 100%; font-size: 1.1em;}
    </style>
""", unsafe_allow_html=True)

st.markdown(
    """
    <h1 style='text-align: center; max-width: 1000px; margin-left: auto; margin-right: auto;'>
        7-Day Weather Forecast - Rosenkrantzgade 19B, 8000 Aarhus C
    </h1>
    """,
    unsafe_allow_html=True
)

# Load dummy data from forecast_data.json
with open("forecast_data.json", "r", encoding="utf-8") as f:
    forecast = json.load(f)

# Responsive columns: 1 column on mobile, 7 on desktop
import streamlit.components.v1 as components
import sys

if "selected_idx" not in st.session_state:
    st.session_state.selected_idx = 0

if st.session_state.get("mobile", None) is None:
    # Try to detect mobile by screen width (Streamlit doesn't provide this directly)
    st.session_state.mobile = False
    # You can use st.experimental_get_query_params() or a JS hack for real detection

mobile = st.session_state.mobile

if st.session_state.mobile:
    # Stack days vertically
    for idx, day in enumerate(forecast):
        weekday = datetime.strptime(day['date'], "%Y-%m-%d").strftime("%A")
        if st.button(f"{weekday} {day.get('icon', '')} {day['description']} {day['temperature']}°C", key=f"day_{idx}", help="Tap for details", use_container_width=True):
            st.session_state.selected_idx = idx
else:
    cols = st.columns(len(forecast))
    for idx, day in enumerate(forecast):
        with cols[idx]:
            weekday = datetime.strptime(day['date'], "%Y-%m-%d").strftime("%A")
            if st.button(f"{weekday}\n{day.get('icon', '')} {day['description']}\n{day['temperature']}°C", key=f"day_{idx}", help="Tap for details", use_container_width=True):
                st.session_state.selected_idx = idx

# Show details for the selected day
day = forecast[st.session_state.selected_idx]
st.markdown("---")
st.markdown(f"### Details for {datetime.strptime(day['date'], '%Y-%m-%d').strftime('%A')}")
st.markdown(f"**Rain:** {day['rain_mm']} mm")
st.markdown(f"**Wind:** {day['wind_ms']} m/s")
st.markdown("**Clothing tips:** " + ", ".join(day.get("clothing", [])))
suggestion = random.choice(day["suggestions"]) if day.get("suggestions") else "No suggestion"
st.markdown(f"**Suggestion:** {suggestion}")

st.markdown("## Live Radar Map")
st.markdown(
    """
    <iframe src="https://www.rainviewer.com/map.html?loc=56.1518,10.2064,10&oFa=1&oC=1&oU=0&oCS=1&oF=0&oAP=0&c=3&o=83&lm=1&layer=radar" width="100%" height="400" frameborder="0" style="border:0;max-width:100vw;" allowfullscreen></iframe>
    """,
    unsafe_allow_html=True
)