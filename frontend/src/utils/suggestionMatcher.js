/**
 * Finds the best suggestion entry for the current weather.
 * @param {object} current - The current weather data from OpenWeatherMap.
 * @param {array} suggestionsData - Array of suggestion entries from JSON.
 * @returns {object|null} The best matching suggestion entry, or null if none found.
 */

export function getSuggestionForWeather(current, suggestionsData) {
  if (!current || !suggestionsData || suggestionsData.length === 0) return null;

  // Get current weather info - temperature, weather condition, and wind speed
  const main = current.weather[0].main; // e.g., "Clear", "Clouds", "Rain"
  const temp = current.main.temp; // Temperature in °C
  const wind = current.wind.speed; // Wind speed in m/s

  // Debug: log what is being matched
  console.log("Matcher input:", { main, temp, wind }, suggestionsData);

  // Find the best match in the suggestions data
  // Match based on description, temperature, and wind speed
  let match = suggestionsData.find(entry => {
    if (!entry.description) return false;
    // Match weather description (case-insensitive, partial match)
    const descMatch = main.toLowerCase().includes(entry.description.toLowerCase());
    // Match temperature (within ±4°C)
    const tempMatch = entry.temperature === undefined || Math.abs(entry.temperature - temp) < 4;
    // Match wind speed (within ±3 m/s)
    const windMatch = entry.wind_ms === undefined || Math.abs(entry.wind_ms - wind) < 3;
    return descMatch && tempMatch && windMatch;
  });

  // Fallback: if no match, use "Any" entry
  if (!match) {
    match = suggestionsData.find(entry => entry.description && entry.description.toLowerCase() === "any");
  }

  return match || null;
}