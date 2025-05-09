const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema({
    city: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
      },
  temperature: Number,
  description: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SearchHistory", searchHistorySchema);