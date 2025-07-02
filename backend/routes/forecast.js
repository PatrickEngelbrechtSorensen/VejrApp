const express = require('express');
const axios = require('axios');
const router = express.Router();

// Load API key from .env file
const API_KEY = process.env.OPENWEATHER_API_KEY;

// In-memory cache for forecast data
let forecastCache = {
  timestamp: 0,
  data: null
};

/**
 * GET /api/forecast
 * Fetches 5-day weather forecast for Aarhus.
 * Uses cache if data is less than 15 minutes old.
 */
router.get('/', async (req, res) => {
  const city = "Aarhus";
  const now = Date.now();
  // Serve from cache if within 15 minutes
  if (forecastCache.data && (now - forecastCache.timestamp < 900000)) {
    console.log('Serving forecast data from cache');
    return res.json(forecastCache.data);
  }

  // Fetch new data from OpenWeatherMap API
  try {
    console.log('Fetching new forecast data from API');
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    forecastCache = {
      timestamp: now,
      data: response.data
    };
    res.json(response.data);
  } catch (err) {
    console.error("Forecast error:", err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

module.exports = router;