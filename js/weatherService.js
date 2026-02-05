// Weather service to handle API calls
class WeatherService {
    constructor() {
        this.cache = new Map();
        this.cacheDuration = 10 * 60 * 1000; // 10 minutes
    }
    
    // Get current weather for a city
    async getCurrentWeather(city) {
        const cacheKey = `current_${city.toLowerCase()}`;
        
        // Check if we have cached data that's still valid
        const cached = this.getFromCache(cacheKey);
        if (cached) {
            return cached;
        }
        
        try {
            const response = await fetch(
                `${CONFIG.BASE_URL}?q=${city}&units=${CONFIG.UNITS}&appid=${CONFIG.API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error(`Weather data not found for ${city}`);
            }
            
            const data = await response.json();
            this.saveToCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error('Error fetching weather:', error);
            throw error;
        }
    }
    
    // Get data from cache
    getFromCache(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }
    
    // Save data to cache
    saveToCache(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }
    
    // Clear all cached data
    clearCache() {
        this.cache.clear();
    }
}