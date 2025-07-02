import React, { useState, useEffect } from "react";
import "./App.css";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import WeatherSuggestions from "./components/WeatherSuggestions";
import { getSuggestionForWeather } from "./utils/suggestionMatcher";

function App() {
  // State variables
  const [forecast, setForecast] = useState([]);
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState("");
  const [suggestionsData, setSuggestionsData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch weather data on app start
  useEffect(() => {
    // Fetch current weather - using city Aarhus instead of lat/lon as city is required by API
    const fetchCurrent = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/weather?city=Aarhus`
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setCurrent(data);
        }
      } catch (err) {
        setError("Failed to fetch current weather data.");
      }
    };

    // Fetch 5-day weather forecast - 5-day is the maximum free number of days for OpenWeather API
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/forecast`
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          // Use forecast at 12:00:00 for daily forecast
          const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));
          setForecast(daily);
        }
      } catch (err) {
        setError("Failed to fetch forecast data.");
      }
    };

    // Fetch suggestions data from local JSON file (suggestions_dummy_data.json)
    const fetchSuggestions = async () => {
      try {
        const response = await fetch("/suggestions_dummy_data.json");
        const data = await response.json();
        setSuggestionsData(data);
      } catch (err) {
        setError("Failed to fetch suggestions data.");
      }
    };

    // Call all fetch functions - this will run on app start
    fetchCurrent();
    fetchForecast();
    fetchSuggestions();
  }, []);

  // Get the best suggestions for the current weather
  const suggestionEntry = getSuggestionForWeather(current, suggestionsData);
  // For debugging: log the suggestion entry and current weather
  console.log("Suggestion entry from matcher:", suggestionEntry, current);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather in Rosenkrantzgade 19B, 8000 Aarhus C</h1>
        {/* Show error if any */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* Layout: weather and suggestions side by side */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
          <div>
            {/* Show current weather and the button to toggle suggestions */}
            <Weather
              current={current}
              onShowSuggestions={() => setShowSuggestions((v) => !v)}
              showSuggestions={showSuggestions}
            />
          </div>
          {/* Show suggestions if toggled on */}
          {showSuggestions && (
            <div>
              <WeatherSuggestions suggestionEntry={suggestionEntry} />
            </div>
          )}
        </div>
        {/* Show 5-day forecast below */}
        <Forecast forecast={forecast} />
      </header>
    </div>
  );
}

export default App;