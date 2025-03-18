import { tool as createTool } from 'ai';
import { z } from 'zod';
export const weatherTool = createTool({
  description: 'Display the weather for a location',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async function ({ location }) {
    try {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`);
      const geoData = await geoResponse.json();
      
      if (!geoData.results || geoData.results.length === 0) {
          throw new Error("Location not found");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Fetch weather data using latitude and longitude
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherData = await weatherResponse.json();

      return {
          location: `${name}, ${country}`,
          temperature: `${weatherData.current_weather.temperature}°C`,
          weather: weatherData.current_weather.weathercode // This returns a weather condition code
      };
  } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
  }
  },
});
export const tools = {
  displayWeather: weatherTool,
};