# Cryptocurrency Price Prediction using LSTM

## 📌 Overview
This project uses a **Long Short-Term Memory (LSTM) neural network** to predict cryptocurrency prices based on historical data. The model is trained using time-series data and features like **closing price, simple moving average (SMA), and exponential moving average (EMA)**.

## 🚀 Features
- 📈 **Predicts future cryptocurrency prices** based on historical data.
- 🧠 **Uses LSTM (Long Short-Term Memory)** for sequential data modeling.
- 🔍 **Data Preprocessing** with MinMaxScaler for normalization.
- 💾 **Saves and loads trained models and scalers using Pickle (.pkl) files**.
- 📊 **Visualizes results** with Matplotlib.

## 📂 Project Structure
```
📁 crypto-price-prediction
│── 📄 README.md  # Project documentation
│── 📄 requirements.txt  # Required dependencies
│── 📁 data  # Raw and processed data files
│── 📁 models  # Saved models (.pkl files)
│── 📁 notebooks  # Jupyter notebooks for training & evaluation
│── 📁 src  # Source code
│   ├── 📄 train.py  # Model training script
│   ├── 📄 predict.py  # Prediction script
│   ├── 📄 preprocess.py  # Data preprocessing functions
│── 📄 app.py  # Flask API (Optional: if deploying the model)
```

## 🔧 Installation
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/crypto-price-prediction.git
cd crypto-price-prediction
```

### 2️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Run Model Training
```bash
python src/train.py
```

### 4️⃣ Make Predictions
```bash
python src/predict.py
```

## 📊 How to Use the Pickle File

### 🔹 Load the Model
```python
import pickle
from keras.models import load_model

# Load LSTM model
with open("models/lstm_model.pkl", "rb") as file:
    model = pickle.load(file)
```

### 🔹 Load the Scaler and Transform Data
```python
with open("models/scaler.pkl", "rb") as file:
    scaler = pickle.load(file)

# Example input data (reshaped for LSTM)
import numpy as np
input_data = np.array([[50000, 49500, 50500]])  # Adjust dimensions as needed
scaled_input = scaler.transform(input_data)
```

### 🔹 Make Predictions
```python
prediction = model.predict(scaled_input)
predicted_price = scaler.inverse_transform([[prediction[0][0], 0, 0]])[0][0]
print(f"Predicted Price: ${predicted_price:.2f}")
```

## 📜 License
This project is open-source under the **MIT License**.

## 📬 Contact
For questions or collaborations, reach out via **your-email@example.com** or visit the [GitHub Repository](https://github.com/your-username/crypto-price-prediction).

