const Weather = require("../../models/weather");
const SearchHistory = require("../../models/searchHistory");

const deleteWeatherHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const weatherDoc = await Weather.findById(id);
    if (!weatherDoc) {
      return res.status(404).json({ message: "Weather entry not found" });
    }

    await Weather.findByIdAndDelete(id);
    await SearchHistory.findOneAndDelete({ city: weatherDoc.city });

    res.json({ message: "Entry deleted successfully from both collections" });
  } catch (error) {
    console.error("Error deleting history:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteWeatherHistory;
