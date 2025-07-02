const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const weatherRouter = require('./routes/weather');
const forecastRouter = require('./routes/forecast');

app.use('/api/weather', weatherRouter);
app.use('/api/forecast', forecastRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));