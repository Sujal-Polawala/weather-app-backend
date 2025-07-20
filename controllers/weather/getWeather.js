const Weather = require("../../models/weather");
const { fetchWeatherData } = require("../../services/weatherService");

const getWeather = async (req, res) => {
  try {
    const location = req.params.city.trim();
    const data = await fetchWeatherData(location);

    // For coordinates, we need to use the city name from the API response
    const cityName = data.name.toLowerCase().trim();
    
    const updatedWeather = await Weather.findOneAndUpdate(
      { city: cityName },
      {
        city: cityName,
        state: data.state || '',
        temperature: data.main.temp,
        feels_like: data.main.feels_like,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        wind_deg: data.wind.deg,
        visibility: data.visibility,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        country: data.sys.country,
        timestamp: new Date(),
      },
      { new: true, upsert: true }
    );

    res.json(updatedWeather);
  } catch (error) {
    console.error("Weather fetch error:", error.message);
    if (error.message === "City not found") {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getWeather;
