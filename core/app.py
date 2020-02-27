#!/usr/bin/python3
from flask import Flask
from config import *
from database import database as db

app = Flask(__name__)


@app.route('/hello', methods=['GET'])
def hello():
    return "Hello, Group 2!"


@app.route('/connect', methods=['GET'])
def connect():
    # Test the connection of database
    db.connect()
    return "success"
    
    
@app.route('/add', methods=['GET'])
def add():
    # Test the connection of database
    user = dict()
    user['name'] = "Bob"
    user['age'] = 20
    db.insert("User", user)
    return "success"
    
@app.route('/disconnect', methods=['GET'])
def disconnect():
    db.close()
    return "success"
    

if __name__ == '__main__':
    app.run(debug=APP_DEBUG_MODE, host=APP_HOST)
