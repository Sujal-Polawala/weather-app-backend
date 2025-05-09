const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const weatherRoutes = require("./routes/weatherRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
  
app.use(express.json());

app.use("/api/weather", weatherRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));