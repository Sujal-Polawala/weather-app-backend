const Weather = require("../../models/weather");
const SearchHistory = require("../../models/searchHistory");
const { fetchWeatherData } = require("../../services/weatherService");

const updateWeatherHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { city } = req.body;

    const data = await fetchWeatherData(city);

    const updatedData = {
      city: data.name.toLowerCase().trim(),
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
    };

    const updatedWeather = await Weather.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    const updatedHistory = await SearchHistory.findOneAndUpdate(
      { city: updatedData.city },
      {
        city: updatedData.city,
        temperature: updatedData.temperature,
        description: updatedData.description,
        timestamp: updatedData.timestamp,
      },
      { new: true }
    );

    if (!updatedWeather && !updatedHistory) {
      return res.status(404).json({ message: "No matching entries found" });
    }

    res.json({
      message: "Weather and SearchHistory updated successfully",
      weather: updatedWeather,
      history: updatedHistory,
    });
  } catch (error) {
    console.error("Error updating weather and history:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateWeatherHistory;
