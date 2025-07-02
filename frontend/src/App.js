import React, { useState, useEffect } from "react";
import "./App.css";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import WeatherSuggestions from "./components/WeatherSuggestions";
import { getSuggestionForWeather } from "./utils/suggestionMatcher";

function App() {
  const [forecast, setForecast] = useState([]);
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState("");
  const [suggestionsData, setSuggestionsData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


  useEffect(() => {
    // Fetch current weather
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

    // Fetch forecast
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/forecast`
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          // Filter for forecasts at 12:00:00 each day
          const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));
          setForecast(daily);
        }
      } catch (err) {
        setError("Failed to fetch forecast data.");
      }
    };

    // Fetch suggestions data
    const fetchSuggestions = async () => {
      try {
        const response = await fetch("/suggestions_dummy_data.json");
        const data = await response.json();
        setSuggestionsData(data);
      } catch (err) {
        setError("Failed to fetch suggestions data.");
      }
    };

    fetchCurrent();
    fetchForecast();
    fetchSuggestions();
  }, []);

  const suggestionEntry = getSuggestionForWeather(current, suggestionsData);
  console.log("Suggestion entry from matcher:", suggestionEntry, current);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather in Aarhus</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
          <div>
            <Weather
              current={current}
              onShowSuggestions={() => setShowSuggestions((v) => !v)}
              showSuggestions={showSuggestions}
            />
          </div>
          {showSuggestions && (
            <div>
              <WeatherSuggestions suggestionEntry={suggestionEntry} />
            </div>
          )}
        </div>
        <Forecast forecast={forecast} />
      </header>
    </div>
  );
}

export default App;