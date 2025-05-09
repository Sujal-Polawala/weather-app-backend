const Weather = require("../../models/weather");

const getWeatherHistory = async (req, res) => {
  try {
    const history = await Weather.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    console.error("Error fetching weather history:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getWeatherHistory;
