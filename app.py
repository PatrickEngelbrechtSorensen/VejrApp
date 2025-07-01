import streamlit as st
import json
import random

st.title("7-Day Weather Forecast - Rosenkrantzgade 19B, 8000 Aarhus C")

# Load dummy data from forecast_data.json
with open("forecast_data.json", "r", encoding="utf-8") as f:
    forecast = json.load(f)

cols = st.columns(len(forecast))

for idx, day in enumerate(forecast):
    with cols[idx]:
        st.markdown(f"### {day['date']}")
        st.markdown(f"{day.get('icon', '')} **{day['description']}**")
        st.markdown(f"**Temperature:** {day['temperature']}°C")
        st.markdown(f"**Rain:** {day['rain_mm']} mm")
        st.markdown(f"**Wind:** {day['wind_ms']} m/s")
        st.markdown("**Clothing tips:** " + ", ".join(day.get("clothing", [])))
        # Show only one suggestion if available
        suggestion = random.choice(day["suggestions"]) if day.get("suggestions") else "No suggestion"
        st.markdown(f"**Suggestion:** {suggestion}")