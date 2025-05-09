const express = require("express");
const {
  getWeather,
  getWeatherHistory,
  deleteWeatherHistory,
  updateWeatherHistory,
  saveSearchHistory,
} = require("../controllers/index");

const router = express.Router();

// FIX: More specific routes MUST come before dynamic ones
router.get("/history", getWeatherHistory);
router.post("/history", saveSearchHistory);
router.delete("/history/:id", deleteWeatherHistory);
router.put("/history/:id", updateWeatherHistory);

// Dynamic route last
router.get("/:city", getWeather);

module.exports = router;
