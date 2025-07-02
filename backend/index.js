// Import required modules
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from .env

// Create express application
const app = express();

// Enable Cross Origin Resource Sharing
app.use(cors());

// Import route handlers for weather and forecast
const weatherRouter = require('./routes/weather');
const forecastRouter = require('./routes/forecast');

// Register the routes with the Express app
app.use('/api/weather', weatherRouter);
app.use('/api/forecast', forecastRouter);

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));