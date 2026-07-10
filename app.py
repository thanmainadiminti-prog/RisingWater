from flask import Flask, render_template, request
import pickle
import numpy as np 

app = Flask(__name__)

model = pickle.load(open("Model/floods.save", "rb"))
scaler = pickle.load(open("Model/transform.save", "rb"))

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/predict", methods=["POST"])
def predict():

    Temp = float(request.form["Temp"])
    Humidity = float(request.form["Humidity"])
    Cloud_Cover = float(request.form["Cloud Cover"])
    ANNUAL = float(request.form["ANNUAL"])
    Jan_Feb = float(request.form["Jan-Feb"])
    Mar_May = float(request.form["Mar-May"])
    Jun_Sep = float(request.form["Jun-Sep"])
    Oct_Dec = float(request.form["Oct-Dec"])
    avgjune = float(request.form["avgjune"])
    sub = float(request.form["sub"])

    data = np.array([[Temp, Humidity, Cloud_Cover, ANNUAL,
                      Jan_Feb, Mar_May, Jun_Sep,
                      Oct_Dec, avgjune, sub]])

    data = scaler.transform(data)

    prediction = model.predict(data)

    if prediction[0] == 1:
        return render_template("chance.html")
    else:
        return render_template("no_chance.html")

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)