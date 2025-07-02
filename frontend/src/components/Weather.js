import React from "react";

/**
 * Displays current weather and button to show/hide suggestions.
 * @param {object} props
 * @param {object} props.suggestionEntry - The matched suggestion entry for the weather.
 */

function Weather({ current, onShowSuggestions, showSuggestions }) {
  if (!current) return null;
  return (
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
      <button
        className="suggestion-btn"
        onClick={onShowSuggestions}
      >
        {showSuggestions ? "Hide" : "Show"} Suggestions
      </button>
    </div>
  );
}

export default Weather;