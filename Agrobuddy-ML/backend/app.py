import numpy as np
import pickle
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import os
import requests
from dotenv import load_dotenv

load_dotenv()  # Load .env on startup

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# --- Mandi Prices ---
API_KEY = os.getenv("CROPS_API")
BASE_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"

@app.route("/mandi-prices", methods=["GET"])
def mandi_prices():
    if not API_KEY:
        return jsonify({"error": "Missing CROPS_API environment variable"}), 500

    params = {
        "api-key": API_KEY,
        "format": "json",
        "limit": request.args.get("limit", 100)
    }
    if c := request.args.get("commodity"):
        params["commodity"] = c
    if m := request.args.get("market"):
        params["market"] = m
    if s := request.args.get("state"):
        params["filters[state]"] = s

    resp = requests.get(BASE_URL, params=params)
    if resp.status_code != 200:
        return jsonify({"error": "Failed to fetch data", "status": resp.status_code}), resp.status_code
    return jsonify(resp.json())


# --- Crop Recommendation Model ---
# Load the trained model
model_path = os.environ.get('CROP_MODEL_PATH', os.path.join(os.path.dirname(__file__), '../models/RandomForest.pkl'))
try:
    crop_model = pickle.load(open(model_path, 'rb'))
except Exception as e:
    print(f"Error loading crop model: {e}")
    crop_model = None

@app.route('/predict-crop', methods=['POST'])
def predict_crop():
    if not crop_model:
        return jsonify({'error': 'Crop recommendation model is not loaded.'}), 500

    data = request.get_json()
    # Order of features must match the model's training data
    features = [data['N'], data['P'], data['K'], data['temperature'], data['humidity'], data['ph'], data['rainfall']]
    prediction = crop_model.predict([features])
    return jsonify({'crop': prediction[0]})

# --- Plant Disease Model ---
# Load the trained model
try:
    disease_model = tf.keras.models.load_model('D:/Projects/AgroBuddy/Agrobuddy-ML/Plant_Disease/trained_model.keras')
except Exception as e:
    print(f"Error loading disease model: {e}")
    disease_model = None

# Define the class names for disease prediction
class_name = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']

@app.route('/predict-disease', methods=['POST'])
def predict_disease():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and disease_model:
        # Read the image file
        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
        img = img.resize((128, 128))

        # Preprocess the image
        input_arr = tf.keras.preprocessing.image.img_to_array(img)
        input_arr = np.array([input_arr])  # Convert single image to a batch

        # Make prediction
        prediction = disease_model.predict(input_arr)
        result_index = np.argmax(prediction[0])
        predicted_class = class_name[result_index]

        return jsonify({'disease': predicted_class})
    return jsonify({'error': 'Disease prediction model is not loaded or file is invalid.'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
