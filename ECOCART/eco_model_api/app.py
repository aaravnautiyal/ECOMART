from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained LightGBM model
model = joblib.load("eco1_score_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get input JSON
        data = request.json

        # Validate input
        if "input" not in data:
            return jsonify({"error": "Missing 'input' key"}), 400

        features = np.array(data["input"]).reshape(1, -1)

        # Predict eco_score
        prediction = model.predict(features)[0]
        return jsonify({"eco_score": round(float(prediction), 2)})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True , port=8000)
