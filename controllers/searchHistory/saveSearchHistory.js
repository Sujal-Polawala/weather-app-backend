const SearchHistory = require("../../models/searchHistory");

const saveSearchHistory = async (req, res) => {
  const { city, temperature, description, timestamp } = req.body;

  try {
    const updated = await SearchHistory.findOneAndUpdate(
      { city: city.toLowerCase().trim() },
      { city: city.toLowerCase().trim(), temperature, description, timestamp },
      { upsert: true, new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error saving weather history:", error.message);
    res.status(500).json({ error: "Failed to save or update weather history." });
  }
};

module.exports = saveSearchHistory;
