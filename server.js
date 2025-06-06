const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const weatherRoutes = require("./routes/weatherRoutes");
const { spawn } = require("child_process");
const axios = require("axios");

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://weather-app-frontend-taupe.vercel.app"
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

const pythonProcess = spawn("python3", ["suggestion_service.py"], {
  cwd: __dirname, // Adjust if the script is in a different folder
  env: {
    ...process.env,
    PORT: "5000" // Optional: force port for Flask app
  }
});

pythonProcess.stdout.on("data", (data) => {
  console.log(`Python stdout: ${data}`);
});

pythonProcess.stderr.on("data", (data) => {
  console.error(`Python stderr: ${data}`);
});

pythonProcess.on("close", (code) => {
  console.log(`Python process exited with code ${code}`);
});

// Proxy API in Node.js to talk to Flask service
app.post("/api/suggest", async (req, res) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/suggest", req.body);
    res.json(response.data);
  } catch (err) {
    console.error("Suggestion error:", err.message);
    res.status(500).json({ error: "Failed to get suggestion" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));