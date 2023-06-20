# Import the dependencies.
import numpy as np
from pathlib import Path
import json

from flask import Flask

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    """List all available api routes."""
    return (
        f"Avaliable Routes:<br/>"
        "<a href='http://127.0.0.1:5000/api/v1.0/ALB'>ALB</a><br/>"
        "<a href='http://127.0.0.1:5000/api/v1.0/GNENF'>GNENF</a><br/>"
        "<a href='http://127.0.0.1:5000/api/v1.0/LAC'>LAC</a><br/>"
        "<a href='http://127.0.0.1:5000/api/v1.0/LTHM'>LTHM</a><br/>"
        "<a href='http://127.0.0.1:5000/api/v1.0/MALRY'>MALRY</a><br/>"
        "<a href='http://127.0.0.1:5000/api/v1.0/NIO'>NIO</a><br/>"
        "<a href='http://127.0.0.1:5000/api/v1.0/PILBF'>PILBF</a><br/>"
        "<a href='http://127.0.0.1:5000/api/v1.0/Samsung'>Samsung</a><br/>"
        "<a href='http://127.0.0.1:5000/api/v1.0/SGML'>SGML</a><br/>"
        "<a href='http://127.0.0.1:5000/api/v1.0/SQM'>SQM</a><br/>"
        "<a href='http://127.0.0.1:5000/api/v1.0/TSLA'>TSLA</a><br/>"

    )

@app.route('/api/v1.0/ALB')
def ALB():
    with open ("Stock/alb_Stock.json", "r") as json_file:
        data = json.load(json_file)
    return data

@app.route('/api/v1.0/GNENF')
def GNENF():
    with open ("Stock/gnenf_stock.json", "r") as json_file:
        data = json.load(json_file)
    return data

@app.route('/api/v1.0/LAC')
def LAC():
    with open ("Stock/lac_stock.json", "r") as json_file:
        data = json.load(json_file)
    return data

@app.route('/api/v1.0/LTHM')
def LTHM():
    with open ("Stock/lthm_stock.json", "r") as json_file:
        data = json.load(json_file)
    return data

@app.route('/api/v1.0/MALRY')
def MALRY():
    with open ("Stock/malry_stock.json", "r") as json_file:
        data = json.load(json_file)
    return data

@app.route('/api/v1.0/NIO')
def NIO():
    with open ("Stock/nio_stock.json", "r") as json_file:
        data = json.load(json_file)
    return data

@app.route('/api/v1.0/PILBF')
def PILBF():
    with open ("Stock/pilbf_stock.json", "r") as json_file:
        data = json.load(json_file)
    return data

@app.route('/api/v1.0/Samsung')
def Samsung():
    with open ("Stock/samsung_stock.json", "r") as json_file:
        data = json.load(json_file)
    return data

@app.route('/api/v1.0/SGML')
def SGML():
    with open ("Stock/sgml_stock.json", "r") as json_file:
        data = json.load(json_file)
    return data

@app.route('/api/v1.0/SQM')
def SQM():
    with open ("Stock/sqm_stock.json", "r") as json_file:
        data = json.load(json_file)
    return data

@app.route('/api/v1.0/TSLA')
def TSLA():
    with open ("Stock/TSLA_Stocks.json", "r") as json_file:
        data = json.load(json_file)
    return data

if __name__ == '__main__':
    app.run(debug=True)