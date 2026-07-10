# 🌊 Rising Waters — AI-Powered Flood Risk Assessment

## 📌 Project Overview

**Rising Waters** is an intelligent Machine Learning-based flood prediction system developed using Python and Flask. The application provides early flood risk assessment by analyzing historical weather data — including rainfall patterns, temperature, humidity, cloud cover, and seasonal rainfall — to identify potential flood conditions with high accuracy.

The platform delivers fast and reliable predictions through an immersive, animated web interface, helping disaster management authorities, government agencies, and local communities make informed decisions and take timely preventive measures before flood events occur.

---

## 🚀 Features

- AI-powered flood risk prediction using multiple ML algorithms
- Clean, responsive web interface built with Flask + Jinja2
- Instant prediction results with clear visual feedback
- Immersive weather-themed animated UI (rain, clouds, lightning, fog, waves)
- Glassmorphism card design with proper z-index layering
- Violet and sky-blue stormy background atmosphere
- Animated rain canvas that stays behind all content layers
- Fully responsive layout for desktop and mobile

---

## 🛠 Technologies Used

| Category | Tools |
|---|---|
| Backend | Python, Flask |
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Machine Learning | Scikit-learn, NumPy, Pickle |
| ML Algorithms | Decision Tree, Random Forest, K-Nearest Neighbors (KNN), XGBoost |
| Data Scaling | StandardScaler |
| UI Design | Glassmorphism, CSS Animations, Canvas API |

---

## 📊 Input Parameters

The system predicts floods using the following 10 weather parameters:

| Parameter | Description |
|---|---|
| Temperature (°C) | Atmospheric temperature |
| Humidity (%) | Relative humidity |
| Cloud Cover (%) | Percentage of sky covered by clouds |
| Annual Rainfall (mm) | Total yearly rainfall |
| Jan–Feb Rainfall (mm) | Winter season rainfall |
| Mar–May Rainfall (mm) | Pre-monsoon rainfall |
| Jun–Sep Rainfall (mm) | Monsoon season rainfall |
| Oct–Dec Rainfall (mm) | Post-monsoon rainfall |
| Average June Rainfall (mm) | Mean June rainfall for the subdivision |
| Subdivision Rainfall (mm) | Historical subdivision-level rainfall |

---

## 🤖 Machine Learning Models

The following algorithms were trained and evaluated on historical weather data:

- **Decision Tree Classifier**
- **Random Forest Classifier** *(primary deployed model)*
- **K-Nearest Neighbors (KNN)**
- **XGBoost Classifier**

**Preprocessing:** StandardScaler  
**Model Storage:** Pickle (`.save` format, stored in `/Model`)

---

## 📁 Project Structure

```
Rising_Waters/
│
├── Dataset/              # Training data
├── Model/
│   ├── floods.save       # Trained ML model (Pickle)
│   └── transform.save    # Fitted StandardScaler (Pickle)
├── Notebook/             # Jupyter notebooks for training
├── static/
│   ├── css/
│   │   └── main.css      # Weather theme, animations, glassmorphism
│   └── js/
│       └── main.js       # Rain canvas, lightning, particle engine
├── templates/
│   ├── home.html         # Main prediction dashboard
│   ├── chance.html       # Flood detected result page
│   └── no_chance.html    # No flood result page
├── app.py                # Flask app and routing
├── requirements.txt      # Python dependencies
└── README.md
```

---

## 🌐 Live Demo

**Website:** https://rising-waters-19hr.onrender.com

---

## ▶️ Run Locally

1. **Install the required packages**

```bash
pip install -r requirements.txt
```

2. **Run the application**

```bash
python app.py
```

3. **Open in your browser**

```
http://127.0.0.1:5000
```

> **Note:** No virtual environment (`.venv`) is included in this repository. Install dependencies directly using `pip`.

---

## 📷 Prediction Output

The application displays one of two results based on the entered weather conditions:

| Result | Meaning |
|---|---|
| ✅ No Flood Chance | Weather conditions indicate a low possibility of flooding |
| ⚠️ Flood Chance Detected | Please stay alert and take necessary precautions |

---

## 🎨 UI Highlights

- **Background:** Multi-stop violet-to-indigo-to-sky-blue gradient simulating a stormy sky
- **Rain Animation:** 60FPS canvas-based rain with wind effect; stays behind all content via proper z-index layering
- **Glassmorphism Cards:** `backdrop-filter: blur(22px)` with dark semi-transparent backgrounds for maximum readability
- **Layer Order:** Background → Atmospheric Glow → Rain Canvas → Clouds/Fog/Waves → Dark Overlay → Content Cards

---

## 👨‍💻 Developed By

**Sudheer Chidugundu**  
**Charan Neerukattu**  
**Himasri Vemulapalli**  
**Bhavya Sri Konduru**  
**Jeeshitha Sai Vistamsetty**  

B.Tech CSE — SRM University AP  
Internship Project