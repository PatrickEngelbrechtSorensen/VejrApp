export function getSuggestionForWeather(current, suggestionsData) {
  if (!current || !suggestionsData || suggestionsData.length === 0) return null;

  // Get current weather info
  const main = current.weather[0].main; // e.g. "Clear", "Clouds", "Rain"
  const temp = current.main.temp;
  const wind = current.wind.speed;

  console.log("Matcher input:", { main, temp, wind }, suggestionsData);

  // Try to find the best match
  let match = suggestionsData.find(entry => {
    if (!entry.description) return false;
    const descMatch = main.toLowerCase().includes(entry.description.toLowerCase());
    const tempMatch = entry.temperature === undefined || Math.abs(entry.temperature - temp) < 3;
    const windMatch = entry.wind_ms === undefined || Math.abs(entry.wind_ms - wind) < 2;
    return descMatch && tempMatch && windMatch;
  });

  // Fallback: match "Any" description
  if (!match) {
    match = suggestionsData.find(entry => entry.description && entry.description.toLowerCase() === "any");
  }

  return match || null;
}