#!/usr/bin/python3
from flask import Flask
from config import *
from db.mongodb import Mongo
from db.elastic import ES
from data.sysmon import SysmonData

app = Flask(__name__)


@app.route('/hello', methods=['GET'])
def hello():
    return "Hello, Group 2!"


@app.route('/add', methods=['GET'])
def add():
    # Test the connection of database
    user = dict()
    user['name'] = "Bob"
    user['age'] = 20
    Mongo.insert("User", user)
    return "success"


def updateData(startdate, enddate):
    es = ES()
    sysmon = SysmonData()
    res = sysmon.from_winlogbeat(es, WINLOGBEAT_INDEX, startdate, enddate)
    es.insert_behaviors('raw', res)


if __name__ == '__main__':
    app.run(debug=APP_DEBUG_MODE, host=APP_HOST)
