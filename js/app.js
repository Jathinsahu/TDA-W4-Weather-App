// Main application file
class WeatherApp {
    constructor() {
        this.weatherService = new WeatherService();
        this.currentUnit = 'celsius';
        this.favorites = this.loadFavorites();
        this.init();
    }
    
    // Initialize the app
    init() {
        this.setupEventListeners();
        this.displayFavorites();
    }
    
    // Set up event listeners
    setupEventListeners() {
        const searchBtn = document.getElementById('searchBtn');
        const cityInput = document.getElementById('cityInput');
        const unitToggle = document.getElementById('unitToggle');
        
        searchBtn.addEventListener('click', () => this.searchWeather());
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });
        unitToggle.addEventListener('click', () => this.toggleUnit());
    }
    
    // Search for weather data
    async searchWeather() {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();
        
        if (!city) {
            alert('Please enter a city name');
            return;
        }
        
        this.showLoading();
        
        try {
            const weatherData = await this.weatherService.getCurrentWeather(city);
            this.displayWeather(weatherData);
            this.hideError();
        } catch (error) {
            this.hideLoading();
            this.showError();
        }
    }
    
    // Display weather data
    displayWeather(data) {
        this.hideLoading();
        this.showWeatherDisplay();
        
        const cityName = document.getElementById('cityName');
        const temp = document.getElementById('temp');
        const description = document.getElementById('description');
        const feelsLike = document.getElementById('feelsLike');
        const humidity = document.getElementById('humidity');
        const wind = document.getElementById('wind');
        
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temp.textContent = Math.round(data.main.temp);
        description.textContent = data.weather[0].description;
        feelsLike.textContent = Math.round(data.main.feels_like);
        humidity.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;
    }
    
    // Toggle temperature unit
    toggleUnit() {
        const unitToggle = document.getElementById('unitToggle');
        const temp = document.getElementById('temp');
        const feelsLike = document.getElementById('feelsLike');
        
        if (this.currentUnit === 'celsius') {
            // Convert to Fahrenheit
            const celsius = parseFloat(temp.textContent);
            const fahrenheit = Math.round((celsius * 9/5) + 32);
            temp.textContent = fahrenheit;
            
            const celsiusFeels = parseFloat(feelsLike.textContent);
            const fahrenheitFeels = Math.round((celsiusFeels * 9/5) + 32);
            feelsLike.textContent = fahrenheitFeels;
            
            unitToggle.textContent = '°F';
            this.currentUnit = 'fahrenheit';
        } else {
            // Convert to Celsius (reload data)
            const cityInput = document.getElementById('cityInput');
            if (cityInput.value) {
                this.searchWeather();
            }
            unitToggle.textContent = '°C';
            this.currentUnit = 'celsius';
        }
    }
    
    // Add city to favorites
    addToFavorites(city) {
        if (!this.favorites.includes(city.toLowerCase())) {
            this.favorites.push(city.toLowerCase());
            this.saveFavorites();
            this.displayFavorites();
        }
    }
    
    // Remove city from favorites
    removeFromFavorites(city) {
        this.favorites = this.favorites.filter(fav => fav !== city.toLowerCase());
        this.saveFavorites();
        this.displayFavorites();
    }
    
    // Display favorite cities
    displayFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        favoritesList.innerHTML = '';
        
        this.favorites.forEach(city => {
            const favItem = document.createElement('div');
            favItem.className = 'favorite-item';
            favItem.innerHTML = `
                <span>${city.charAt(0).toUpperCase() + city.slice(1)}</span>
                <div>
                    <button onclick="app.searchFavorite('${city}')">View</button>
                    <button onclick="app.removeFromFavorites('${city}')">Remove</button>
                </div>
            `;
            favoritesList.appendChild(favItem);
        });
    }
    
    // Search for a favorite city
    async searchFavorite(city) {
        const cityInput = document.getElementById('cityInput');
        cityInput.value = city;
        await this.searchWeather();
        this.addToFavorites(city);
    }
    
    // Save favorites to localStorage
    saveFavorites() {
        localStorage.setItem('weatherFavorites', JSON.stringify(this.favorites));
    }
    
    // Load favorites from localStorage
    loadFavorites() {
        const favorites = localStorage.getItem('weatherFavorites');
        return favorites ? JSON.parse(favorites) : [];
    }
    
    // Show loading state
    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('weatherDisplay').classList.add('hidden');
        document.getElementById('error').classList.add('hidden');
    }
    
    // Hide loading state
    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }
    
    // Show weather display
    showWeatherDisplay() {
        document.getElementById('weatherDisplay').classList.remove('hidden');
    }
    
    // Show error state
    showError() {
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('weatherDisplay').classList.add('hidden');
        document.getElementById('loading').classList.add('hidden');
    }
    
    // Hide error state
    hideError() {
        document.getElementById('error').classList.add('hidden');
    }
}

// Initialize the app when the page loads
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new WeatherApp();
});