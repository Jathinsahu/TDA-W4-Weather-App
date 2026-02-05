# Weather Application

A simple weather application that fetches real-time weather data from OpenWeatherMap API.

## Features

- Search for weather by city name
- Display current weather conditions
- Temperature unit conversion (Celsius/Fahrenheit)
- Favorite cities storage
- Responsive design
- Data caching for better performance
- Error handling

## Setup Instructions

1. **Get API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key

2. **Configure the App**
   - Open `js/config.js`
   - Replace `YOUR_API_KEY_HERE` with your actual API key

3. **Run the Application**
   - Open `index.html` in your browser
   - Or deploy to a web server

## Project Structure

```
weather-app/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── weatherService.js
│   └── app.js
└── README.md
```

## How to Use

1. Enter a city name in the search box
2. Click "Search" or press Enter
3. View current weather information
4. Click on the temperature unit (°C/°F) to convert
5. Add frequently searched cities to favorites
6. Click "View" on favorite cities to quickly see their weather

## Technical Details

- **API**: OpenWeatherMap Current Weather API
- **Data Caching**: 10-minute cache duration
- **Storage**: localStorage for favorites
- **Responsive**: Works on mobile and desktop
- **Error Handling**: Graceful error messages

## Requirements Met

✅ Fetch data from OpenWeatherMap API
✅ Display current weather
✅ City search functionality
✅ Temperature unit conversion
✅ Responsive design
✅ Error handling
✅ Data caching with localStorage
✅ User-friendly loading states
✅ Favorite cities functionality