const express = require('express');
const axios = require('axios');

const router = express.Router();

const API_KEY = process.env.OPENWEATHER_API_KEY;

// In-memory cache for weather
let weatherCache = {
  timestamp: 0,
  data: null
};

router.get('/', async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'City is required' });
  const now = Date.now();
  if (weatherCache.data && (now - weatherCache.timestamp < 900000)) {
    console.log('Serving weather data from cache');
    return res.json(weatherCache.data);
  }
  try {
    console.log('Fetching new weather data from API');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    weatherCache = {
      timestamp: now,
      data: response.data
    };
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;