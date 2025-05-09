import os
from flask import Flask, request, jsonify
from flask_cors import CORS  # <-- Add this
from transformers import pipeline
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from dotenv import load_dotenv

load_dotenv()  # <-- Load environment variables from .env

app = Flask(__name__)
CORS(app)  # <-- Allow all origins by default

generator = pipeline("text-generation", model="distilgpt2")

# Fetch Mongo URI from environment variable
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
collection = client.WeatherStore.suggestions

def generate_ai_suggestion(temp, desc):
    prompt = f"Given the weather is {temp}°C and it's {desc}, what should someone wear? Clothing suggestion:"
    output = generator(prompt, max_length=60, num_return_sequences=1)
    generated = output[0]["generated_text"]
    
    suggestion_start = generated.lower().find("clothing suggestion:")
    if suggestion_start != -1:
        suggestion = generated[suggestion_start + len("clothing suggestion:"):].strip()
    else:
        suggestion = generated.strip()
    
    print(suggestion)
    return suggestion

@app.route("/suggest", methods=["POST"])
def suggest():
    data = request.json
    temp = data.get("temp")
    desc = data.get("desc")

    if not all([temp, desc]):
        return jsonify({"error": "Missing temperature or description"}), 400

    # Check if suggestion already exists
    existing = collection.find_one({"temp": temp, "desc": desc})
    if existing:
        return jsonify({"suggestion": existing["suggestion"]})

    # Generate suggestion
    suggestion = generate_ai_suggestion(temp, desc)

    # Try to insert suggestion safely
    try:
        collection.insert_one({"temp": temp, "desc": desc, "suggestion": suggestion})
    except DuplicateKeyError:
        # If another request inserted the same suggestion in parallel
        existing = collection.find_one({"temp": temp, "desc": desc})
        if existing:
            return jsonify({"suggestion": existing["suggestion"]})
        else:
            return jsonify({"error": "Unable to get suggestion"}), 500

    return jsonify({"suggestion": suggestion})

if __name__ == "__main__":
    app.run(debug=True)