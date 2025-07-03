# VejrApp

## Overview
VejrApp is a weather and activity suggestion app for Rosenkrantzgade 19B, 8000 Aarhus C. It shows the current weather, a 5-day forecast, and gives clothing and after-work suggestions based on the weather.

## How to Run

### Setup API Key

This app requires an OpenWeatherMap API key.

1. Go to [https://home.openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up) and create a free account.
2. After signing up, go to the "API keys" section in your OpenWeatherMap dashboard.
3. Copy your API key.
4. In the `backend` folder, create a file named `.env` and add this line:

   ```
   OPENWEATHER_API_KEY=your_openweathermap_api_key_here
   ```

5. Save the file. Now you can run the backend as described above.

### Backend
1. `cd backend`
2. `npm install`
3. `node index.js`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`
4. Open [http://localhost:3000](http://localhost:3000)

## How it Works

- On app start:
   - The frontend requests current weather and 5-day forecast data from the backend.
   - The backend fetches this data from the OpenWeatherMap API (if not already cached) and returns it to the frontend.
   - The backend caches weather data for 15 minutes to reduce the number of API requests.
   - The frontend also loads activity and clothing suggestions from a local JSON file.
- The user sees the current weather and a 5-day forecast.
- The user can click a button below the current weather to view suggestions for what to wear and what to do after work, based on the current weather conditions.

## Testing

- The app should show the current weather, a button for suggestions, and the 5-day weather forecast.
- Click the "Show Suggestions" button to see suggestions for what clothing to wear and what to do after work.

## Design Decisions

- **Separation of Concerns:**  
  The backend (Node.js/Express) handles all communication with the OpenWeatherMap API and manages API keys. The frontend (React) is responsible for user interaction and display logic.

- **Caching:**  
  Weather and forecast data are cached on the backend for 15 minutes to reduce API calls, improve performance, and stay within OpenWeatherMap’s free tier limits.

- **Component-Based Frontend:**  
  The React frontend is organized into modular components (`Weather`, `Forecast`, `WeatherSuggestions`) for maintainability, reusability, and clarity.

- **Local Suggestions Data:**  
  Clothing and activity suggestions are stored in a local JSON file, making it easy to update or expand without changing application logic. This could later be handled by AI with integration.