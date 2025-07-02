import React from "react";

/**
 * Displays clothing tips and an after work suggestion based on the current weather.
 * @param {object} props
 * @param {object} props.suggestionEntry - The matched suggestion entry for the weather.
 *   - clothing: array of clothing tips
 *   - suggestions: array of after work suggestions
 */

function WeatherSuggestions({ suggestionEntry }) {
  // Log for debugging to see what suggestionEntry is received
  console.log("WeatherSuggestions received:", suggestionEntry);

  // If no suggestion entry is found, render nothing
  if (!suggestionEntry) return null;

  // Pick a random suggestion from the list
  const suggestion = suggestionEntry.suggestions[
    Math.floor(Math.random() * suggestionEntry.suggestions.length)
  ];

  return (
    <div style={{ marginTop: 24 }}>
      <h4>Clothing Tips</h4>
      <ul>
        {suggestionEntry.clothing.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <h4>After Work Suggestion</h4>
      <p>{suggestion}</p>
    </div>
  );
}

export default WeatherSuggestions;