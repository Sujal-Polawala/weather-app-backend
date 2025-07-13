const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const weatherRoutes = require("./routes/weatherRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://weather-app-frontend-taupe.vercel.app",
      "https://weather-app-frontend-sujal-polawalas-projects.vercel.app"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
  
app.use(express.json());

app.use("/api/weather", weatherRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));