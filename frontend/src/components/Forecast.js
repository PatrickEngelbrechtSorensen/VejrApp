import React from "react";

/**
 * Displays a 5-day weather forecast as cards.
 * @param {object} props
 * @param {array} props.forecast - Array of forecast data for each day.
 */

function Forecast({ forecast }) {
  return (
    <div>
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
    </div>
  );
}

export default Forecast;