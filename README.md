# Weather & Clothing Suggestion Backend

This backend application provides weather data display, search history tracking, and clothing suggestions powered by AI. It uses:

- **Node.js & Express** for core server functionality
- **Python (Flask)** for AI-based clothing suggestions
- **MongoDB** to store weather and suggestion history
- **Axios** for API requests
- **CORS** for cross-origin support
- **Transformers (HuggingFace)** to generate clothing suggestions based on temperature and weather conditions

---

## 🚀 Features

- 🌦️ Get and store weather data
- 📚 Track and retrieve search history
- 🧠 Generate clothing suggestions using AI (DistilGPT2)
- 🔍 Full CRUD support for weather data
- 🔁 Integration of Node + Python using concurrent processes

---

## 📁 Folder Structure

/backend
│
├── server.js # Main Node.js Express server
├── ClothSuggestion.py # Flask-based AI suggestion API
├── .env # Environment variables
├── package.json # Node dependencies and scripts
├── requirements.txt # Python dependencies
└── README.md # Project documentation (this file)


---

## 🛠️ Requirements

- Node.js ≥ 16
- Python ≥ 3.8
- MongoDB (local or cloud, e.g., MongoDB Atlas)

---

## 📦 Install Dependencies

### Node.js dependencies:

```bash
npm install

pip install -r requirements.txt

```
## ⚙️ Environment Setup
Create a .env file in the /backend folder:

- MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/WeatherStore
- VITE_OPENCAGE_API_KEY=your_opencage_api_key_here

## 🧪 Run Locally
Development Mode:

- npm run dev