import datetime
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine(f"postgresql+psycopg2://username:password@localhost:5432/Stocks")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Create our session (link) from Python to the DB
session = Session(engine)

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
    session = Session(engine)
    stock = []
    stock_data = engine.execute("SELECT * FROM alb")
    for results in stock_data:
        stock_dict = {}
        stock_dict["date"] = results[0]
        stock_dict["open"] = results[1]
        stock_dict["high"] = results[2]
        stock_dict["low"] = results[3]
        stock_dict["close"] = results[4]
        stock_dict["adj_close"] = results[5]
        stock_dict["volume"] = results[6]
        stock.append(stock_dict)
    session.close()
    return jsonify(stock)

@app.route('/api/v1.0/GNENF')
def GNENF():
    session = Session(engine)
    stock = []
    stock_data = engine.execute("SELECT * FROM gnenf")
    for results in stock_data:
        stock_dict = {}
        stock_dict["date"] = results[0]
        stock_dict["open"] = results[1]
        stock_dict["high"] = results[2]
        stock_dict["low"] = results[3]
        stock_dict["close"] = results[4]
        stock_dict["adj_close"] = results[5]
        stock_dict["volume"] = results[6]
        stock.append(stock_dict)
    session.close()
    return jsonify(stock)

@app.route('/api/v1.0/LAC')
def LAC():
    session = Session(engine)
    stock = []
    stock_data = engine.execute("SELECT * FROM lac")
    for results in stock_data:
        stock_dict = {}
        stock_dict["date"] = results[0]
        stock_dict["open"] = results[1]
        stock_dict["high"] = results[2]
        stock_dict["low"] = results[3]
        stock_dict["close"] = results[4]
        stock_dict["adj_close"] = results[5]
        stock_dict["volume"] = results[6]
        stock.append(stock_dict)
    session.close()
    return jsonify(stock)
    

@app.route('/api/v1.0/LTHM')
def LTHM():
    session = Session(engine)
    stock = []
    stock_data = engine.execute("SELECT * FROM lthm")
    for results in stock_data:
        stock_dict = {}
        stock_dict["date"] = results[0]
        stock_dict["open"] = results[1]
        stock_dict["high"] = results[2]
        stock_dict["low"] = results[3]
        stock_dict["close"] = results[4]
        stock_dict["adj_close"] = results[5]
        stock_dict["volume"] = results[6]
        stock.append(stock_dict)
    session.close()
    return jsonify(stock)

@app.route('/api/v1.0/MALRY')
def MALRY():
    session = Session(engine)
    stock = []
    stock_data = engine.execute("SELECT * FROM malry")
    for results in stock_data:
        stock_dict = {}
        stock_dict["date"] = results[0]
        stock_dict["open"] = results[1]
        stock_dict["high"] = results[2]
        stock_dict["low"] = results[3]
        stock_dict["close"] = results[4]
        stock_dict["adj_close"] = results[5]
        stock_dict["volume"] = results[6]
        stock.append(stock_dict)
    session.close()
    return jsonify(stock)

@app.route('/api/v1.0/NIO')
def NIO():
    session = Session(engine)
    stock = []
    stock_data = engine.execute("SELECT * FROM nio")
    for results in stock_data:
        stock_dict = {}
        stock_dict["date"] = results[0]
        stock_dict["open"] = results[1]
        stock_dict["high"] = results[2]
        stock_dict["low"] = results[3]
        stock_dict["close"] = results[4]
        stock_dict["adj_close"] = results[5]
        stock_dict["volume"] = results[6]
        stock.append(stock_dict)
    session.close()
    return jsonify(stock)

@app.route('/api/v1.0/PILBF')
def PILBF():
    session = Session(engine)
    stock = []
    stock_data = engine.execute("SELECT * FROM pilbf")
    for results in stock_data:
        stock_dict = {}
        stock_dict["date"] = results[0]
        stock_dict["open"] = results[1]
        stock_dict["high"] = results[2]
        stock_dict["low"] = results[3]
        stock_dict["close"] = results[4]
        stock_dict["adj_close"] = results[5]
        stock_dict["volume"] = results[6]
        stock.append(stock_dict)
    session.close()
    return jsonify(stock)

@app.route('/api/v1.0/Samsung')
def Samsung():
    session = Session(engine)
    stock = []
    stock_data = engine.execute("SELECT * FROM samsung")
    for results in stock_data:
        stock_dict = {}
        stock_dict["date"] = results[0]
        stock_dict["open"] = results[1]
        stock_dict["high"] = results[2]
        stock_dict["low"] = results[3]
        stock_dict["close"] = results[4]
        stock_dict["adj_close"] = results[5]
        stock_dict["volume"] = results[6]
        stock.append(stock_dict)
    session.close()
    return jsonify(stock)

@app.route('/api/v1.0/SGML')
def SGML():
    session = Session(engine)
    stock = []
    stock_data = engine.execute("SELECT * FROM sgml")
    for results in stock_data:
        stock_dict = {}
        stock_dict["date"] = results[0]
        stock_dict["open"] = results[1]
        stock_dict["high"] = results[2]
        stock_dict["low"] = results[3]
        stock_dict["close"] = results[4]
        stock_dict["adj_close"] = results[5]
        stock_dict["volume"] = results[6]
        stock.append(stock_dict)
    session.close()
    return jsonify(stock)

@app.route('/api/v1.0/SQM')
def SQM():
    session = Session(engine)
    stock = []
    stock_data = engine.execute("SELECT * FROM sqm")
    for results in stock_data:
        stock_dict = {}
        stock_dict["date"] = results[0]
        stock_dict["open"] = results[1]
        stock_dict["high"] = results[2]
        stock_dict["low"] = results[3]
        stock_dict["close"] = results[4]
        stock_dict["adj_close"] = results[5]
        stock_dict["volume"] = results[6]
        stock.append(stock_dict)
    session.close()
    return jsonify(stock)

@app.route('/api/v1.0/TSLA')
def TSLA():
    session = Session(engine)
    stock = []
    stock_data = engine.execute("SELECT * FROM tsla")
    for results in stock_data:
        stock_dict = {}
        stock_dict["date"] = results[0]
        stock_dict["open"] = results[1]
        stock_dict["high"] = results[2]
        stock_dict["low"] = results[3]
        stock_dict["close"] = results[4]
        stock_dict["adj_close"] = results[5]
        stock_dict["volume"] = results[6]
        stock.append(stock_dict)
    session.close()
    return jsonify(stock)

if __name__ == '__main__':
    app.run(debug=True)