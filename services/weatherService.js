const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const fetchWeatherData = async (location) => {
  try {
    const url = process.env.WEATHER_URL;
    
    // Check if location is coordinates (lat,lon format)
    const isCoordinates = /^-?\d+\.?\d*,-?\d+\.?\d*$/.test(location);
    
    let params = {
      appid: process.env.WEATHER_API_KEY,
      units: "metric",
    };

    if (isCoordinates) {
      // Use lat and lon parameters for coordinates
      const [lat, lon] = location.split(',');
      params.lat = lat;
      params.lon = lon;
    } else {
      // Use q parameter for city name
      params.q = location;
    }

    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("City not found");
      }
      console.error(`Error: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error setting up the request:", error.message);
    }
    
    throw new Error("Failed to fetch weather data");
  }
};

module.exports = { fetchWeatherData };
