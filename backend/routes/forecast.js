const express = require('express');
const axios = require('axios');

const router = express.Router();

const API_KEY = process.env.OPENWEATHER_API_KEY;

// In-memory cache for forecast
let forecastCache = {
  timestamp: 0,
  data: null
};

router.get('/', async (req, res) => {
  const city = "Aarhus";
  const now = Date.now();
  if (forecastCache.data && (now - forecastCache.timestamp < 900000)) {
    console.log('Serving forecast data from cache');
    return res.json(forecastCache.data);
  }
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