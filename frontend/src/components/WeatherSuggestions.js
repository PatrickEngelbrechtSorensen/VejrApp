// src/components/WeatherSuggestions.js
import React from "react";

function WeatherSuggestions({ suggestionEntry }) {
  console.log("WeatherSuggestions received:", suggestionEntry);
  if (!suggestionEntry) return null;
  const suggestion = suggestionEntry.suggestions[
    Math.floor(Math.random() * suggestionEntry.suggestions.length)
  ];
  return (
    <div style={{ marginTop: 24 }}>
      <h3>After Work Suggestion</h3>
      <p>{suggestion}</p>
      <h4>Clothing Tips</h4>
      <ul>
        {suggestionEntry.clothing.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherSuggestions;