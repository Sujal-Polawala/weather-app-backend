const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const fetchWeatherData = async (city) => {
  try {
    const url = process.env.WEATHER_URL;
    const params = {
      q: city,
      appid: process.env.WEATHER_API_KEY,
      units: "metric",
    };

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
