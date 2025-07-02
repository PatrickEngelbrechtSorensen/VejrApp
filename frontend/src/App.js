import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [forecast, setForecast] = useState([]);
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState("");

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

    fetchCurrent();
    fetchForecast();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather in Aarhus</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Current weather section */}
        {current && (
          <div style={{ background: "#1e293b", padding: 24, borderRadius: 12, marginBottom: 32, display: "inline-block" }}>
            <h2>Current Weather</h2>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                alt={current.weather[0].description}
              />
            </div>
            <div style={{ fontSize: "2em", fontWeight: "bold" }}>{current.main.temp}°C</div>
            <div>{current.weather[0].main} ({current.weather[0].description})</div>
            <div>Humidity: {current.main.humidity}%</div>
            <div>Wind: {current.wind.speed} m/s</div>
            <div>Feels like: {current.main.feels_like}°C</div>
          </div>
        )}

        {/* 5-day forecast section */}
        <h2>5-Day Forecast</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          {forecast.map((item, idx) => (
            <div key={idx} style={{ background: "#222", padding: 16, borderRadius: 8, minWidth: 120 }}>
              <div>
                <strong>
                  {new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" })}
                </strong>
              </div>
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                />
              </div>
              <div>{item.weather[0].main}</div>
              <div>{item.main.temp}°C</div>
              <div style={{ fontSize: "0.9em" }}>Humidity: {item.main.humidity}%</div>
              <div style={{ fontSize: "0.9em" }}>Wind: {item.wind.speed} m/s</div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;