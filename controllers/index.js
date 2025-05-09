const getWeather = require("./weather/getWeather");
const getWeatherHistory = require("./weather/getWeatherHistory");
const deleteWeatherHistory = require("./weather/deleteWeatherHistory");
const updateWeatherHistory = require("./weather/updateWeatherHistory");
const saveSearchHistory = require("./searchHistory/saveSearchHistory");

module.exports = {
  getWeather,
  getWeatherHistory,
  deleteWeatherHistory,
  updateWeatherHistory,
  saveSearchHistory,
};