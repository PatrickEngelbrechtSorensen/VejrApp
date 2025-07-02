const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.OPENWEATHER_API_KEY;

// --- Add cache objects here ---
let weatherCache = {
  timestamp: 0,
  data: null
};
let forecastCache = {
  timestamp: 0,
  data: null
};

// --- Use cache in /api/weather ---
app.get('/api/weather', async (req, res) => {
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

// --- Use cache in /api/forecast ---
app.get('/api/forecast', async (req, res) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));