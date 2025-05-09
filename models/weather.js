const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  temperature: { type: Number, required: true },
  feels_like: { type: Number }, // Feels like temperature
  temp_min: { type: Number },
  temp_max: { type: Number },
  pressure: { type: Number },
  humidity: { type: Number },
  wind_speed: { type: Number },
  wind_deg: { type: Number },
  visibility: { type: Number },
  description: { type: String, required: true },
  icon: { type: String }, // Weather icon
  sunrise: { type: Number }, // Sunrise timestamp
  sunset: { type: Number }, // Sunset timestamp
  country: { type: String }, // Country code
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Weather", weatherSchema);
